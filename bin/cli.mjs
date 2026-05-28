#!/usr/bin/env node
/**
 * epoint-f10code-gen · npx 入口
 *
 * 通过 npx 给用户工程安装 skill 主体 + 三个 IDE 的入口文件。
 *
 * 用法：
 *   npx epoint-f10code-gen init                  # 默认：自动检测 IDE，复制主体 + 安装入口
 *   npx epoint-f10code-gen init --ide all        # 强制三个 IDE 都装
 *   npx epoint-f10code-gen init --ide cursor     # 只装 Cursor
 *   npx epoint-f10code-gen init --dry-run        # 只看会做什么
 *   npx epoint-f10code-gen init --force          # 覆盖时跳过 backup
 *   npx epoint-f10code-gen init --target <dir>   # 指定目标工程根（默认 cwd）
 *
 *   npx epoint-f10code-gen check                 # 校验已装入口与本包模板一致
 *   npx epoint-f10code-gen update                # 重新同步主体（保留入口不动）
 *   npx epoint-f10code-gen smoke                 # 跑 skill 自身健康检查
 *   npx epoint-f10code-gen validate <vue-file>   # 校验生成的 .vue 是否合规
 *   npx epoint-f10code-gen gen-api-doc <mock-file> # 根据 mock 反推接口文档（Markdown + JSON）
 *   npx epoint-f10code-gen sync                  # 同步 vue-docs → references/docs/
 *
 * 跨平台、零依赖（仅 Node.js 内置模块）。
 * 退出码：0 = 成功，1 = 失败
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';
import { spawn } from 'node:child_process';

// ========== 路径定位 ==========
const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** skill 包自身的根目录（即 epoint-f10code-gen/） */
const SKILL_PKG_ROOT = path.resolve(__dirname, '..');

// ========== 输出工具 ==========
const ok = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg) => console.log(`  ✗ ${msg}`);
const warn = (msg) => console.log(`  ⚠ ${msg}`);
const info = (msg) => console.log(`  · ${msg}`);

function banner(title) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`epoint-f10code-gen · ${title}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

function footer(success, summary) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`${success ? '✓' : '✗'} ${summary}`);
}

// ========== 文件系统工具 ==========
async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

function timestamp() {
  const d = new Date();
  return (
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0') +
    '-' +
    String(d.getHours()).padStart(2, '0') +
    String(d.getMinutes()).padStart(2, '0') +
    String(d.getSeconds()).padStart(2, '0')
  );
}

/**
 * 递归复制目录（跨平台），跳过给定的子路径名集合。
 * @param {string} src 源目录
 * @param {string} dst 目标目录
 * @param {Set<string>} skipNames 顶层要跳过的子项名字（如 node_modules / .git）
 */
async function copyDir(src, dst, skipNames = new Set()) {
  await ensureDir(dst);
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    if (skipNames.has(entry.name)) continue;
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      await copyDir(s, d, new Set()); // 仅顶层跳过
    } else if (entry.isFile()) {
      await fs.copyFile(s, d);
    } else if (entry.isSymbolicLink()) {
      const link = await fs.readlink(s);
      try {
        await fs.symlink(link, d);
      } catch {
        // 跨平台失败时回退为复制（windows 无 symlink 权限的情况）
        try {
          await fs.copyFile(s, d);
        } catch {
          /* ignore */
        }
      }
    }
  }
}

// ========== CLI 参数解析 ==========
function parseArgs(argv) {
  const [, , rawCommand, ...rest] = argv;
  // 把 --help / -h / help 都当作请求帮助
  const isHelp =
    rawCommand === '--help' ||
    rawCommand === '-h' ||
    rawCommand === 'help' ||
    rest.includes('--help') ||
    rest.includes('-h');
  const command = isHelp ? null : rawCommand;
  const flags = {
    dryRun: rest.includes('--dry-run'),
    force: rest.includes('--force'),
    help: isHelp
  };
  function getOpt(name) {
    const i = rest.indexOf(`--${name}`);
    if (i >= 0 && rest[i + 1] && !rest[i + 1].startsWith('--')) return rest[i + 1];
    return null;
  }
  const target = getOpt('target') ? path.resolve(getOpt('target')) : process.cwd();
  const ideRaw = getOpt('ide'); // cursor / claude / windsurf / all
  const positional = rest.filter((x) => !x.startsWith('--'));
  return { command, flags, target, ideRaw, positional };
}

function printHelp() {
  console.log(`epoint-f10code-gen · CLI

