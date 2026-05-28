#!/usr/bin/env node
/**
 * gen-api-doc.mjs · v0.4
 *
 * 根据 mock 文件（.mock.ts / .mock.mjs / .mock.js）反推接口文档：
 *   - Markdown（人读）：基本信息 / 字段说明 / 接口列表 / 接口详情
 *   - JSON（机读）：与 workflows/page/07-api-doc.md Step 4 契约对齐
 *
 * 用法：
 *   node scripts/gen-api-doc.mjs <mock-file> [--out-dir <dir>] [--module <name>] [--app-name <name>]
 *
 *   - mock-file（必填）：mock 文件绝对路径或相对路径
 *   - --out-dir：输出目录，默认 <mock-file 所在目录的同级 docs/api/<module>/>，
 *               若推不出来则就地输出到 mock 文件同级目录
 *   - --module：模块名，默认从 mock 文件路径 mock/<module>/<appName>.mock.ts 反推
 *   - --app-name：应用名，默认从 mock 文件名（去掉 .mock.ts 后缀）反推
 *
 * 解析方式：
 *   V1 用静态正则提取 defineMock([{ url, method, response, ... }]) 数组的 url + method + 调用上下文
 *   不真跑 mock handler；字段类型从 mock 数据初始值的形态反推
 *
 * 退出码：
 *   0 = 成功
 *   1 = 失败（文件不存在 / 无法解析 / 其他错误）
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = path.resolve(__dirname, '..');
const TEMPLATE_DIR = path.join(SKILL_ROOT, 'templates', 'api-doc');

// ========== CLI 参数 ==========
function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        flags[key] = next;
        i += 1;
      } else {
        flags[key] = true;
      }
    } else {
      positional.push(arg);
    }
  }
  return { positional, flags };
}

function printHelp() {
  console.log(`gen-api-doc.mjs · 根据 mock 文件生成接口文档

用法:
  node scripts/gen-api-doc.mjs <mock-file> [选项]

选项:
  --out-dir <dir>     输出目录（默认推断为 <component_package>/docs/api/<module>/）
  --module <name>     模块名（默认从 mock 路径 mock/<module>/<appName>.mock.ts 反推）
  --app-name <name>   应用名（默认从 mock 文件名反推）
  --help              显示帮助

示例:
  node scripts/gen-api-doc.mjs <component_package>/mock/<module>/<appName>.mock.ts
  node scripts/gen-api-doc.mjs ./mock/order.mock.ts --module shop --app-name order
`);
}

// ========== 路径推断 ==========

/**
 * 从 mock 文件路径反推 module / appName / out-dir。
 * 约定路径：<component_package>/mock/<module>/<appName>.mock.ts
 *         或 <component_package>/mock/<appName>.mock.ts（无 module）
 */
function inferFromMockPath(mockFile) {
  const abs = path.resolve(mockFile);
  const baseName = path.basename(abs).replace(/\.mock\.(ts|mjs|js)$/i, '');
  const segments = abs.split(path.sep);
  const mockIdx = segments.lastIndexOf('mock');

  let module = 'default';
  let componentPackage = null;

  if (mockIdx > 0) {
    componentPackage = segments.slice(0, mockIdx).join(path.sep);
    // mockIdx 后第一段如果不是文件名则是 module
    const afterMock = segments.slice(mockIdx + 1, -1);
    if (afterMock.length > 0) module = afterMock[0];
  }

  const outDir = componentPackage
    ? path.join(componentPackage, 'docs', 'api', module)
    : path.dirname(abs);

  return { module, appName: baseName, outDir, componentPackage };
}

// ========== Mock AST 解析（静态正则） ==========

function stripCommentsAndStrings(code) {
  return code
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');
}

/**
 * 提取 defineMock([...]) 中的所有接口定义
 * 返回 [{ url, method, responseSnippet, responseSampleNames }]
 */
