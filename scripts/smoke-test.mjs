#!/usr/bin/env node
/**
 * smoke-test.mjs
 * 检查 epoint-f10code-gen skill 自身的完整性。
 * 跨平台、零依赖。
 *
 * 检查项：
 *   1. 必备文件存在（SKILL.md / README.md / ANTI-TEMPLATES.md / CHANGELOG.md）
 *   2. SKILL.md 行数 ≤ 200
 *   3. SKILL.md frontmatter 必备字段（description / primary / auto-triggers / red-flags-stop）
 *   4. rules/ 5 个文件全在
 *   5. workflows/ 关键文件全在（00-orchestrator + page/01~07 + env/* + project/* + update-rules + fix-bug）
 *   6. references/ 三份索引存在
 *   7. references/docs/ 有内容（说明 sync 跑过）
 *   8. templates/ 6 份骨架在
 *   9. SKILL.md / rules / workflows 中没有占位符残留（仅 templates/*.tmpl 与白名单允许）
 *  10. installer/stubs/ 3 份 IDE 入口模板（cursor/claude/windsurf）+ README
 *  11. npx 入口（bin/cli.mjs + package.json 的 name / bin 字段）
 *
 * 用法：
 *   node epoint-f10code-gen/scripts/smoke-test.mjs
 *
 * 退出码：
 *   0 = 全过
 *   1 = 有 fail（关键项缺失）
 *   2 = 有 warn（非关键项缺失）
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(SKILL_ROOT, '..');

let failCount = 0;
let warnCount = 0;

const ok = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg) => {
  console.log(`  ✗ ${msg}`);
  failCount += 1;
};
const warn = (msg) => {
  console.log(`  ⚠ ${msg}`);
  warnCount += 1;
};

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function readFile(p) {
  return fs.readFile(p, 'utf8');
}

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('epoint-f10code-gen · smoke-test.mjs');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  // ========== 1. 必备主文件 ==========
  console.log('[1] 必备主文件');
  for (const file of ['SKILL.md', 'README.md', 'ANTI-TEMPLATES.md', 'CHANGELOG.md']) {
    const p = path.join(SKILL_ROOT, file);
    if (await exists(p)) ok(file);
    else fail(`缺失：${file}`);
  }

  // ========== 2. SKILL.md 行数 ==========
  console.log('\n[2] SKILL.md 行数 ≤ 200');
  try {
    const content = await readFile(path.join(SKILL_ROOT, 'SKILL.md'));
    const lines = content.split('\n').length;
    if (lines <= 200) ok(`${lines} 行（限 200）`);
    else warn(`${lines} 行，超过推荐上限 200`);
  } catch (e) {
    fail(`无法读 SKILL.md: ${e.message}`);
  }

  // ========== 3. SKILL.md frontmatter ==========
  console.log('\n[3] SKILL.md frontmatter 必备字段');
  try {
    const content = await readFile(path.join(SKILL_ROOT, 'SKILL.md'));
    const fmMatch = content.match(/^---\n([\s\S]+?)\n---/);
    if (!fmMatch) {
      fail('没有 frontmatter');
    } else {
      const fm = fmMatch[1];
      for (const key of ['name', 'description', 'when-to-use', 'primary', 'auto-triggers', 'red-flags-stop']) {
        if (new RegExp(`^${key}:`, 'm').test(fm)) ok(`含 ${key}`);
        else fail(`frontmatter 缺：${key}`);
      }
    }
  } catch (e) {
    fail(e.message);
  }

  // ========== 4. rules/ 5 个文件 ==========
  console.log('\n[4] rules/ 5 个文件');
  for (const f of [
    'project-rules.md',
    'coding-standards.md',
    'data-model-rules.md',
    'component-usage-rules.md',
    'style-rules.md'
  ]) {
    const p = path.join(SKILL_ROOT, 'rules', f);
    if (await exists(p)) ok(`rules/${f}`);
    else fail(`缺失：rules/${f}`);
  }

  // ========== 5. workflows/ 关键文件 ==========
  console.log('\n[5] workflows/ 关键文件');
  const workflowFiles = [
    '00-orchestrator.md',
    'fix-bug.md',
    'update-rules.md',
    'page/01-confirm-intent.md',
    'page/02-match-template.md',
    'page/03-generate.md',
    'page/04-mock.md',
    'page/05-route.md',
    'page/06-verify.md',
    'page/07-api-doc.md',
    'env/00-detect.md',
    'env/01-node.md',
    'env/02-pnpm.md',
    'env/03-source.md',
    'env/04-login.md',
    'env/05-eui-cli.md',
    'project/00-detect.md',
    'project/01-workspace.md',
    'project/02-web.md',
    'project/03-component.md',
    'project/04-register.md',
    'project/05-install-build.md',
    'project/06-run-dev.md'
  ];
  for (const f of workflowFiles) {
    const p = path.join(SKILL_ROOT, 'workflows', f);
    if (await exists(p)) ok(`workflows/${f}`);
    else fail(`缺失：workflows/${f}`);
  }

  // v0.4.1 trigger sanity: 触发描述层只保留 F10 / EUI 领域入口
  console.log('\n[5b] v0.4.1 精简触发词 / 新流程');
  try {
    const skill = await readFile(path.join(SKILL_ROOT, 'SKILL.md'));
    const fmMatch = skill.match(/^---\n([\s\S]+?)\n---/);
    const fm = fmMatch ? fmMatch[1] : '';
    const desc = (fm.match(/^description:\s*(.*)$/m) || [])[1] || '';
    const auto = (fm.match(/^auto-triggers:\n([\s\S]*?)(?=^[a-z-]+:)/m) || [])[1] || '';
    const triggerSurface = `${desc}\n${auto}`;
    const expected = [
      'F10',
      'F10 框架',
      'epoint F10',
      'EUI',
      'EUI4.0',
      'EUI4',
      'EUI Vue',
      'eui-cli'
    ];
    for (const token of expected) {
      if (fm.includes(token)) ok(`frontmatter 含 ${token}`);
      else fail(`SKILL.md 缺 v0.4 触发/流程：${token}`);
    }
    const triggerForbidden = [
      'ep-data-grid',
      'defineDataModel',
      'defineFrameModel',
      'useTableModel',
      '@epframe/eui-core',
      '标段管理',
      'page-examples',
      '接口文档'
    ];
    for (const token of triggerForbidden) {
      if (triggerSurface.includes(token)) fail(`description/auto-triggers 不应再包含细粒度触发词：${token}`);
      else ok(`description/auto-triggers 已移除 ${token}`);
    }
  } catch (e) {
    fail(e.message);
  }

  // ========== 6. references/ 三份索引 ==========
  console.log('\n[6] references/ 三份索引');
  for (const f of ['docs-index.md', 'examples-index.md', 'gotchas.md']) {
    const p = path.join(SKILL_ROOT, 'references', f);
    if (await exists(p)) ok(`references/${f}`);
    else fail(`缺失：references/${f}`);
  }

  // ========== 7. references/docs/ 已 sync ==========
  console.log('\n[7] references/docs/ 已 sync');
  const docsDir = path.join(SKILL_ROOT, 'references', 'docs');
  if (!(await exists(docsDir))) {
    fail('references/docs/ 不存在，请跑 scripts/sync-from-docs.mjs');
  } else {
    try {
      const entries = await fs.readdir(docsDir);
      if (entries.length === 0) {
        fail('references/docs/ 是空目录，请跑 scripts/sync-from-docs.mjs');
      } else {
        // 抽查关键文件
        const keyFiles = [
          'frontpage.md',
          'dialog-interaction.md',
          'troubleshooting.md',
          'page-examples/page-template-index.md',
          'page-examples/base/list.vue'
        ];
        for (const f of keyFiles) {
          if (await exists(path.join(docsDir, f))) ok(`docs/${f}`);
          else fail(`docs/ 缺：${f}（sync 不完整？）`);
        }
        ok(`docs/ 顶层 ${entries.length} 项`);
      }
    } catch (e) {
      fail(e.message);
    }
  }

  // ========== 8. templates/ 6 份 ==========
  console.log('\n[8] templates/ 6 份骨架');
  const templateFiles = [
    'data-model/list-model.js.tmpl',
    'data-model/form-model.js.tmpl',
    'mock/crud.mock.ts.tmpl',
    'mock/tree-list.mock.ts.tmpl',
    'mock/business-mock.middleware.mjs.tmpl',
    'route/static-route.js.tmpl'
  ];
  for (const f of templateFiles) {
    const p = path.join(SKILL_ROOT, 'templates', f);
    if (await exists(p)) ok(`templates/${f}`);
    else fail(`缺失：templates/${f}`);
  }

  // v0.4 新增 templates/api-doc/
  console.log('\n[8b] templates/api-doc/ 接口文档骨架（v0.4）');
  for (const f of ['markdown.md.tmpl', 'api.json.tmpl']) {
    const p = path.join(SKILL_ROOT, 'templates', 'api-doc', f);
    if (await exists(p)) ok(`templates/api-doc/${f}`);
    else fail(`缺失：templates/api-doc/${f}`);
  }
  try {
    const mdTpl = await readFile(path.join(SKILL_ROOT, 'templates', 'api-doc', 'markdown.md.tmpl'));
    const jsonTpl = await readFile(path.join(SKILL_ROOT, 'templates', 'api-doc', 'api.json.tmpl'));
    for (const token of ['{{INTERFACE_TABLE_HEADER}}', '{{INTERFACE_TABLE}}', '{{INTERFACE_DETAILS}}']) {
      if (mdTpl.includes(token)) ok(`markdown.md.tmpl 含 ${token}`);
      else fail(`markdown.md.tmpl 缺逐接口明细占位：${token}`);
    }
    for (const token of ['"request"', '"response"', '"fields"', '"example"', '"fieldSources"']) {
      if (jsonTpl.includes(token)) ok(`api.json.tmpl 含 ${token}`);
      else fail(`api.json.tmpl 缺逐接口 JSON 契约：${token}`);
    }
  } catch (e) {
    fail(`templates/api-doc/ 读取失败：${e.message}`);
  }

  // ========== 9. 占位符残留检查（仅 templates/ 允许） ==========
  // 用字符串拼接构造占位符标记，避免脚本自己被自己扫到
  const PLACEHOLDER_MARKER = '<' + 'FILL' + ':';
  console.log(`\n[9] ${PLACEHOLDER_MARKER} > 占位符残留检查（templates/ 之外）`);
  // 白名单：以下文件本身就是用来"说明该占位符约定"的，允许出现
  const WHITELIST = new Set([
    'ANTI-TEMPLATES.md',
    path.join('scripts', 'smoke-test.mjs'),
    path.join('scripts', 'validate-page.mjs'),
    path.join('bin', 'cli.mjs')
  ]);

  async function walk(dir, fileCb) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // 跳过 references/docs（同步过来的，不要扫）和 templates（允许占位符）
        if (p.includes(path.join('references', 'docs'))) continue;
        if (p.includes(path.join('templates'))) continue;
        if (entry.name === 'node_modules') continue;
        // v0.4 跳过测试用 fixture 与生成产物
        if (entry.name === '__test-fixtures__') continue;
        await walk(p, fileCb);
      } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mjs'))) {
        await fileCb(p);
      }
    }
  }

  let fillCount = 0;
  let fillFiles = [];
  await walk(SKILL_ROOT, async (file) => {
    const rel = path.relative(SKILL_ROOT, file);
    if (WHITELIST.has(rel)) return;
    const c = await readFile(file);
    if (c.includes(PLACEHOLDER_MARKER)) {
      fillCount += 1;
      fillFiles.push(rel);
    }
  });
  if (fillCount === 0) ok(`无 ${PLACEHOLDER_MARKER} 残留`);
  else {
    fail(`发现 ${fillCount} 个文件含 ${PLACEHOLDER_MARKER} 残留:`);
    fillFiles.forEach((f) => console.log(`     - ${f}`));
  }

  // ========== 10. installer/stubs/ 3 份 IDE 入口模板 ==========
  console.log('\n[10] installer/stubs/ 3 份 IDE 入口模板');
  const stubFiles = [
    'cursor-skill.md',
    'claude-skill.md',
    'windsurf-rule.md'
  ];
  for (const f of stubFiles) {
    const p = path.join(SKILL_ROOT, 'installer', 'stubs', f);
    if (await exists(p)) ok(`installer/stubs/${f}`);
    else fail(`缺失：installer/stubs/${f}`);
  }
  const stubsReadme = path.join(SKILL_ROOT, 'installer', 'stubs', 'README.md');
  if (await exists(stubsReadme)) ok('installer/stubs/README.md');
  else warn('installer/stubs/README.md 缺失（不影响 CLI 运行，建议补）');

  // ========== 11. bin/cli.mjs + package.json（npx 入口）==========
  console.log('\n[11] npx 入口');
  const binCli = path.join(SKILL_ROOT, 'bin', 'cli.mjs');
  if (await exists(binCli)) ok('bin/cli.mjs');
  else fail('缺失：bin/cli.mjs');
  const pkgJson = path.join(SKILL_ROOT, 'package.json');
  if (await exists(pkgJson)) {
    try {
      const pkg = JSON.parse(await readFile(pkgJson));
      if (pkg.bin && pkg.bin['epoint-f10code-gen']) {
        ok(`package.json · bin.epoint-f10code-gen → ${pkg.bin['epoint-f10code-gen']}`);
      } else {
        fail('package.json 缺 bin.epoint-f10code-gen 字段');
      }
      if (pkg.name) ok(`package.json · name = ${pkg.name}`);
      else fail('package.json 缺 name 字段');
      if (pkg.version) ok(`package.json · version = ${pkg.version}`);
      else fail('package.json 缺 version 字段');
    } catch (e) {
      fail(`package.json 解析失败：${e.message}`);
    }
  } else {
    fail('缺失：package.json（npm publish 必备）');
  }

  // ========== 12. v0.4 新增 CLI 子命令（gen-api-doc）==========
  console.log('\n[12] v0.4 CLI 子命令');
  const genApiDocScript = path.join(SKILL_ROOT, 'scripts', 'gen-api-doc.mjs');
  if (await exists(genApiDocScript)) ok('scripts/gen-api-doc.mjs');
  else fail('缺失：scripts/gen-api-doc.mjs（gen-api-doc CLI 主体）');
  try {
    const cli = await readFile(binCli);
    if (cli.includes("case 'gen-api-doc'")) ok('bin/cli.mjs 已注册 gen-api-doc 子命令');
    else fail('bin/cli.mjs 缺 gen-api-doc 子命令分支');
    for (const token of ['mock-file|mock-dir', '--config', '--api-prefix']) {
      if (cli.includes(token)) ok(`bin/cli.mjs gen-api-doc 帮助含 ${token}`);
      else fail(`bin/cli.mjs gen-api-doc 帮助缺 ${token}`);
    }
  } catch (e) {
    fail(`bin/cli.mjs 读取失败：${e.message}`);
  }

  // ========== 13. v0.4.2 接口文档明细化契约 ==========
  console.log('\n[13] v0.4.2 接口文档明细化');
  try {
    const apiWorkflow = await readFile(path.join(SKILL_ROOT, 'workflows', 'page', '07-api-doc.md'));
    for (const token of ['suite mode', 'request.fields', 'request.example', 'response.fields', 'response.example', 'MODULE_CONFIGS', 'ACTION_FORM_CONFIGS']) {
      if (apiWorkflow.includes(token)) ok(`07-api-doc.md 含 ${token}`);
      else fail(`07-api-doc.md 缺明细化契约：${token}`);
    }
    const genApiDoc = await readFile(genApiDocScript);
    for (const token of ['mock-file|mock-dir', 'standalone_suite', 'loadConfigIndex', 'api-prefix', 'assertDocComplete']) {
      if (genApiDoc.includes(token)) ok(`gen-api-doc.mjs 含 ${token}`);
      else fail(`gen-api-doc.mjs 缺 v0.4.2 能力：${token}`);
    }
    for (const f of [
      'mock/ipd-lite/requirement.mock.ts',
      'mock/ipd-lite/trdcp-review.mock.ts',
      'mock/ipd-lite/dashboard.mock.ts',
      'mock/ipd-lite/framework.mock.ts',
      'src/views/ipd-lite/config.js'
    ]) {
      const p = path.join(SKILL_ROOT, 'scripts', '__test-fixtures__', f);
      if (await exists(p)) ok(`__test-fixtures__/${f}`);
      else fail(`缺失：__test-fixtures__/${f}`);
    }
  } catch (e) {
    fail(`v0.4.2 明细化检查失败：${e.message}`);
  }

  // ========== 总结 ==========
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  if (failCount === 0 && warnCount === 0) {
    console.log('✓ 全部检查通过');
  } else if (failCount === 0) {
    console.log(`⚠ ${warnCount} 个 warn（非致命）`);
  } else {
    console.log(`✗ ${failCount} 个 fail` + (warnCount > 0 ? ` + ${warnCount} 个 warn` : ''));
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (failCount > 0) process.exit(1);
  if (warnCount > 0) process.exit(2);
  process.exit(0);
}

main().catch((err) => {
  console.error('✗ smoke-test 执行失败：');
  console.error(err);
  process.exit(1);
});