用法:
  npx epoint-f10code-gen <command> [options]

命令:
  init                  自动检测目标工程 IDE，安装主体 + 入口文件
  check                 校验已装入口与本包模板是否一致
  update                重新同步主体（保留入口不动）
  smoke                 跑 skill 自身健康检查
  validate <vue-file>   校验生成的 .vue 文件是否合规
  gen-api-doc <mock-file|mock-dir> 根据 mock 反推接口文档（Markdown + JSON）
  sync                  同步官方 vue-docs → references/docs/

通用选项:
  --target <dir>        目标工程根目录（默认：当前工作目录）
  --ide <list>          指定 IDE：cursor / claude / windsurf / all
                          多个用逗号分隔（如 --ide cursor,claude）
                          不填则自动检测目标工程下已有的 .cursor/.claude/.windsurf
  --dry-run             只打印动作，不真的写文件
  --force               覆盖时跳过 .bak 备份
  --help / -h           本帮助

gen-api-doc 选项:
  --out-dir <dir>       输出目录（默认推断 <component_package>/docs/api/<module>/）
  --module <name>       模块名（默认从 mock 路径反推）
  --app-name <name>     应用名（默认从 mock 文件名反推）
  --config <file>       页面配置文件，读取 MODULE_CONFIGS / ACTION_FORM_CONFIGS
  --api-prefix <path>   只收集指定业务前缀，例如 /api/ipd

示例:
  npx epoint-f10code-gen init
  npx epoint-f10code-gen init --ide cursor,windsurf --dry-run
  npx epoint-f10code-gen check
  npx epoint-f10code-gen validate ./packages/examples/src/views/demo/bid-mgmt.vue
  npx epoint-f10code-gen gen-api-doc ./packages/examples/mock/demo/order.mock.ts
  npx epoint-f10code-gen gen-api-doc ./mock/ipd --config ./src/views/ipd/config.js --api-prefix /api/ipd