function extractInterfaces(mockSource) {
  const cleaned = stripCommentsAndStrings(mockSource);

  // 找到所有 { url: '...', method: '...', response: ... } 形态的对象块
  // 用括号配对找 { ... }，从 url: 开始扫描
  const interfaces = [];
  const urlPattern = /url\s*:\s*['"]([^'"]+)['"]/g;
  let match;

  while ((match = urlPattern.exec(cleaned)) !== null) {
    const url = match[1];
    // 在 url 出现位置周围找完整的对象块
    // 向前找最近的 {
    let braceStart = match.index;
    let depth = 0;
    while (braceStart > 0) {
      braceStart -= 1;
      const ch = cleaned[braceStart];
      if (ch === '}') depth += 1;
      else if (ch === '{') {
        if (depth === 0) break;
        depth -= 1;
      }
    }
    if (cleaned[braceStart] !== '{') continue;

    // 向后找匹配的 }
    let braceEnd = match.index;
    depth = 1;
    while (braceEnd < cleaned.length - 1 && depth > 0) {
      braceEnd += 1;
      const ch = cleaned[braceEnd];
      if (ch === '{') depth += 1;
      else if (ch === '}') depth -= 1;
    }
    if (depth !== 0) continue;

    const block = cleaned.slice(braceStart, braceEnd + 1);

    const methodMatch = block.match(/method\s*:\s*['"]([^'"]+)['"]/);
    const method = methodMatch ? methodMatch[1].toLowerCase() : 'post';

    interfaces.push({
      url,
      method,
      block,
      responseSampleNames: extractFieldNamesFromBlock(block)
    });
  }

  // 去重（同 url + method）
  const seen = new Set();
  return interfaces.filter((it) => {
    const key = `${it.method}:${it.url}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * 从 mock handler 块里提取字段名
 * 启发式：找 body.params.<x> / body.<x> 出现的字段，以及 records 数组对象的 key
 */
function extractFieldNamesFromBlock(block) {
  const names = new Set();
  // body.params.xxx / body.xxx
  for (const m of block.matchAll(/body(?:\.params)?\.(\w+)/g)) {
    if (!isFrameworkKey(m[1])) names.add(m[1]);
  }
  return [...names];
}

/**
 * 从全局 store 初始数据 / records 数组等位置提取字段名（更全）
 * 思路：扫所有 .map(... => ({...})) / Array.from(...).map(...) 块内的对象字面量 key
 */
function extractFieldNamesFromGlobalStore(mockSource) {
  const cleaned = stripCommentsAndStrings(mockSource);
  const names = new Set();

  // 找形如 .map((...) => ({ key: val, ... })) 的代码块
  // 用粗略匹配：从 .map 开始，找到对应的 ({...}))
  let idx = 0;
  while (idx < cleaned.length) {
    const mapIdx = cleaned.indexOf('.map(', idx);
    if (mapIdx < 0) break;
    // 找紧跟其后的 ({
    const objStart = cleaned.indexOf('({', mapIdx);
    if (objStart < 0 || objStart - mapIdx > 50) {
      idx = mapIdx + 5;
      continue;
    }
    // 配对 { ... }
    let depth = 1;
    let i = objStart + 2;
    while (i < cleaned.length && depth > 0) {
      const ch = cleaned[i];
      if (ch === '{') depth += 1;
      else if (ch === '}') depth -= 1;
      i += 1;
    }
    const objBlock = cleaned.slice(objStart + 1, i);
    for (const m of objBlock.matchAll(/(\w+)\s*:/g)) {
      const key = m[1];
      if (isFrameworkKey(key)) continue;
      if (/^[a-z][a-zA-Z0-9_]*$/.test(key)) names.add(key);
    }
    idx = i;
  }

  return [...names];
}

/**
 * 排除框架级 / 工具级 / 选项渲染级字段
 */
function isFrameworkKey(key) {
  return [
    // 通用响应封装字段
    'state', 'message', 'data', 'total', 'success', 'code',
    // 分页参数
    'pageIndex', 'pageSize', 'current', 'page',
    // 通用请求/工具
    'params', 'conditions', 'query', 'body', 'request', 'response', 'method', 'url', 'headers',
    // 选项渲染（statusOptions 类接口的固定结构，不是业务字段）
    'label', 'value', 'children',
    // Array.from 等参数
    'length', 'min', 'max', 'from'
  ].includes(key);
}

// ========== 字段类型推断 ==========

const FIELD_HINTS = [
  { match: /^(id|guid|.*Guid|.*Id)$/i, type: 'id', desc: '主键' },
  { match: /^(.*Phone|.*Mobile|.*Tel|phone|mobile|tel)$/i, type: 'phone', desc: '电话' },
  { match: /^(.*Email|.*Mail|email|mail)$/i, type: 'email', desc: '邮箱' },
  { match: /^(name|.*Name)$/i, type: 'text', desc: '名称' },
  { match: /^(code|.*Code)$/i, type: 'text', desc: '编号' },
  { match: /^(status|state|.*Status)$/i, type: 'enum', desc: '状态' },
  { match: /^(amount|money|price|fee|.*Amount|.*Price|.*Fee)$/i, type: 'amount', desc: '金额' },
  { match: /^(.*Time|.*Date|createTime|updateTime|deadline|birthday)$/i, type: 'datetime', desc: '时间' },
  { match: /^(creator|owner|.*User|.*Person|.*Manager)$/i, type: 'cname', desc: '人员' },
  { match: /^(remark|description|desc|note|comment)$/i, type: 'text', desc: '备注' },
  { match: /^(count|num|.*Count|.*Num|.*Total)$/i, type: 'number', desc: '数量' },
  { match: /^(is.*|has.*|.*Flag|.*Enabled|.*Disabled)$/i, type: 'boolean', desc: '布尔' }
];

function inferFieldType(name) {
  for (const hint of FIELD_HINTS) {
    if (hint.match.test(name)) return { type: hint.type, descGuess: hint.desc };
  }
  return { type: 'text', descGuess: '字段' };
}

// ========== URL 后缀分类 ==========

const URL_SUFFIX_MAP = [
  { suffix: '/list', name: '分页列表', requestSchema: 'list', responseSchema: 'pagedList' },
  { suffix: '/tree', name: '树数据', requestSchema: 'optional', responseSchema: 'tree' },
  { suffix: '/treeList', name: '树列表', requestSchema: 'optional', responseSchema: 'tree' },
  { suffix: '/info', name: '详情', requestSchema: 'idOnly', responseSchema: 'item' },
  { suffix: '/add', name: '新增', requestSchema: 'fields', responseSchema: 'success' },
  { suffix: '/update', name: '更新', requestSchema: 'idAndFields', responseSchema: 'success' },
  { suffix: '/delete', name: '删除', requestSchema: 'idOnly', responseSchema: 'success' },
  { suffix: '/batchDelete', name: '批量删除', requestSchema: 'idsArray', responseSchema: 'success' }
];

function classifyInterface(url) {
  for (const cls of URL_SUFFIX_MAP) {
    if (url.endsWith(cls.suffix)) return cls;
  }
  if (url.endsWith('Options')) {
    return { suffix: 'Options', name: '选项数据', requestSchema: 'optional', responseSchema: 'options' };
  }
  return { suffix: '<custom>', name: '自定义接口', requestSchema: 'unknown', responseSchema: 'unknown' };
}

// ========== 字段表 / 接口表渲染 ==========

function renderFieldsTable(fields) {
  if (fields.length === 0) {
    return '| - | - | - | - | _未识别到字段（请补充 intent.fields）_ | - |';
  }
  return fields
    .map((f) => {
      const desc = f.desc || `${f.descGuess || f.label || f.name}（待后端确认）`;
      const example = f.example !== undefined ? String(f.example) : `<${f.type}>`;
      return `| \`${f.name}\` | ${f.label || '-'} | ${f.type} | ${f.required ? '是' : '否'} | ${desc} | \`${example}\` |`;
    })
    .join('\n');
}

