#!/usr/bin/env node
/**
 * gen-api-doc.mjs · v0.4.2
 *
 * 根据 mock 文件或 mock 目录反推接口文档：
 *   - 单文件：生成单页面接口文档
 *   - 目录：生成套件接口文档，按业务模块分章
 *
 * 约束：
 *   - 零依赖，不执行 mock handler
 *   - 每个接口必须输出 request.fields / request.example / response.fields / response.example
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = path.resolve(__dirname, '..');
const TEMPLATE_DIR = path.join(SKILL_ROOT, 'templates', 'api-doc');

const TRANSPORT_FIELD_NAMES = new Set([
  'state',
  'message',
  'data',
  'total',
  'success',
  'code',
  'params',
  'body',
  'request',
  'response',
  'method',
  'url',
  'headers'
]);

const FRAMEWORK_REQUEST_FIELDS = new Set([
  'pageIndex',
  'pageSize',
  'current',
  'page',
  'conditions',
  'logicOperator',
  'ids',
  'id'
]);

const FIELD_HINTS = [
  { match: /^(id|guid|.*Guid|.*Id)$/i, type: 'id', label: '主键' },
  { match: /^(.*Phone|.*Mobile|.*Tel|phone|mobile|tel)$/i, type: 'phone', label: '电话' },
  { match: /^(.*Email|.*Mail|email|mail)$/i, type: 'email', label: '邮箱' },
  { match: /^(name|.*Name)$/i, type: 'text', label: '名称' },
  { match: /^(code|.*Code)$/i, type: 'text', label: '编号' },
  { match: /^(status|state|.*Status)$/i, type: 'enum', label: '状态' },
  { match: /^(amount|money|price|fee|.*Amount|.*Price|.*Fee)$/i, type: 'amount', label: '金额' },
  { match: /^(.*Time|.*Date|createTime|updateTime|deadline|birthday)$/i, type: 'datetime', label: '时间' },
  { match: /^(creator|owner|.*User|.*Person|.*Manager|initiator|assignee|handler|reviewer|executor)$/i, type: 'person', label: '人员' },
  { match: /^(remark|description|desc|note|comment|content|summary|opinion)$/i, type: 'text', label: '说明' },
  { match: /^(count|num|.*Count|.*Num|.*Total|.*Rate|.*Hours|.*Days)$/i, type: 'number', label: '数量' },
  { match: /^(is.*|has.*|.*Flag|.*Enabled|.*Disabled|linkRequirement)$/i, type: 'boolean', label: '布尔值' }
];

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
  console.log(`gen-api-doc.mjs · 根据 mock 生成后端联调版接口文档

用法:
  node scripts/gen-api-doc.mjs <mock-file|mock-dir> [选项]

选项:
  --out-dir <dir>       输出目录（默认推断为 <component_package>/docs/api/<module>/）
  --module <name>       模块名（默认从 mock 路径或 --api-prefix 反推）
  --app-name <name>     文档名（默认从 mock 文件名或目录名反推）
  --config <file>       页面配置文件，读取 MODULE_CONFIGS / ACTION_FORM_CONFIGS
  --api-prefix <path>   只收集指定业务前缀，例如 /api/ipd
  --help                显示帮助

示例:
  node scripts/gen-api-doc.mjs ./mock/demo/order.mock.ts
  node scripts/gen-api-doc.mjs ./mock/ipd --config ./src/views/ipd/config.js --api-prefix /api/ipd
`);
}

function stripComments(code) {
  return code
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');
}

function normalizeType(type) {
  const raw = String(type || 'text').toLowerCase();
  if (['select', 'radio', 'checkbox', 'enum'].includes(raw)) return 'enum';
  if (['date', 'datepicker'].includes(raw)) return 'date';
  if (['datetime', 'time'].includes(raw)) return 'datetime';
  if (['textarea', 'paragraph'].includes(raw)) return 'text';
  if (['input', 'text'].includes(raw)) return 'text';
  if (['number', 'inputnumber'].includes(raw)) return 'number';
  if (['boolean', 'switch'].includes(raw)) return 'boolean';
  return raw;
}

function inferFieldInfo(name, valueSnippet = '') {
  const value = String(valueSnippet || '').trim();
  if (/^\[/.test(value)) return { type: 'array', label: '列表' };
  if (/^\{/.test(value)) return { type: 'object', label: '对象' };
  if (/^(true|false)\b/.test(value)) return { type: 'boolean', label: '布尔值' };
  if (/^\d+(\.\d+)?\b/.test(value)) return { type: 'number', label: '数量' };
  if (/faker\.date|日期|date/i.test(value)) return { type: 'datetime', label: '时间' };
  for (const hint of FIELD_HINTS) {
    if (hint.match.test(name)) return { type: hint.type, label: hint.label };
  }
  return { type: 'text', label: name };
}

function sampleByType(type, options = []) {
  if (options.length > 0) return options[0].value;
  switch (normalizeType(type)) {
    case 'id':
      return '<id>';
    case 'number':
      return 0;
    case 'amount':
      return 0;
    case 'date':
      return '2026-05-28';
    case 'datetime':
      return '2026-05-28 12:00:00';
    case 'phone':
      return '13900000000';
    case 'email':
      return 'user@example.com';
    case 'person':
      return '张三';
    case 'boolean':
      return false;
    case 'enum':
      return '<enum>';
    case 'array':
      return [];
    case 'object':
      return {};
    default:
      return '<text>';
  }
}

function createField(partial) {
  const inferred = inferFieldInfo(partial.name || '', partial.valueSnippet || '');
  const type = normalizeType(partial.type || inferred.type);
  const label = partial.label || inferred.label || partial.name;
  const descSource = partial.descSource || partial.source || 'generated';
  const desc = partial.desc || (descSource === 'generated'
    ? `${label}，类型：${type}（待后端确认）`
    : `${label}，类型：${type}`);
  const options = partial.options || [];
  const example = partial.example !== undefined ? partial.example : sampleByType(type, options);
  return {
    name: partial.name,
    label,
    type,
    required: Boolean(partial.required),
    desc,
    descSource,
    source: partial.source || descSource,
    sources: [...new Set(partial.sources || [partial.source || descSource])],
    options,
    example,
    children: partial.children || []
  };
}

function mergeFieldLists(...lists) {
  const priority = { intent: 4, config: 3, mock: 2, generated: 1 };
  const map = new Map();
  for (const list of lists) {
    for (const raw of list || []) {
      if (!raw || !raw.name || isIgnorableField(raw.name)) continue;
      const field = createField(raw);
      const old = map.get(field.name);
      if (!old) {
        map.set(field.name, field);
        continue;
      }
      const oldPriority = priority[old.descSource] || 0;
      const nextPriority = priority[field.descSource] || 0;
      const merged = nextPriority >= oldPriority
        ? { ...old, ...field }
        : { ...field, ...old };
      merged.required = old.required || field.required;
      merged.sources = [...new Set([...(old.sources || []), ...(field.sources || [])])];
      merged.options = field.options?.length ? field.options : old.options || [];
      merged.children = field.children?.length ? field.children : old.children || [];
      map.set(field.name, merged);
    }
  }
  return [...map.values()];
}

function isIgnorableField(name) {
  return !name || ['length', 'min', 'max', 'from'].includes(name);
}

function findMatchingClose(code, start, openChar, closeChar) {
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let i = start; i < code.length; i += 1) {
    const ch = code[i];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === quote) {
        quote = '';
      }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
      continue;
    }
    if (ch === openChar) depth += 1;
    if (ch === closeChar) {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function extractBalancedAt(code, start, openChar = '{', closeChar = '}') {
  if (start < 0 || code[start] !== openChar) return '';
  const end = findMatchingClose(code, start, openChar, closeChar);
  return end >= 0 ? code.slice(start, end + 1) : '';
}

function extractAssignmentBlock(code, name, openChar = '{', closeChar = '}') {
  const re = new RegExp(`(?:export\\s+)?const\\s+${name}\\s*=`);
  const match = re.exec(code);
  if (!match) return '';
  const start = code.indexOf(openChar, match.index);
  return extractBalancedAt(code, start, openChar, closeChar);
}

function readStringProp(block, prop) {
  const re = new RegExp(`${prop}\\s*:\\s*['"]([^'"]*)['"]`);
  const m = block.match(re);
  return m ? m[1] : '';
}

function readBoolProp(block, prop) {
  const re = new RegExp(`${prop}\\s*:\\s*(true|false)`);
  const m = block.match(re);
  return m ? m[1] === 'true' : false;
}

function readArrayProp(block, prop) {
  const re = new RegExp(`${prop}\\s*:`);
  const match = re.exec(block);
  if (!match) return '';
  const start = block.indexOf('[', match.index);
  return extractBalancedAt(block, start, '[', ']');
}

function topLevelObjectBlocks(arrayBlock) {
  const blocks = [];
  if (!arrayBlock) return blocks;
  let depth = 0;
  let quote = '';
  let escaped = false;
  let start = -1;
  for (let i = 0; i < arrayBlock.length; i += 1) {
    const ch = arrayBlock[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
      continue;
    }
    if (ch === '{') {
      depth += 1;
      if (depth === 1) start = i;
    } else if (ch === '}') {
      if (depth === 1 && start >= 0) blocks.push(arrayBlock.slice(start, i + 1));
      depth -= 1;
    }
  }
  return blocks;
}

function topLevelEntries(objectBlock) {
  const entries = [];
  if (!objectBlock || objectBlock[0] !== '{') return entries;
  let i = 1;
  while (i < objectBlock.length - 1) {
    while (/[\s,]/.test(objectBlock[i] || '')) i += 1;
    if (i >= objectBlock.length - 1) break;
    let key = '';
    if (objectBlock[i] === '"' || objectBlock[i] === "'") {
      const quote = objectBlock[i];
      i += 1;
      const start = i;
      while (i < objectBlock.length && objectBlock[i] !== quote) i += 1;
      key = objectBlock.slice(start, i);
      i += 1;
    } else {
      const start = i;
      while (i < objectBlock.length && /[\w$-]/.test(objectBlock[i])) i += 1;
      key = objectBlock.slice(start, i);
    }
    while (/\s/.test(objectBlock[i] || '')) i += 1;
    if (objectBlock[i] !== ':') {
      i += 1;
      continue;
    }
    i += 1;
    while (/\s/.test(objectBlock[i] || '')) i += 1;
    const valueStart = i;
    let depth = 0;
    let quote = '';
    let escaped = false;
    while (i < objectBlock.length - 1) {
      const ch = objectBlock[i];
      if (quote) {
        if (escaped) escaped = false;
        else if (ch === '\\') escaped = true;
        else if (ch === quote) quote = '';
        i += 1;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === '`') {
        quote = ch;
        i += 1;
        continue;
      }
      if (ch === '{' || ch === '[' || ch === '(') depth += 1;
      else if (ch === '}' || ch === ']' || ch === ')') {
        if (depth === 0) break;
        depth -= 1;
      } else if (ch === ',' && depth === 0) {
        break;
      }
      i += 1;
    }
    entries.push({ key, value: objectBlock.slice(valueStart, i).trim() });
    if (objectBlock[i] === ',') i += 1;
  }
  return entries;
}

function fieldsFromObjectLiteral(objectBlock, source = 'mock') {
  return topLevelEntries(objectBlock)
    .filter((entry) => /^[A-Za-z_$][\w$]*$/.test(entry.key))
    .filter((entry) => !TRANSPORT_FIELD_NAMES.has(entry.key))
    .map((entry) => {
      const value = entry.value.trim();
      let children = [];
      if (value.startsWith('{')) children = fieldsFromObjectLiteral(value, source);
      if (value.startsWith('[')) {
        const childObj = topLevelObjectBlocks(value)[0];
        if (childObj) children = fieldsFromObjectLiteral(childObj, source);
      }
      const inferred = inferFieldInfo(entry.key, value);
      return createField({
        name: entry.key,
        label: inferred.label,
        type: inferred.type,
        source,
        descSource: source === 'config' ? 'config' : 'generated',
        valueSnippet: value,
        children
      });
    });
}

function configFieldFromObject(block, nameKeys, labelKeys, optionsIndex) {
  const name = nameKeys.map((key) => readStringProp(block, key)).find(Boolean);
  if (!name) return null;
  const label = labelKeys.map((key) => readStringProp(block, key)).find(Boolean) || name;
  const optionKey = readStringProp(block, 'optionKey');
  const type = optionKey || /options\s*:/.test(block)
    ? 'enum'
    : normalizeType(readStringProp(block, 'type') || 'text');
  const optionsRef = (block.match(/options\s*:\s*COMMON_OPTIONS\.(\w+)/) || [])[1];
  const options = optionsRef && optionsIndex[optionsRef] ? optionsIndex[optionsRef] : [];
  return createField({
    name,
    label,
    type,
    required: readBoolProp(block, 'required'),
    desc: `${label}，类型：${type}`,
    descSource: 'config',
    source: 'config',
    options
  });
}

function fieldsFromConfigArray(arrayBlock, kind, optionsIndex) {
  const blocks = topLevelObjectBlocks(arrayBlock);
  const fields = [];
  for (const block of blocks) {
    let field = null;
    if (kind === 'columns') field = configFieldFromObject(block, ['dataIndex'], ['title'], optionsIndex);
    else if (kind === 'filters') field = configFieldFromObject(block, ['field', 'value'], ['label'], optionsIndex);
    else field = configFieldFromObject(block, ['prop', 'field', 'value', 'dataIndex'], ['label', 'title'], optionsIndex);
    if (field) fields.push(field);
  }
  return fields;
}

function stringArrayValues(arrayBlock) {
  const values = [];
  for (const m of String(arrayBlock || '').matchAll(/['"]([^'"]+)['"]/g)) {
    values.push(m[1]);
  }
  return values;
}

function optionsFromArray(arrayBlock) {
  return topLevelObjectBlocks(arrayBlock)
    .map((block) => ({
      label: readStringProp(block, 'label'),
      value: readStringProp(block, 'value')
    }))
    .filter((it) => it.label && it.value);
}

async function loadConfigIndex(configPath) {
  const empty = {
    modules: [],
    moduleByBaseUrl: [],
    actionByUrl: new Map(),
    listByUrl: new Map(),
    optionsByUrl: new Map()
  };
  if (!configPath) return empty;

  const abs = path.resolve(configPath);
  let source = '';
  try {
    source = await fs.readFile(abs, 'utf8');
  } catch (e) {
    throw new Error(`无法读取 config 文件：${abs}\n${e.message}`);
  }
  const cleaned = stripComments(source);
  const optionsIndex = {};
  const commonOptions = extractAssignmentBlock(cleaned, 'COMMON_OPTIONS');
  for (const entry of topLevelEntries(commonOptions)) {
    optionsIndex[entry.key] = optionsFromArray(entry.value);
  }

  const result = { ...empty, actionByUrl: new Map(), listByUrl: new Map(), optionsByUrl: new Map() };
  const moduleConfigs = extractAssignmentBlock(cleaned, 'MODULE_CONFIGS');
  for (const entry of topLevelEntries(moduleConfigs)) {
    const block = entry.value;
    if (!block.startsWith('{')) continue;
    const baseUrl = readStringProp(block, 'baseUrl');
    const title = readStringProp(block, 'title') || entry.key;
    const module = {
      key: entry.key,
      title,
      baseUrl,
      fields: {
        columns: fieldsFromConfigArray(readArrayProp(block, 'columns'), 'columns', optionsIndex),
        filters: fieldsFromConfigArray(readArrayProp(block, 'filters'), 'filters', optionsIndex),
        searchFields: fieldsFromConfigArray(readArrayProp(block, 'searchFields'), 'filters', optionsIndex),
        formFields: fieldsFromConfigArray(readArrayProp(block, 'formFields'), 'formFields', optionsIndex),
        detailFields: fieldsFromConfigArray(readArrayProp(block, 'detailFields'), 'detailFields', optionsIndex)
      },
      detailLists: []
    };

    const optionModels = readArrayProp(block, 'optionModels');
    for (const item of topLevelObjectBlocks(optionModels)) {
      const url = readStringProp(item, 'url');
      if (url) result.optionsByUrl.set(url, {
        moduleKey: entry.key,
        title: readStringProp(item, 'key') || '选项数据',
        fields: optionFields()
      });
    }

    for (const listKey of ['detailLists', 'extraLists']) {
      const listArray = readArrayProp(block, listKey);
      for (const item of topLevelObjectBlocks(listArray)) {
        const fields = stringArrayValues(readArrayProp(item, 'fields')).map((name) => createField({
          name,
          label: name,
          source: 'config',
          descSource: 'generated'
        }));
        const listInfo = {
          moduleKey: entry.key,
          title: readStringProp(item, 'title') || listKey,
          prop: readStringProp(item, 'prop'),
          url: readStringProp(item, 'url'),
          fields
        };
        module.detailLists.push(listInfo);
        if (listInfo.url) result.listByUrl.set(listInfo.url, listInfo);
      }
    }

    result.modules.push(module);
    if (baseUrl) result.moduleByBaseUrl.push(module);
  }

  result.moduleByBaseUrl.sort((a, b) => b.baseUrl.length - a.baseUrl.length);

  const actionConfigs = extractAssignmentBlock(cleaned, 'ACTION_FORM_CONFIGS');
  for (const entry of topLevelEntries(actionConfigs)) {
    const block = entry.value;
    if (!block.startsWith('{')) continue;
    const fields = fieldsFromConfigArray(readArrayProp(block, 'fields'), 'formFields', optionsIndex);
    const title = readStringProp(block, 'title') || entry.key;
    for (const urlKey of ['submitUrl', 'addUrl', 'detailUrl']) {
      const url = readStringProp(block, urlKey);
      if (url) result.actionByUrl.set(url, {
        actionKey: entry.key,
        title,
        urlKey,
        fields
      });
    }
  }

  return result;
}

function optionFields(options = []) {
  return [
    createField({ name: 'label', label: '显示文本', type: 'text', descSource: 'config', source: 'config', example: options[0]?.label || '<label>' }),
    createField({ name: 'value', label: '选项值', type: 'text', descSource: 'config', source: 'config', example: options[0]?.value || '<value>' })
  ];
}

async function collectMockFiles(input) {
  const abs = path.resolve(input);
  const stat = await fs.stat(abs);
  if (stat.isFile()) return { input: abs, mode: 'single', files: [abs] };
  const files = [];
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(p);
      else if (/\.mock\.(ts|mjs|js)$/i.test(entry.name)) files.push(p);
    }
  }
  await walk(abs);
  files.sort();
  return { input: abs, mode: 'suite', files };
}

function inferFromInput(input, mode, files, flags) {
  const abs = path.resolve(input);
  const segments = abs.split(path.sep);
  const mockIdx = segments.lastIndexOf('mock');
  let componentPackage = null;
  let module = 'default';
  let appName = '';
  if (mockIdx > 0) {
    componentPackage = segments.slice(0, mockIdx).join(path.sep);
    const afterMock = segments.slice(mockIdx + 1);
    if (afterMock.length > 0) module = afterMock[0].replace(/\.mock\.(ts|mjs|js)$/i, '');
  }
  if (flags['api-prefix']) {
    const prefixParts = String(flags['api-prefix']).split('/').filter(Boolean);
    if (prefixParts[0] === 'api' && prefixParts[1]) module = prefixParts[1];
  }
  if (flags.module) module = flags.module;

  if (flags['app-name']) appName = flags['app-name'];
  else if (mode === 'single') appName = path.basename(files[0]).replace(/\.mock\.(ts|mjs|js)$/i, '');
  else appName = path.basename(abs);

  const outDir = flags['out-dir']
    ? path.resolve(flags['out-dir'])
    : componentPackage
      ? path.join(componentPackage, 'docs', 'api', module)
      : path.dirname(abs);
  const basePath = flags['api-prefix'] || (mode === 'single' ? `/api/${module}/${appName}` : `/api/${module}`);
  return { module, appName, outDir, basePath, componentPackage };
}

function extractInterfaces(mockSource, file) {
  const cleaned = stripComments(mockSource);
  const interfaces = [];
  const urlPattern = /url\s*:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = urlPattern.exec(cleaned)) !== null) {
    const url = match[1];
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
    const block = extractBalancedAt(cleaned, braceStart);
    if (!block) continue;
    const method = readStringProp(block, 'method') || 'post';
    interfaces.push({ url, method: method.toLowerCase(), block, file });
  }
  const seen = new Set();
  return interfaces.filter((it) => {
    const key = `${it.method}:${it.url}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractMockSymbols(mockSource) {
  const cleaned = stripComments(mockSource);
  const symbols = new Map();
  const constPattern = /const\s+(\w+)\s*=/g;
  let match;
  while ((match = constPattern.exec(cleaned)) !== null) {
    const name = match[1];
    let cursor = match.index + match[0].length;
    while (/\s/.test(cleaned[cursor] || '')) cursor += 1;
    let fields = [];
    let kind = '';
    if (cleaned.startsWith('Array.from', cursor)) {
      const arrowIdx = cleaned.indexOf('=>', cursor);
      const objStart = arrowIdx >= 0 ? cleaned.indexOf('({', arrowIdx) : -1;
      if (objStart > 0) {
        const block = extractBalancedAt(cleaned, objStart + 1);
        fields = fieldsFromObjectLiteral(block, 'mock');
        kind = 'array';
      }
    } else if (cleaned[cursor] === '[') {
      const arrayBlock = extractBalancedAt(cleaned, cursor, '[', ']');
      const firstObject = topLevelObjectBlocks(arrayBlock)[0];
      if (firstObject) fields = fieldsFromObjectLiteral(firstObject, 'mock');
      kind = 'array';
    } else if (cleaned[cursor] === '{') {
      const objectBlock = extractBalancedAt(cleaned, cursor);
      fields = fieldsFromObjectLiteral(objectBlock, 'mock');
      kind = 'object';
    }
    if (fields.length > 0) symbols.set(name, { name, kind, fields });
  }
  return symbols;
}

function classifyInterface(url) {
  const last = url.split('/').filter(Boolean).pop() || '';
  const lower = last.toLowerCase();
  if (/options$/i.test(last)) return { name: '选项数据', requestKind: 'empty', responseKind: 'options' };
  if (lower === 'batchdelete') return { name: '批量删除', requestKind: 'ids', responseKind: 'success' };
  if (lower === 'delete' || /^delete[A-Z]/.test(last)) return { name: '删除', requestKind: 'id', responseKind: 'success' };
  if (lower === 'list' || lower.endsWith('list')) return { name: lower === 'list' ? '分页列表' : `${labelFromCamel(last)}列表`, requestKind: 'list', responseKind: 'pagedList' };
  if (lower === 'tree' || lower === 'treelist') return { name: '树数据', requestKind: 'optional', responseKind: 'tree' };
  if (lower === 'info' || lower === 'detail' || lower.endsWith('detail')) return { name: lower.endsWith('detail') && lower !== 'detail' ? `${labelFromCamel(last)}详情` : '详情', requestKind: 'id', responseKind: 'item' };
  if (lower === 'data' || lower.endsWith('data')) return { name: `${labelFromCamel(last)}数据`, requestKind: 'empty', responseKind: 'object' };
  if (lower === 'add' || /^add[A-Z]/.test(last)) return { name: lower === 'add' ? '新增' : labelFromCamel(last), requestKind: 'fields', responseKind: 'success' };
  if (lower === 'update' || /^update[A-Z]/.test(last)) return { name: lower === 'update' ? '更新' : labelFromCamel(last), requestKind: 'idAndFields', responseKind: 'success' };
  return { name: labelFromCamel(last) || '自定义接口', requestKind: 'optional', responseKind: 'object' };
}

function labelFromCamel(text) {
  if (!text) return '';
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .trim();
}

function resolveModule(url, configIndex, basePath, appName) {
  for (const module of configIndex.moduleByBaseUrl || []) {
    if (module.baseUrl && url.startsWith(module.baseUrl)) return module;
  }
  const prefix = basePath.replace(/\/$/, '');
  if (url.startsWith(prefix)) {
    const rest = url.slice(prefix.length).split('/').filter(Boolean);
    return {
      key: rest.length > 1 ? rest[0] : appName,
      title: rest.length > 1 ? rest[0] : appName,
      baseUrl: rest.length > 1 ? `${prefix}/${rest[0]}` : prefix,
      fields: {}
    };
  }
  return { key: appName, title: appName, baseUrl: basePath, fields: {} };
}

function fieldsFromRequestBody(block) {
  const fields = [];
  for (const m of block.matchAll(/body(?:\.params)?\.(\w+)/g)) {
    const name = m[1];
    if (!FRAMEWORK_REQUEST_FIELDS.has(name) && !TRANSPORT_FIELD_NAMES.has(name)) {
      fields.push(createField({ name, source: 'mock', descSource: 'generated' }));
    }
  }
  return fields;
}

function fieldsFromMockResponse(it, symbols, responseKind) {
  if (responseKind === 'success') {
    return [
      createField({ name: 'state', label: '操作状态', type: 'boolean', descSource: 'config', source: 'config', example: true }),
      createField({ name: 'message', label: '提示信息', type: 'text', descSource: 'config', source: 'config', example: '操作成功' })
    ];
  }
  if (responseKind === 'options') return optionFields(extractOptionsFromBlock(it.block));
  if (responseKind === 'tree') {
    return [
      createField({ name: 'value', label: '节点值', type: 'text', descSource: 'config', source: 'config' }),
      createField({ name: 'label', label: '节点文本', type: 'text', descSource: 'config', source: 'config' }),
      createField({ name: 'children', label: '子节点', type: 'array', descSource: 'config', source: 'config' })
    ];
  }

  const byVariable = fieldsFromReferencedSymbols(it.block, symbols);
  const direct = fieldsFromDirectReturn(it.block);
  if (direct.length > 0 && !onlyTransportFields(direct)) return direct;
  return byVariable;
}

function extractOptionsFromBlock(block) {
  const dataMatch = /data\s*:\s*\[/.exec(block);
  if (!dataMatch) return [];
  const start = block.indexOf('[', dataMatch.index);
  const arrayBlock = extractBalancedAt(block, start, '[', ']');
  return optionsFromArray(arrayBlock);
}

function onlyTransportFields(fields) {
  return fields.every((field) => TRANSPORT_FIELD_NAMES.has(field.name));
}

function fieldsFromReferencedSymbols(block, symbols) {
  const fields = [];
  for (const [name, info] of symbols.entries()) {
    const re = new RegExp(`\\b${name}\\b`);
    if (re.test(block)) fields.push(...info.fields);
  }
  return mergeFieldLists(fields);
}

function allSymbolFields(symbols) {
  return mergeFieldLists([...symbols.values()].flatMap((info) => info.fields || []));
}

function fieldsFromDirectReturn(block) {
  const objectBlocks = [];
  for (const pattern of [/return\s*\(/g, /=>\s*\(/g]) {
    let match;
    while ((match = pattern.exec(block)) !== null) {
      const start = block.indexOf('{', match.index);
      const objectBlock = extractBalancedAt(block, start);
      if (objectBlock) objectBlocks.push(objectBlock);
    }
  }

  for (const objectBlock of objectBlocks) {
    const entries = topLevelEntries(objectBlock);
    const dataField = entries.find((entry) => entry.key === 'data');
    if (dataField?.value?.startsWith('[')) {
      const firstObject = topLevelObjectBlocks(dataField.value)[0];
      if (firstObject) return fieldsFromObjectLiteral(firstObject, 'mock');
      continue;
    }
    if (dataField && !dataField.value.startsWith('{')) continue;
    const fields = fieldsFromObjectLiteral(objectBlock, 'mock');
    if (fields.length > 0) return fields;
  }
  return [];
}

function fieldsForModule(module, keys) {
  const fields = [];
  for (const key of keys) fields.push(...(module.fields?.[key] || []));
  return mergeFieldLists(fields);
}

function resolveInterfaceSchema(raw, configIndex, symbolsByFile, ctx) {
  const classification = classifyInterface(raw.url);
  const module = resolveModule(raw.url, configIndex, ctx.basePath, ctx.appName);
  const symbols = symbolsByFile.get(raw.file) || new Map();
  const action = configIndex.actionByUrl.get(raw.url);
  const listInfo = configIndex.listByUrl.get(raw.url);
  const optionInfo = configIndex.optionsByUrl.get(raw.url);

  const actionFields = action?.fields || [];
  const listFields = listInfo?.fields || [];
  const optionFieldsFromConfig = optionInfo?.fields || [];
  const requestBodyFields = fieldsFromRequestBody(raw.block);
  const entityFields = mergeFieldLists(
    actionFields,
    fieldsForModule(module, ['formFields', 'detailFields', 'columns']),
    fieldsFromReferencedSymbols(raw.block, symbols),
    allSymbolFields(symbols)
  );
  const mockResponseFields = fieldsFromMockResponse(raw, symbols, classification.responseKind);

  let requestFields = [];
  if (classification.requestKind === 'list') {
    requestFields = [
      createField({ name: 'current', label: '当前页', type: 'number', required: false, descSource: 'config', source: 'config', example: 1 }),
      createField({ name: 'pageSize', label: '每页条数', type: 'number', required: false, descSource: 'config', source: 'config', example: 10 }),
      createField({ name: 'conditions', label: '查询条件', type: 'array', required: false, descSource: 'config', source: 'config', example: [] }),
      ...fieldsForModule(module, ['filters', 'searchFields']),
      ...requestBodyFields
    ];
  } else if (classification.requestKind === 'id') {
    requestFields = [createField({ name: 'id', label: '主键', type: 'id', required: true, descSource: 'config', source: 'config' }), ...requestBodyFields];
  } else if (classification.requestKind === 'ids') {
    requestFields = [createField({ name: 'ids', label: '主键集合', type: 'array', required: true, descSource: 'config', source: 'config', example: ['<id1>', '<id2>'] })];
  } else if (classification.requestKind === 'fields') {
    requestFields = mergeFieldLists(actionFields, fieldsForModule(module, ['formFields']), requestBodyFields);
    if (requestFields.length === 0) requestFields = entityFields.filter((field) => field.name !== 'id');
  } else if (classification.requestKind === 'idAndFields') {
    requestFields = mergeFieldLists(
      [createField({ name: 'id', label: '主键', type: 'id', required: true, descSource: 'config', source: 'config' })],
      actionFields,
      fieldsForModule(module, ['formFields']),
      requestBodyFields
    );
    if (requestFields.length === 1) {
      requestFields = mergeFieldLists(requestFields, entityFields.filter((field) => field.name !== 'id'));
    }
  } else {
    requestFields = requestBodyFields;
  }

  let responseFields = [];
  if (classification.responseKind === 'pagedList') {
    responseFields = mergeFieldLists(listFields, fieldsForModule(module, ['columns', 'detailFields']), mockResponseFields);
  } else if (classification.responseKind === 'item') {
    responseFields = mergeFieldLists(actionFields, fieldsForModule(module, ['detailFields', 'formFields']), mockResponseFields);
  } else if (classification.responseKind === 'success') {
    responseFields = mockResponseFields;
  } else if (classification.responseKind === 'options') {
    responseFields = mergeFieldLists(optionFieldsFromConfig, mockResponseFields);
  } else {
    responseFields = mergeFieldLists(listFields, mockResponseFields, fieldsForModule(module, ['detailFields', 'columns']));
  }

  if (responseFields.length === 0) {
    responseFields = [createField({ name: 'data', label: '响应数据', type: 'object', descSource: 'generated', source: 'generated' })];
  }

  const request = {
    fields: mergeFieldLists(requestFields),
    example: buildRequestExample(classification.requestKind, requestFields)
  };
  const response = {
    fields: mergeFieldLists(responseFields),
    example: buildResponseExample(classification.responseKind, responseFields, raw.block)
  };

  const name = action?.title || listInfo?.title || optionInfo?.title || classification.name;
  return {
    method: raw.method,
    url: raw.url,
    name,
    moduleKey: module.key,
    moduleTitle: module.title,
    mockFile: path.relative(process.cwd(), raw.file),
    classification,
    request,
    response,
    fieldSources: [...new Set([
      ...request.fields.flatMap((field) => field.sources || [field.source]),
      ...response.fields.flatMap((field) => field.sources || [field.source])
    ])].filter(Boolean)
  };
}

function buildRequestExample(kind, fields) {
  if (kind === 'empty') return { params: {} };
  if (kind === 'list') {
    return {
      params: {
        current: 1,
        pageSize: 10,
        logicOperator: 'and',
        conditions: []
      }
    };
  }
  if (kind === 'id') return { params: { id: '<id>' } };
  if (kind === 'ids') return { params: { ids: ['<id1>', '<id2>'] } };
  return { params: fieldsToExample(fields) };
}

function buildResponseExample(kind, fields, block) {
  if (kind === 'success') return { state: true, message: '操作成功' };
  if (kind === 'options') return { data: [fieldsToExample(fields)] };
  if (kind === 'tree') return [{ value: '<id>', label: '<label>', children: [] }];
  if (kind === 'pagedList') return { data: [fieldsToExample(fields)], total: 0 };
  if (kind === 'item') {
    if (/state\s*:\s*true[\s\S]*data\s*:/.test(block)) return { state: true, data: fieldsToExample(fields) };
    return fieldsToExample(fields);
  }
  return fieldsToExample(fields);
}

function fieldsToExample(fields) {
  const example = {};
  for (const field of fields || []) {
    example[field.name] = field.example !== undefined ? field.example : sampleByType(field.type, field.options);
  }
  return example;
}

function computeFieldCoverage(interfaces) {
  const all = mergeFieldLists(interfaces.flatMap((it) => [...it.request.fields, ...it.response.fields]));
  const withDesc = all.filter((field) => field.descSource !== 'generated').length;
  const generatedDesc = all.length - withDesc;
  const percent = all.length === 0 ? 0 : Math.round((withDesc / all.length) * 100);
  const bySource = {};
  for (const field of all) {
    for (const source of field.sources || [field.source || field.descSource]) {
      bySource[source] = (bySource[source] || 0) + 1;
    }
  }
  return { fields: all, fieldCoverage: { total: all.length, withDesc, generatedDesc, percent, bySource } };
}

function assertDocComplete(doc, rawCount) {
  if (doc.interfaces.length !== rawCount) {
    throw new Error(`接口数量不一致：mock=${rawCount}，doc=${doc.interfaces.length}`);
  }
  for (const it of doc.interfaces) {
    if (!it.request || !Array.isArray(it.request.fields) || it.request.example === undefined) {
      throw new Error(`接口缺 request 明细：${it.url}`);
    }
    if (!it.response || !Array.isArray(it.response.fields) || it.response.fields.length === 0 || it.response.example === undefined) {
      throw new Error(`接口缺 response 明细：${it.url}`);
    }
  }
}

function renderFieldRows(fields) {
  if (!fields || fields.length === 0) return '| - | - | - | - | - | - |';
  return fields.map((field) => {
    const options = field.options?.length ? field.options.map((it) => `${it.label}:${it.value}`).join(', ') : '-';
    return `| \`${field.name}\` | ${field.label || '-'} | ${field.type || '-'} | ${field.required ? '是' : '否'} | ${field.desc || '-'} | ${formatInlineValue(field.example)} | ${options} | ${field.sources?.join(', ') || field.source || '-'} |`;
  }).join('\n');
}

function formatInlineValue(value) {
  if (value === undefined) return '-';
  if (typeof value === 'string') return `\`${value}\``;
  return `\`${JSON.stringify(value)}\``;
}

function renderInterfaceTable(interfaces, includeModule) {
  return interfaces.map((it) => {
    const moduleCell = includeModule ? `| ${it.moduleTitle || it.moduleKey} ` : '';
    return `${moduleCell}| \`${it.method.toUpperCase()}\` | \`${it.url}\` | ${it.name} | ${it.fieldSources.join(', ') || '-'} |`;
  }).join('\n');
}

function renderInterfaceDetails(interfaces) {
  return interfaces.map((it, index) => `### ${index + 1}. ${it.name}

- **Method**：\`${it.method.toUpperCase()}\`
- **URL**：\`${it.url}\`
- **模块**：${it.moduleTitle || it.moduleKey}
- **字段来源**：${it.fieldSources.join(', ') || '-'}

**Request 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
${renderFieldRows(it.request.fields)}

**Request 示例**

\`\`\`json
${JSON.stringify(it.request.example, null, 2)}
\`\`\`

**Response 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
${renderFieldRows(it.response.fields)}

**Response 示例**

\`\`\`json
${JSON.stringify(it.response.example, null, 2)}
\`\`\`
`).join('\n');
}

function renderModuleSections(interfaces) {
  const byModule = new Map();
  for (const it of interfaces) {
    const key = it.moduleKey || 'default';
    if (!byModule.has(key)) byModule.set(key, []);
    byModule.get(key).push(it);
  }
  return [...byModule.entries()].map(([moduleKey, items]) => {
    const title = items[0].moduleTitle || moduleKey;
    return `## ${title}

| 方法 | URL | 说明 | 字段来源 |
| --- | --- | --- | --- |
${renderInterfaceTable(items, false)}

${renderInterfaceDetails(items)}
`;
  }).join('\n');
}

async function renderMarkdown(doc) {
  const tpl = await fs.readFile(path.join(TEMPLATE_DIR, 'markdown.md.tmpl'), 'utf8');
  const includeModule = doc.mode === 'suite';
  const tableHeader = includeModule
    ? '| 模块 | 方法 | URL | 说明 | 字段来源 |\n| --- | --- | --- | --- | --- |'
    : '| 方法 | URL | 说明 | 字段来源 |\n| --- | --- | --- | --- |';
  const detail = includeModule ? renderModuleSections(doc.interfaces) : renderInterfaceDetails(doc.interfaces);
  const coverageNote = doc.fieldCoverage.generatedDesc > 0
    ? `\n> 注：${doc.fieldCoverage.generatedDesc} 个字段描述由字段名或 mock 结构推断，已标记“待后端确认”。`
    : '';
  return tpl
    .replace(/\{\{TITLE\}\}/g, doc.title)
    .replace(/\{\{GENERATION_MODE\}\}/g, doc.generationMode)
    .replace(/\{\{GENERATED_AT\}\}/g, doc.generatedAt)
    .replace(/\{\{COVERAGE_NOTE\}\}/g, coverageNote)
    .replace(/\{\{MODULE\}\}/g, doc.module)
    .replace(/\{\{APP_NAME\}\}/g, doc.appName)
    .replace(/\{\{BASE_PATH\}\}/g, doc.basePath)
    .replace(/\{\{MODE\}\}/g, doc.mode)
    .replace(/\{\{INTERFACE_COUNT\}\}/g, String(doc.interfaces.length))
    .replace(/\{\{COVERAGE_PCT\}\}/g, `${doc.fieldCoverage.percent}%`)
    .replace(/\{\{COVERAGE_WITH_DESC\}\}/g, String(doc.fieldCoverage.withDesc))
    .replace(/\{\{COVERAGE_TOTAL\}\}/g, String(doc.fieldCoverage.total))
    .replace(/\{\{FIELD_SOURCE_SUMMARY\}\}/g, Object.entries(doc.fieldCoverage.bySource).map(([k, v]) => `${k}: ${v}`).join('，') || '-')
    .replace(/\{\{INTERFACE_TABLE_HEADER\}\}/g, tableHeader)
    .replace(/\{\{INTERFACE_TABLE\}\}/g, renderInterfaceTable(doc.interfaces, includeModule))
    .replace(/\{\{INTERFACE_DETAILS\}\}/g, detail);
}

function toJsonDoc(ctx, rawInterfaces, interfaces, fields, fieldCoverage, mode) {
  return {
    module: ctx.module,
    appName: ctx.appName,
    title: `${ctx.appName} 接口文档`,
    basePath: ctx.basePath,
    bodyParser: 'json_and_form_encoded',
    generationMode: mode === 'suite' ? 'standalone_suite' : 'standalone_single',
    mode,
    generatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
    mockCoverage: {
      scanned: rawInterfaces.length,
      documented: interfaces.length,
      percent: rawInterfaces.length === 0 ? 0 : Math.round((interfaces.length / rawInterfaces.length) * 100)
    },
    fieldCoverage,
    fields,
    interfaces: interfaces.map((it) => ({
      method: it.method,
      url: it.url,
      name: it.name,
      moduleKey: it.moduleKey,
      moduleTitle: it.moduleTitle,
      mockFile: it.mockFile,
      fieldSources: it.fieldSources,
      request: it.request,
      response: it.response
    }))
  };
}

async function main() {
  const { positional, flags } = parseArgs(process.argv);
  if (flags.help || positional.length === 0) {
    printHelp();
    return positional.length === 0 ? 1 : 0;
  }

  const collected = await collectMockFiles(positional[0]);
  if (collected.files.length === 0) {
    console.error(`✗ 未找到 mock 文件：${path.resolve(positional[0])}`);
    return 1;
  }

  const ctx = inferFromInput(collected.input, collected.mode, collected.files, flags);
  const configIndex = await loadConfigIndex(flags.config);
  const rawInterfaces = [];
  const symbolsByFile = new Map();
  for (const file of collected.files) {
    const source = await fs.readFile(file, 'utf8');
    symbolsByFile.set(file, extractMockSymbols(source));
    rawInterfaces.push(...extractInterfaces(source, file));
  }

  const filtered = flags['api-prefix']
    ? rawInterfaces.filter((it) => it.url.startsWith(flags['api-prefix']))
    : rawInterfaces;

  if (filtered.length === 0) {
    console.error(`✗ 未识别到业务接口${flags['api-prefix'] ? `（前缀 ${flags['api-prefix']}）` : ''}`);
    return 1;
  }

  const interfaces = filtered.map((it) => resolveInterfaceSchema(it, configIndex, symbolsByFile, ctx));
  const { fields, fieldCoverage } = computeFieldCoverage(interfaces);
  const doc = toJsonDoc(ctx, filtered, interfaces, fields, fieldCoverage, collected.mode);
  assertDocComplete(doc, filtered.length);

  await fs.mkdir(ctx.outDir, { recursive: true });
  const mdPath = path.join(ctx.outDir, `${ctx.appName}.md`);
  const jsonPath = path.join(ctx.outDir, `${ctx.appName}.api.json`);
  const md = await renderMarkdown(doc);
  await fs.writeFile(mdPath, md, 'utf8');
  await fs.writeFile(jsonPath, JSON.stringify(doc, null, 2), 'utf8');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`gen-api-doc · v0.4.2 · ${collected.mode === 'suite' ? 'suite mode' : 'single mode'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  mock 输入:  ${path.relative(process.cwd(), collected.input)}`);
  console.log(`  mock 文件:  ${collected.files.length}`);
  console.log(`  模块:       ${ctx.module}`);
  console.log(`  文档名:     ${ctx.appName}`);
  console.log(`  请求前缀:   ${ctx.basePath}`);
  console.log(`  接口数:     ${doc.interfaces.length}`);
  console.log(`  字段覆盖率: ${fieldCoverage.percent}% (${fieldCoverage.withDesc}/${fieldCoverage.total})`);
  console.log(`  Markdown:  ${path.relative(process.cwd(), mdPath)}`);
  console.log(`  JSON:      ${path.relative(process.cwd(), jsonPath)}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✓ 生成完成');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error('✗ gen-api-doc 失败：');
    console.error(err.message || err);
    process.exit(1);
  });