`);
}

// ========== IDE 入口模板映射 ==========
const STUBS = [
  {
    ide: 'cursor',
    detectDir: '.cursor',
    template: path.join(SKILL_PKG_ROOT, 'installer', 'stubs', 'cursor-skill.md'),
    relTarget: path.join('.cursor', 'skills', 'epoint-f10code-gen', 'SKILL.md'),
    label: 'Cursor'
  },
  {
    ide: 'claude',
    detectDir: '.claude',
    template: path.join(SKILL_PKG_ROOT, 'installer', 'stubs', 'claude-skill.md'),
    relTarget: path.join('.claude', 'skills', 'epoint-f10code-gen', 'SKILL.md'),
    label: 'Claude Code'
  },
  {
    ide: 'windsurf',
    detectDir: '.windsurf',
    template: path.join(SKILL_PKG_ROOT, 'installer', 'stubs', 'windsurf-rule.md'),
    relTarget: path.join('.windsurf', 'rules', 'epoint-f10code-gen.md'),
    label: 'Windsurf'
  }
];

async function resolveIdes(target, ideRaw) {
  if (ideRaw === 'all') return STUBS.slice();
  if (ideRaw && ideRaw !== 'auto') {
    const wanted = new Set(
      ideRaw
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean)
    );
    return STUBS.filter((s) => wanted.has(s.ide));
  }
  // auto-detect
  const detected = [];
  for (const s of STUBS) {
    if (await exists(path.join(target, s.detectDir))) detected.push(s);
  }
  return detected;
}

// ========== command: init ==========
async function cmdInit(opts) {
  banner('init');
  console.log(`  skill 包目录: ${SKILL_PKG_ROOT}`);
  console.log(`  目标工程根:   ${opts.target}`);
  console.log(
    `  IDE 选择:     ${opts.ideRaw || 'auto-detect（自动扫描 .cursor/.claude/.windsurf）'}`
  );
  console.log(`  flags:        ${opts.flags.dryRun ? 'dry-run ' : ''}${opts.flags.force ? 'force' : ''}`);
  console.log('');

  // ===== Step 1: 复制 skill 主体到 <target>/epoint-f10code-gen/ =====
  console.log('[1/2] 同步 skill 主体');
  const targetSkillDir = path.join(opts.target, 'epoint-f10code-gen');

  if (path.resolve(targetSkillDir) === path.resolve(SKILL_PKG_ROOT)) {
    info('目标与源相同（在 skill 仓库内运行），跳过主体复制');
  } else {
    if (opts.flags.dryRun) {
      ok(`[dry-run] 将把主体复制到 ${targetSkillDir}`);
    } else {
      // 主体目录已存在 → 备份
      if ((await exists(targetSkillDir)) && !opts.flags.force) {
        const backupDir = `${targetSkillDir}.bak.${timestamp()}`;
        await fs.rename(targetSkillDir, backupDir);
        ok(`已备份旧主体 → ${path.relative(opts.target, backupDir)}`);
      } else if ((await exists(targetSkillDir)) && opts.flags.force) {
        await fs.rm(targetSkillDir, { recursive: true, force: true });
        ok('已强制删除旧主体（--force）');
      }
      // 复制（跳过 node_modules / .git / installer 本目录里的 node_modules）
      const skip = new Set(['node_modules', '.git', '.DS_Store']);
      await copyDir(SKILL_PKG_ROOT, targetSkillDir, skip);
      ok(`主体已复制 → ${path.relative(opts.target, targetSkillDir)}/`);
    }
  }

  // ===== Step 2: 生成 IDE 入口 =====
  console.log('\n[2/2] 生成 IDE 入口');
  const ides = await resolveIdes(opts.target, opts.ideRaw);
  if (ides.length === 0) {
    warn('未检测到任何 IDE 目录（.cursor / .claude / .windsurf 都不存在）');
    warn('如要强制安装，跑：npx epoint-f10code-gen init --ide all');
    footer(true, 'init 完成（仅同步主体，未生成 IDE 入口）');
    return 0;
  }

  let failedCount = 0;
  for (const s of ides) {
    console.log(`\n  [${s.label}]`);
    const dst = path.join(opts.target, s.relTarget);
    console.log(`    src: installer/stubs/${path.basename(s.template)}`);
    console.log(`    dst: ${path.relative(opts.target, dst)}`);

    if (!(await exists(s.template))) {
      fail(`模板缺失：${s.template}`);
      failedCount += 1;
      continue;
    }

    if ((await exists(dst)) && !opts.flags.force && !opts.flags.dryRun) {
      const backup = `${dst}.bak.${timestamp()}`;
      await fs.copyFile(dst, backup);
      ok(`已备份旧入口 → ${path.relative(opts.target, backup)}`);
    }

    if (opts.flags.dryRun) {
      ok('[dry-run] 会写入口文件');
    } else {
      await ensureDir(path.dirname(dst));
      await fs.copyFile(s.template, dst);
      ok(`已安装入口`);
    }
  }

  footer(
    failedCount === 0,
    failedCount === 0
      ? opts.flags.dryRun
        ? 'init dry-run 完成（未真正写入）'
        : `init 完成，已为 ${ides.length} 个 IDE 安装入口`
      : `init 失败：${failedCount} 个入口未装上`
  );
  return failedCount === 0 ? 0 : 1;
}

// ========== command: check ==========
async function cmdCheck(opts) {
  banner('check');
  console.log(`  目标工程根: ${opts.target}\n`);

  let mismatch = 0;
  let installedCount = 0;
  let missingCount = 0;
  for (const s of STUBS) {
    console.log(`[${s.label}]`);
    const dst = path.join(opts.target, s.relTarget);
    if (!(await exists(dst))) {
      warn(`未安装：${path.relative(opts.target, dst)}`);
      missingCount += 1;
      continue;
    }
    installedCount += 1;
    if (!(await exists(s.template))) {
      fail(`模板缺失（包损坏？）：${s.template}`);
      mismatch += 1;
      continue;
    }
    const src = await fs.readFile(s.template, 'utf8');
    const tgt = await fs.readFile(dst, 'utf8');
    if (src === tgt) {
      ok('内容一致');
    } else {
      fail(`内容与模板不一致：${path.relative(opts.target, dst)}`);
      info('  建议跑：npx epoint-f10code-gen init --force');
      mismatch += 1;
    }
    console.log('');
  }

  let summary;
  if (installedCount === 0) {
    summary = `未安装任何 IDE 入口（${missingCount} 个目标都不存在）— 跑 \`npx epoint-f10code-gen init\` 即可`;
  } else if (mismatch === 0) {
    summary = `已装 ${installedCount} 个入口与模板完全一致${missingCount > 0 ? `（另 ${missingCount} 个未装）` : ''}`;
  } else {
    summary = `${mismatch} 个不一致${missingCount > 0 ? ` + ${missingCount} 个未装` : ''}`;
  }
  footer(mismatch === 0, summary);
  return mismatch === 0 ? 0 : 1;
}

