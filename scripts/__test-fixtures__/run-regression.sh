#!/usr/bin/env bash
# v0.4 回归测试脚本（不含 set -e，需要每个 fixture 独立验退出码）
# 在 epoint-f10code-gen/ 目录下运行

PASS=0
FAIL=0

assert_exit() {
  local name="$1"
  local expected="$2"
  local actual="$3"
  if [ "$actual" -eq "$expected" ]; then
    echo "  ✓ $name (exit=$actual)"
    PASS=$((PASS+1))
  else
    echo "  ✗ $name 期望 exit=$expected 实际 exit=$actual"
    FAIL=$((FAIL+1))
  fi
}

echo "=== validate-page.mjs 4 fixture ==="
node scripts/validate-page.mjs scripts/__test-fixtures__/elform-prop.vue > /dev/null 2>&1
assert_exit "elform-prop（不应误报 :model prop）" 0 $?

node scripts/validate-page.mjs scripts/__test-fixtures__/pos-frame-model.vue > /dev/null 2>&1
assert_exit "pos-frame-model（defineFrameModel 等价合法）" 0 $?

node scripts/validate-page.mjs scripts/__test-fixtures__/neg-scattered-dashboard.vue > /dev/null 2>&1
assert_exit "neg-scattered-dashboard（DM-R11.1 + DM-R11.3）" 1 $?

node scripts/validate-page.mjs scripts/__test-fixtures__/neg-pageconfig-missing.vue > /dev/null 2>&1
assert_exit "neg-pageconfig-missing（DM-R11.4）" 1 $?

echo ""
echo "=== 现有正例 list.vue ==="
node scripts/validate-page.mjs references/docs/page-examples/base/list.vue > /dev/null 2>&1
assert_exit "page-examples/base/list.vue" 0 $?

echo ""
echo "=== gen-api-doc 端到端 ==="
node bin/cli.mjs gen-api-doc scripts/__test-fixtures__/mock/demo/order.mock.ts > /dev/null 2>&1
assert_exit "gen-api-doc demo/order.mock.ts" 0 $?

node -e "const j=require('./scripts/__test-fixtures__/docs/api/demo/order.api.json'); if (j.interfaces.length !== 6) process.exit(1); if (j.interfaces.some((it) => !it.request?.fields || !it.response?.fields || !it.request?.example || !it.response?.example)) process.exit(1);" > /dev/null 2>&1
assert_exit "gen-api-doc order.api.json（逐接口 request/response）" 0 $?

node bin/cli.mjs gen-api-doc scripts/__test-fixtures__/mock/ipd-lite --config scripts/__test-fixtures__/src/views/ipd-lite/config.js --api-prefix /api/ipd-lite --out-dir scripts/__test-fixtures__/docs/api/ipd-lite > /dev/null 2>&1
assert_exit "gen-api-doc ipd-lite suite" 0 $?

node -e "const j=require('./scripts/__test-fixtures__/docs/api/ipd-lite/ipd-lite.api.json'); const urls=j.interfaces.map((it)=>it.url); if (j.mode !== 'suite') process.exit(1); if (j.interfaces.length !== 15) process.exit(1); if (urls.some((url)=>url.startsWith('/resourceaction/') || url.startsWith('/auth/'))) process.exit(1); if (!urls.includes('/api/ipd-lite/trdcp-review/stageDetail')) process.exit(1); if (j.interfaces.some((it)=>!Array.isArray(it.request?.fields) || !it.request.example || !Array.isArray(it.response?.fields) || !it.response.example)) process.exit(1);" > /dev/null 2>&1
assert_exit "gen-api-doc ipd-lite.api.json（suite + 前缀过滤）" 0 $?

echo ""
echo "=== smoke-test ==="
node scripts/smoke-test.mjs > /dev/null 2>&1
assert_exit "smoke-test" 0 $?

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $FAIL -eq 0 ]; then
  echo "✓ $PASS pass / 0 fail"
  exit 0
else
  echo "✗ $PASS pass / $FAIL fail"
  exit 1
fi
