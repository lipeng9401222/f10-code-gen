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
const warn = (msg) => console.log(`  ⚠ ${msg}`);

// =============================================================
// SFC 解析：把 .vue 拆成 template / script 两段
// =============================================================
function splitVueSections(source) {
  const templateMatch = source.match(/<template[^>]*>([\s\S]*?)<\/template>/i);
  const scriptMatch = source.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
  return {
    template: templateMatch ? templateMatch[1] : '',
    script: scriptMatch ? scriptMatch[1] : ''
  };
}

// =============================================================
// 数据模型签名检测（v0.4 R11 子规则统一通过这些谓词判断）
// =============================================================
// DM-R11 合法签名：defineDataModel ∪ defineFrameModel
function hasDefineModel(scriptCode) {
  return /Utils\.(defineDataModel|defineFrameModel)\s*\(/.test(scriptCode);
}

// 是否在 onMounted 内调用了 initData()（兼容带参数 / 不带参数）
function hasInitData(scriptCode) {
  return /model\.methods\.initData\s*\(/.test(scriptCode);
}

// 是否声明了 global.pageConfig（与 PageConfig 类配套）
function hasGlobalPageConfig(scriptCode) {
  return /global\s*:\s*\{[\s\S]*?pageConfig\s*:\s*new\s+PageConfig\s*\(/.test(scriptCode) ||
    /pageConfig\s*:\s*new\s+PageConfig\s*\(/.test(scriptCode);
}

// 模板里是否使用了 model.<标识符>（排除 :model="..." 这种 Element form 的 prop）
function templateUsesModel(templateCode) {
  // 把 :model="xxx" / :model='xxx' / :model=xxx 形态全部抹掉，再检测剩余的 model.
  const stripped = templateCode.replace(/:model\s*=\s*(['"])[^'"]*\1/g, '');
  return /\bmodel\.[a-zA-Z_$]/.test(stripped);
}

// 模板/script 是否使用了 model.global.pageConfig 或 model.pageConfig（DM-R11.4 真正触发条件）
// 仅引用 model.global.state.loading 等不算
function refsPageConfigField(code) {
  const stripped = code.replace(/:model\s*=\s*(['"])[^'"]*\1/g, '');
  return /\bmodel\.global\.pageConfig\b/.test(stripped) || /\bmodel\.pageConfig\b/.test(stripped);
}

/**
 * 检测页面顶层是否有"主数据形态"的散装 ref（DM-R11.3 第 ① 特征）
 * 主数据形态：ref({...}) / ref([...]) / ref(new ...) —— 容器型初始值
 * 排除：ref('') / ref(0) / ref(false) / ref(null) / ref(undefined) —— UI 局部状态
 */
function hasLooseDataRef(scriptCode) {
  // 移除注释 + 字符串 + 模板字符串，避免误命中
  const cleaned = stripCommentsAndStrings(scriptCode);
  // 命中 const|let xxx = ref({...}) | ref([...]) | ref(new XXX(...))
  return /\b(?:const|let)\s+\w+\s*=\s*ref\s*\(\s*(?:\{|\[|new\s+\w+)/.test(cleaned);
}

/**
 * 检测 script 中是否调用了 request / requestAxios / restfulAxios（DM-R11.3 第 ② 特征 · 放宽版）
 * 不再严格要求"onMounted 直接体内"，因为真实场景里常见模式是：
 *   onMounted(() => loadData())  →  const loadData = async () => Utils.request(...)
 * 即调用链经过本地函数。所以只要 script 里有 onMounted + 任意位置的 request 即视为命中第②特征。
 */
function hasOnMountedRequest(scriptCode) {
  // ① 必须有 onMounted
  if (!/onMounted\s*\(/.test(scriptCode)) return false;
  // ② script 任意位置（注释/字符串外）有 request 调用
  const cleaned = stripCommentsAndStrings(scriptCode);
  return /(?:Utils\.)?(?:request|requestAxios|restfulAxios)\s*\(/.test(cleaned);
}

/**
 * 删除 // 行注释、/* 块注释、单引号 / 双引号 / 反引号字符串内容（保留括号配对）
 */
function stripCommentsAndStrings(code) {
  return code
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/'[^'\n]*'/g, "''")
    .replace(/"[^"\n]*"/g, '""')
    .replace(/`[^`]*`/g, '``');
}

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

  // ===== 标准 SFC 拆分（template / script），R11 子规则用拆分后的内容做精确判定 =====
  const { template, script } = splitVueSections(content);

  // ===== 通用规则（基于整个文件的正则） =====
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
        warn(`[${check.name}] ${check.msg}`);
        warnings += 1;
      }
    }
  }

  // =============================================================
  // v0.4 R11 子规则（数据模型全页面通用约束）
  // 文档依据：references/docs/getting-started/getting-started-use-data-model.md
  // =============================================================
  const usesModel = templateUsesModel(template);
  const refsPageConfig = refsPageConfigField(template) || refsPageConfigField(script);
  const hasModelDef = hasDefineModel(script);
  const initDataCalled = hasInitData(script);

  // ----- DM-R11.1 模板 model. 引用必须有数据模型声明 -----
  if (usesModel) {
    if (hasModelDef) {
      ok('[DM-R11.1 模板 model. 引用有 defineDataModel/defineFrameModel]');
    } else {
      violation(
        'DM-R11.1 模板 model. 引用必须有数据模型声明',
        '模板中使用了 model.xxx，但 <script setup> 中没有 const model = Utils.defineDataModel(...) 或 Utils.defineFrameModel(...)'
      );
    }
  } else {
    ok('[DM-R11.1 模板未使用 model.，跳过]');
  }

  // ----- DM-R11.2 数据模型必须 onMounted 初始化 -----
  if (hasModelDef) {
    if (initDataCalled) {
      ok('[DM-R11.2 onMounted 初始化数据模型]');
    } else {
      violation(
        'DM-R11.2 数据模型必须 onMounted 初始化',
        '使用 defineDataModel/defineFrameModel 时必须在 onMounted 中调用 model.methods.initData()'
      );
    }
  } else {
    ok('[DM-R11.2 未使用数据模型，跳过]');
  }

  // ----- DM-R11.3 主数据禁止散装 ref + onMounted request -----
  // 三特征同时命中才报：① 顶层主数据 ref，② onMounted 内 request，③ 没有数据模型
  const looseRef = hasLooseDataRef(script);
  const onMountedReq = hasOnMountedRequest(script);
  if (looseRef && onMountedReq && !hasModelDef) {
    violation(
      'DM-R11.3 主数据禁止散装 ref + onMounted request',
      '页面顶层有 ref({...}) 或 ref([...]) + onMounted 内直接调 request/requestAxios/restfulAxios，且没有 defineDataModel/defineFrameModel。主数据加载必须走 useTableModel/useListModel/useTreeModel/createSubModel'
    );
  } else {
    ok('[DM-R11.3 未命中散装请求模式]');
  }

  // ----- DM-R11.4 引用了 pageConfig 字段时必须声明 PageConfig 实例 -----
  // 仅当真正用 model.global.pageConfig.xxx / model.pageConfig.xxx 时才校验
  // 仅用 model.global.state.loading 不触发
  if (refsPageConfig) {
    if (hasGlobalPageConfig(script)) {
      ok('[DM-R11.4 pageConfig 引用配套有 new PageConfig]');
    } else {
      violation(
        'DM-R11.4 pageConfig 引用必须实例化',
        '代码中读取了 model.global.pageConfig.xxx 或 model.pageConfig.xxx，但 defineDataModel 的 global 未声明 pageConfig: new PageConfig(...) — 该字段会是 undefined'
      );
    }
  } else {
    ok('[DM-R11.4 未引用 pageConfig 字段，跳过]');
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