// ========== command: update ==========
async function cmdUpdate(opts) {
  banner('update');
  console.log(`  目标工程根: ${opts.target}`);
  console.log(`  动作: 只同步主体，不动 IDE 入口\n`);

  const targetSkillDir = path.join(opts.target, 'epoint-f10code-gen');
  if (path.resolve(targetSkillDir) === path.resolve(SKILL_PKG_ROOT)) {
    info('目标与源相同（在 skill 仓库内运行），无需 update');
    footer(true, 'update 跳过');
    return 0;
  }

  if (opts.flags.dryRun) {
    ok(`[dry-run] 将把主体复制到 ${targetSkillDir}`);
    footer(true, 'dry-run 完成');
    return 0;
  }

  if (await exists(targetSkillDir)) {
    if (!opts.flags.force) {
      const backupDir = `${targetSkillDir}.bak.${timestamp()}`;
      await fs.rename(targetSkillDir, backupDir);
      ok(`已备份旧主体 → ${path.relative(opts.target, backupDir)}`);
    } else {
      await fs.rm(targetSkillDir, { recursive: true, force: true });
      ok('已强制删除旧主体（--force）');
    }
  }

  const skip = new Set(['node_modules', '.git', '.DS_Store']);
  await copyDir(SKILL_PKG_ROOT, targetSkillDir, skip);
  ok(`主体已同步 → ${path.relative(opts.target, targetSkillDir)}/`);
  footer(true, 'update 完成');
  return 0;
}

// ========== 委托给现有 scripts/*.mjs ==========
function runChildScript(scriptRelPath, extraArgs = []) {
  return new Promise((resolve) => {
    const scriptPath = path.join(SKILL_PKG_ROOT, scriptRelPath);
    const child = spawn(process.execPath, [scriptPath, ...extraArgs], {
      stdio: 'inherit'
    });
    child.on('close', (code) => resolve(code ?? 0));
  });
}

async function cmdSmoke() {
  return runChildScript('scripts/smoke-test.mjs');
}

async function cmdValidate(opts) {
  if (opts.positional.length === 0) {
    console.error('用法: npx epoint-f10code-gen validate <vue-file-path>');
    return 1;
  }
  return runChildScript('scripts/validate-page.mjs', [opts.positional[0]]);
}

async function cmdSync() {
  return runChildScript('scripts/sync-from-docs.mjs');
}

async function cmdGenApiDoc(opts) {
  if (opts.positional.length === 0) {
    console.error('用法: npx epoint-f10code-gen gen-api-doc <mock-file|mock-dir> [--out-dir <dir>] [--module <name>] [--app-name <name>] [--config <file>] [--api-prefix <path>]');
    return 1;
  }
  // 透传 positional + 已知 options
  const passthroughArgs = [opts.positional[0]];
  for (const flag of ['out-dir', 'module', 'app-name', 'config', 'api-prefix']) {
    const idx = process.argv.indexOf(`--${flag}`);
    if (idx >= 0 && process.argv[idx + 1]) {
      passthroughArgs.push(`--${flag}`, process.argv[idx + 1]);
    }
  }
  return runChildScript('scripts/gen-api-doc.mjs', passthroughArgs);
}

// ========== Entry ==========
async function main() {
  const opts = parseArgs(process.argv);
  if (opts.flags.help || !opts.command) {
    printHelp();
    return 0;
  }
  switch (opts.command) {
    case 'init':
      return cmdInit(opts);
    case 'check':
      return cmdCheck(opts);
    case 'update':
      return cmdUpdate(opts);
    case 'smoke':
      return cmdSmoke();
    case 'validate':
      return cmdValidate(opts);
    case 'sync':
      return cmdSync();
    case 'gen-api-doc':
      return cmdGenApiDoc(opts);
    default:
      console.error(`未知命令: ${opts.command}`);
      console.error('跑 `npx epoint-f10code-gen --help` 查看可用命令');
      return 1;
  }
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error('✗ CLI 执行失败：');
    console.error(err);
    process.exit(1);
  });
