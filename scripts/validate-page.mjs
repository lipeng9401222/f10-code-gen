#!/usr/bin/env node
/**
 * validate-page.mjs
 * 检查生成的 .vue 文件是否合规（对照 rules/*.md）。
 *
 * 用法：
 *   node epoint-f10code-gen/scripts/validate-page.mjs <vue-file-path>
 *   node epoint-f10code-gen/scripts/validate-page.mjs packages/examples/src/views/demo/page/procurement/bid-mgmt/bid-mgmt-list.vue
 *
 * 退出码：
 *   0 = 全过
 *   1 = 有 violations
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('用法: node validate-page.mjs <vue-file-path>');
  process.exit(1);
}

const target = path.resolve(args[0]);

let violationCount = 0;
const violation = (rule, msg) => {
  console.log(`  ✗ [${rule}] ${msg}`);
  violationCount += 1;
};
const ok = (msg) => console.log(`  ✓ ${msg}`);

/**
 * 检查规则集
 * 来源：rules/coding-standards.md + rules/data-model-rules.md + rules/component-usage-rules.md + rules/style-rules.md
 */
const checks = [
  // ===== coding-standards.md =====
  {
    name: 'CS-R1 必须 <script setup>',
    rule: /<script\s+setup/,
    type: 'positive', // 必须命中
    msg: '缺少 <script setup>（不允许 Options API）'
  },
  {
    name: 'CS-R10 禁止 el- 前缀',
    rule: /<el-\w+/,
    type: 'negative', // 不能命中
    msg: '出现了 <el-...> Element Plus 残留'
  },
  {
    name: 'CS-R10 禁止 type="primary" 给 e-tag',
    rule: /<e-tag[^>]*type="primary"/,
    type: 'negative',
    msg: 'e-tag 不支持 type="primary"，仅 success/info/warning/danger/\'\''
  },
  {
    name: 'CS-R5 禁止 ref() 不带初始值',
    rule: /=\s*ref\(\s*\)/,
    type: 'negative',
    msg: 'ref() 必须带初始值 (ref("") / ref(0) / ref([]) / ref(null))'
  },
  {
    name: 'CS-R9 禁止 :key="index"',
    rule: /:key="index"/,
    type: 'negative',
    msg: 'v-for :key 必须用 item.id 或 item.value，不要用 index'
  },

  // ===== data-model-rules.md =====
  {
    name: 'DM-R1 表格直连接口禁止',
    rule: /Utils\.requestAxios\([\s\S]*?\/list/,
    type: 'negative',
    msg: '表格列表用了 Utils.requestAxios 直连，必须用 useTableModel'
  },
  {
    name: 'DM-R1 必须有 defineDataModel',
    rule: /Utils\.defineDataModel/,
    type: 'positive',
    msg: '页面必须用 Utils.defineDataModel 包装数据模型'
  },

  // ===== component-usage-rules.md =====
  {
    name: 'CU-R2 页面骨架必须 ep-layout-manager',
    rule: /<ep-layout-manager/,
    type: 'positive',
    msg: '页面最外层必须是 <ep-layout-manager>'
  },
  {
    name: 'CU-R4 业务弹窗禁止 v-model:visible',
    rule: /v-model:(visible|open)\s*=\s*"/,
    type: 'negative',
    msg: '业务弹窗禁止用 v-model:visible/open，必须用 $dialog API + 独立 .vue'
  },

  // ===== style-rules.md =====
  {
    name: 'ST-R10 禁止 !important（除非穷尽）',
    rule: /!important/,
    type: 'warn-negative', // 仅警告
    msg: '出现 !important，通常是选择器优先级写错了'
  },
  {
    name: 'ST-R2 禁止硬编码十六进制颜色',
    rule: /#[0-9a-fA-F]{3,6}\b/,
    type: 'warn-negative',
    msg: '出现硬编码颜色（如 #333），建议用 var(--e-...) token'
  }
];

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`validate-page.mjs · ${path.relative(process.cwd(), target)}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let content;
  try {
    content = await fs.readFile(target, 'utf8');
  } catch (e) {
    console.error(`✗ 无法读取文件：${target}`);
    console.error(`  ${e.message}`);
    process.exit(1);
  }

  let warnings = 0;

  for (const check of checks) {
    const matched = check.rule.test(content);
    if (check.type === 'positive') {
      if (matched) ok(`[${check.name}]`);
      else violation(check.name, check.msg);
    } else if (check.type === 'negative') {
      if (!matched) ok(`[${check.name}]`);
      else violation(check.name, check.msg);
    } else if (check.type === 'warn-negative') {
      if (!matched) ok(`[${check.name}]`);
      else {
        console.log(`  ⚠ [${check.name}] ${check.msg}`);
        warnings += 1;
      }
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  if (violationCount === 0 && warnings === 0) {
    console.log('✓ 完全合规');
  } else if (violationCount === 0) {
    console.log(`⚠ ${warnings} 个 warning（非致命）`);
  } else {
    console.log(`✗ ${violationCount} 个 violations` + (warnings > 0 ? ` + ${warnings} warnings` : ''));
    console.log('  对应 rules/*.md 修复');
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (violationCount > 0) process.exit(1);
  process.exit(0);
}

main().catch((err) => {
  console.error('✗ validate 失败：');
  console.error(err);
  process.exit(1);
});
