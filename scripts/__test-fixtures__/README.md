# validate-page.mjs / gen-api-doc.mjs · 测试 Fixtures

本目录是 v0.4 加入的回归测试样本，用于校验：

- `validate-page.mjs`：DM-R11.1 ~ DM-R11.4 通用数据模型规则的正例/负例
- `gen-api-doc.mjs`：standalone single / suite 模式下从 mock 反推接口文档的端到端能力

## 目录结构

```
__test-fixtures__/
├── elform-prop.vue                # ✓ Element form :model prop（不该被 R11.1 误报）
├── neg-scattered-dashboard.vue    # ✗ 模板用 model. 但缺 defineDataModel + 散装 ref+request
├── neg-pageconfig-missing.vue     # ✗ 读取 model.global.pageConfig 但未 new PageConfig
├── pos-frame-model.vue            # ✓ 用 defineFrameModel 的合法替代写法
├── mock/demo/order.mock.ts        # gen-api-doc single 输入：标准 defineMock 形态
├── mock/ipd-lite/                 # gen-api-doc suite 输入：多 mock + 框架端点 + 公共 options
├── src/views/ipd-lite/config.js   # suite 字段来源：MODULE_CONFIGS / ACTION_FORM_CONFIGS
├── docs/api/demo/                 # gen-api-doc 输出：order.md + order.api.json
└── docs/api/ipd-lite/             # gen-api-doc 输出：ipd-lite.md + ipd-lite.api.json
```

## 跑回归

```bash
# 4 个 .vue fixture（期望 2 pass / 2 fail）
node scripts/validate-page.mjs scripts/__test-fixtures__/elform-prop.vue                # exit 0
node scripts/validate-page.mjs scripts/__test-fixtures__/pos-frame-model.vue            # exit 0
node scripts/validate-page.mjs scripts/__test-fixtures__/neg-scattered-dashboard.vue    # exit 1
node scripts/validate-page.mjs scripts/__test-fixtures__/neg-pageconfig-missing.vue     # exit 1

# gen-api-doc fixture
node bin/cli.mjs gen-api-doc scripts/__test-fixtures__/mock/demo/order.mock.ts
# 期望：6 个接口；每个接口都有 request.fields / response.fields / 示例

node bin/cli.mjs gen-api-doc scripts/__test-fixtures__/mock/ipd-lite \
  --config scripts/__test-fixtures__/src/views/ipd-lite/config.js \
  --api-prefix /api/ipd-lite \
  --out-dir scripts/__test-fixtures__/docs/api/ipd-lite
# 期望：15 个业务接口；跳过 /resourceaction/*、/auth/* 等框架端点
```

## 注意

- 本目录被 `scripts/smoke-test.mjs` 的 `walk()` 主动跳过，不会触发占位符残留检查
- `docs/api/*/` 是 gen-api-doc 的产物目录，可以随时重新生成；如果不想纳入 git，可以加到上层 `.gitignore`
