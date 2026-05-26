#!/usr/bin/env node
/**
 * sync-from-docs.mjs
 * 一次性把 vue-docs-for-ai-main/vue-docs/ 整体 copy 到 epoint-f10code-gen/references/docs/。
 * 跨平台 (Windows / mac / Linux)，使用 Node.js 内置 fs，无第三方依赖。
 *
 * 用法：
 *   node epoint-f10code-gen/scripts/sync-from-docs.mjs
 *   node epoint-f10code-gen/scripts/sync-from-docs.mjs --dry-run   # 仅检查不实际 copy
 *   node epoint-f10code-gen/scripts/sync-from-docs.mjs --force     # 强制重新 copy（删旧）
 *
 * 退出码：
 *   0 = 成功
 *   1 = 源不存在 / 路径错误
 *   2 = 写入失败
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 仓库根：脚本在 epoint-f10code-gen/scripts/ 下，往上 2 层是仓库根
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SOURCE_DIR = path.join(REPO_ROOT, 'vue-docs-for-ai-main', 'vue-docs');
const TARGET_DIR = path.join(REPO_ROOT, 'epoint-f10code-gen', 'references', 'docs');

// 排除项
const EXCLUDE = new Set(['.DS_Store', 'Thumbs.db', '.git']);

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const FORCE = args.includes('--force');

// 统计
const stats = {
  totalFiles: 0,
  copiedFiles: 0,
  skippedFiles: 0,
  totalBytes: 0,
  byExtension: {}
};

/**
 * 递归 copy 目录
 * @param {string} src 源路径
 * @param {string} dst 目标路径
 */
async function copyDir(src, dst) {
  const entries = await fs.readdir(src, { withFileTypes: true });
  await fs.mkdir(dst, { recursive: true });

  for (const entry of entries) {
    if (EXCLUDE.has(entry.name)) continue;

    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, dstPath);
    } else if (entry.isFile()) {
      stats.totalFiles += 1;
      const ext = path.extname(entry.name) || '<no-ext>';
      stats.byExtension[ext] = (stats.byExtension[ext] || 0) + 1;

      if (DRY_RUN) {
        stats.skippedFiles += 1;
        continue;
      }

      try {
        await fs.copyFile(srcPath, dstPath);
        const stat = await fs.stat(dstPath);
        stats.totalBytes += stat.size;
        stats.copiedFiles += 1;
      } catch (err) {
        console.error(`  ✗ 写入失败：${dstPath}`);
        console.error(`    ${err.message}`);
        process.exitCode = 2;
      }
    }
  }
}

/**
 * 主流程
 */
async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('epoint-f10code-gen · sync-from-docs.mjs');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`源：${SOURCE_DIR}`);
  console.log(`目标：${TARGET_DIR}`);
  console.log(`模式：${DRY_RUN ? 'dry-run（仅检查）' : FORCE ? 'force（删旧重 copy）' : '增量 copy'}`);
  console.log('');

  // 1. 检查源目录是否存在
  try {
    const stat = await fs.stat(SOURCE_DIR);
    if (!stat.isDirectory()) {
      console.error(`✗ 源不是目录：${SOURCE_DIR}`);
      process.exit(1);
    }
  } catch (err) {
    console.error(`✗ 源目录不存在：${SOURCE_DIR}`);
    console.error(`  ${err.message}`);
    process.exit(1);
  }

  // 2. 处理目标目录
  if (FORCE) {
    try {
      await fs.rm(TARGET_DIR, { recursive: true, force: true });
      console.log(`✓ 已删除旧目标目录`);
    } catch (err) {
      console.error(`⚠️  删除旧目录失败（继续）：${err.message}`);
    }
  }

  await fs.mkdir(TARGET_DIR, { recursive: true });

  // 3. 开始 copy
  const startTime = Date.now();
  console.log('开始同步...');
  console.log('');

  await copyDir(SOURCE_DIR, TARGET_DIR);

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  // 4. 输出统计
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`同步完成（${duration}s）`);
  console.log(`  扫描文件：${stats.totalFiles}`);
  console.log(`  ${DRY_RUN ? '将复制' : '已复制'}：${DRY_RUN ? stats.totalFiles : stats.copiedFiles}`);
  if (!DRY_RUN) {
    console.log(`  总大小：${(stats.totalBytes / 1024 / 1024).toFixed(2)} MB`);
  }
  console.log('');
  console.log('  按扩展名：');
  for (const [ext, count] of Object.entries(stats.byExtension).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${ext.padEnd(8)} ${count}`);
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  if (DRY_RUN) {
    console.log('💡 这是 dry-run。要真正执行请去掉 --dry-run');
  } else {
    console.log('✓ 下一步：在 references/ 写 docs-index.md / examples-index.md / gotchas.md');
  }
}

// 入口
main().catch((err) => {
  console.error('✗ 同步失败：');
  console.error(err);
  process.exit(2);
});