function renderInterfaceTable(interfaces) {
  return interfaces
    .map((it) => `| \`${it.method.toUpperCase()}\` | \`${it.url}\` | ${it.classification.name} |`)
    .join('\n');
}

function renderInterfaceDetails(interfaces, fields) {
  return interfaces
    .map((it, idx) => {
      const num = idx + 1;
      const cls = it.classification;
      const reqSample = renderRequestSample(cls.requestSchema, fields);
      const resSample = renderResponseSample(cls.responseSchema, fields);
      return `### ${num}. ${cls.name}

- **Method**: \`${it.method.toUpperCase()}\`
- **URL**: \`${it.url}\`
- **用途**: ${cls.name}

**Request**:

\`\`\`json
${reqSample}
\`\`\`

**Response**:

\`\`\`json
${resSample}
\`\`\`
`;
    })
    .join('\n');
}

function renderRequestSample(schema, fields) {
  switch (schema) {
    case 'list':
      return JSON.stringify({ params: { current: 1, pageSize: 10, conditions: {} } }, null, 2);
    case 'idOnly':
      return JSON.stringify({ params: { id: '<id>' } }, null, 2);
    case 'idsArray':
      return JSON.stringify({ params: { ids: ['<id1>', '<id2>'] } }, null, 2);
    case 'fields':
      return JSON.stringify({ params: fieldsToSample(fields) }, null, 2);
    case 'idAndFields':
      return JSON.stringify({ params: { id: '<id>', ...fieldsToSample(fields) } }, null, 2);
    case 'optional':
      return JSON.stringify({ params: {} }, null, 2);
    default:
      return JSON.stringify({ params: {} }, null, 2);
  }
}

function renderResponseSample(schema, fields) {
  switch (schema) {
    case 'pagedList':
      return JSON.stringify({ data: [fieldsToSample(fields)], total: 0 }, null, 2);
    case 'tree':
      return JSON.stringify(
        [{ value: '<id>', label: '<label>', children: [] }],
        null,
        2
      );
    case 'item':
      return JSON.stringify({ state: true, data: fieldsToSample(fields) }, null, 2);
    case 'success':
      return JSON.stringify({ state: true, message: '操作成功' }, null, 2);
    case 'options':
      return JSON.stringify({ data: [{ label: '<label>', value: '<value>' }] }, null, 2);
    default:
      return JSON.stringify({ state: true, data: {} }, null, 2);
  }
}

function fieldsToSample(fields) {
  const sample = {};
  for (const f of fields) {
    sample[f.name] = sampleByType(f.type);
  }
  return sample;
}

function sampleByType(type) {
  switch (type) {
    case 'id':
      return '<id>';
    case 'number':
      return 0;
    case 'amount':
      return 0.0;
    case 'date':
      return '2026-05-28';
    case 'datetime':
      return '2026-05-28 12:00:00';
    case 'phone':
      return '13900000000';
    case 'email':
      return 'user@example.com';
    case 'cname':
      return '张三';
    case 'boolean':
      return false;
    case 'enum':
      return '<enum>';
    default:
      return '<text>';
  }
}

// ========== 主流程 ==========

async function main() {
  const { positional, flags } = parseArgs(process.argv);
  if (flags.help || positional.length === 0) {
    printHelp();
    return positional.length === 0 ? 1 : 0;
  }

  const mockFile = path.resolve(positional[0]);
  let mockSource;
  try {
    mockSource = await fs.readFile(mockFile, 'utf8');
  } catch (e) {
    console.error(`✗ 无法读取 mock 文件：${mockFile}`);
    console.error(`  ${e.message}`);
    return 1;
  }

  const inferred = inferFromMockPath(mockFile);
  const module = flags.module || inferred.module;
  const appName = flags['app-name'] || inferred.appName;
  const outDir = flags['out-dir'] ? path.resolve(flags['out-dir']) : inferred.outDir;
  const basePath = `/api/${module}/${appName}`;

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('gen-api-doc · v0.4 · standalone 模式');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  mock 文件: ${path.relative(process.cwd(), mockFile)}`);
  console.log(`  模块:      ${module}`);
  console.log(`  应用名:    ${appName}`);
  console.log(`  请求前缀:  ${basePath}`);
  console.log(`  输出目录:  ${path.relative(process.cwd(), outDir)}`);
  console.log('');

  // 1. 提取接口
  const rawInterfaces = extractInterfaces(mockSource);
  if (rawInterfaces.length === 0) {
    console.error('✗ 未识别到任何接口（mock 文件中找不到 url: "..." 形态）');
    console.error('  请确认 mock 文件使用 defineMock([...]) 或类似导出格式');
    return 1;
  }

  // 2. 字段名汇总
  const fieldNamesFromInterfaces = new Set();
  for (const it of rawInterfaces) {
    for (const n of it.responseSampleNames) fieldNamesFromInterfaces.add(n);
  }
  for (const n of extractFieldNamesFromGlobalStore(mockSource)) {
    fieldNamesFromInterfaces.add(n);
  }
  // 排除框架级字段（再做一次保险）
  for (const k of [...fieldNamesFromInterfaces]) {
    if (isFrameworkKey(k) || k === 'id') fieldNamesFromInterfaces.delete(k);
  }
  // id 单独保留为主键（如果有）
  const hasId = mockSource.includes('id:') || mockSource.includes('id =');
  if (hasId) fieldNamesFromInterfaces.add('id');

  const fields = [...fieldNamesFromInterfaces].map((name) => {
    const { type, descGuess } = inferFieldType(name);
    return {
      name,
      label: descGuess,
      type,
      required: false,
      desc: '', // standalone 模式无 intent 描述
      descGuess,
      descSource: 'generated',
      example: undefined
    };
  });

  // 3. 接口分类
  const interfaces = rawInterfaces.map((it) => ({
    ...it,
    classification: classifyInterface(it.url)
  }));

  // 4. 覆盖率
  const total = fields.length;
  const withDesc = fields.filter((f) => f.descSource === 'intent').length;
  const generatedDesc = total - withDesc;
  const percent = total === 0 ? 0 : Math.round((withDesc / total) * 100);

  // 5. 渲染 Markdown
  const mdTpl = await fs.readFile(path.join(TEMPLATE_DIR, 'markdown.md.tmpl'), 'utf8');
  const generatedAt = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const coverageNote = generatedDesc > 0
    ? `\n> 注：${generatedDesc} 个字段的描述由字段名 / 类型推断，已标记"待后端确认"。`
    : '';

  const md = mdTpl
    .replace(/\{\{TITLE\}\}/g, `${appName}`)
    .replace(/\{\{GENERATION_MODE\}\}/g, 'standalone（mock 反推）')
    .replace(/\{\{GENERATED_AT\}\}/g, generatedAt)
    .replace(/\{\{COVERAGE_NOTE\}\}/g, coverageNote)
    .replace(/\{\{MODULE\}\}/g, module)
    .replace(/\{\{APP_NAME\}\}/g, appName)
    .replace(/\{\{BASE_PATH\}\}/g, basePath)
    .replace(/\{\{COVERAGE_PCT\}\}/g, `${percent}%`)
    .replace(/\{\{COVERAGE_WITH_DESC\}\}/g, String(withDesc))
    .replace(/\{\{COVERAGE_TOTAL\}\}/g, String(total))
    .replace(/\{\{FIELD_TABLE\}\}/g, renderFieldsTable(fields))
    .replace(/\{\{INTERFACE_TABLE\}\}/g, renderInterfaceTable(interfaces))
    .replace(/\{\{INTERFACE_DETAILS\}\}/g, renderInterfaceDetails(interfaces, fields));

  // 6. 渲染 JSON（不复用 .tmpl，直接构造干净结构）
  const jsonOutput = {
    module,
    appName,
    basePath,
    bodyParser: 'json_and_form_encoded',
    generationMode: 'standalone',
    generatedAt,
    fieldCoverage: {
      total,
      withDesc,
      generatedDesc,
      percent
    },
    fields: fields.map((f) => ({
      name: f.name,
      label: f.label,
      type: f.type,
      required: f.required,
      desc: f.desc || `${f.descGuess}（待后端确认）`,
      descSource: f.descSource,
      options: [],
      example: f.example !== undefined ? f.example : sampleByType(f.type)
    })),
    interfaces: interfaces.map((it) => ({
      method: it.method,
      url: it.url,
      name: it.classification.name,
      requestSchema: it.classification.requestSchema,
      responseSchema: it.classification.responseSchema
    }))
  };

  // 7. 写文件
  await fs.mkdir(outDir, { recursive: true });
  const mdPath = path.join(outDir, `${appName}.md`);
  const jsonPath = path.join(outDir, `${appName}.api.json`);
  await fs.writeFile(mdPath, md, 'utf8');
  await fs.writeFile(jsonPath, JSON.stringify(jsonOutput, null, 2), 'utf8');

  console.log(`  ✓ Markdown → ${path.relative(process.cwd(), mdPath)}`);
  console.log(`  ✓ JSON     → ${path.relative(process.cwd(), jsonPath)}`);
  console.log('');
  console.log(`  · 接口数:   ${interfaces.length}`);
  console.log(`  · 字段数:   ${total}`);
  console.log(`  · 覆盖率:   ${percent}% (${withDesc}/${total} 来自 intent，${generatedDesc} 由名称推断)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✓ 生成完成');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error('✗ gen-api-doc 失败：');
    console.error(err);
    process.exit(1);
  });
