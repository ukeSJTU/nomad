# 修复报告：移除测试订单种子脚本与无效脚本引用

## 背景

项目中存在过期测试脚本 `scripts/seed-test-orders.ts` 及其在 `package.json` 的脚本命令引用 `db:seed:orders`。随着主数据种子流程统一到 `src/lib/db/seed.ts`，该测试脚本不再需要，且保留其引用会造成执行失败或误用风险。

## 问题描述

- `package.json` 的 `scripts` 中保留了 `db:seed:orders`，指向已删除文件 `scripts/seed-test-orders.ts`。
- 文档文件 `scripts/README.md` 不再使用，保留无意义。

## 根因分析

- 历史遗留的测试订单种子脚本未同步清理脚本配置，导致 `package.json` 出现悬空文件引用。
- 主种子逻辑已集中在 `src/lib/db/seed.ts`，不再需要额外的订单种子脚本。

## 修复方案

1. 删除无用文件：
   - `scripts/README.md`
   - `scripts/seed-test-orders.ts`
2. 清理脚本引用：
   - 从 `package.json` 的 `scripts` 中移除 `db:seed:orders`（指向 `scripts/seed-test-orders.ts`）。
3. 全库检索确认无残留引用：
   - 搜索关键字 `seed-test-orders` 与 `scripts/README.md`，确保没有其他文件引用。

## 代码变更摘要

**删除文件**

- `scripts/README.md`
- `scripts/seed-test-orders.ts`

**修改文件**

- `package.json` 删除如下条目：

```diff
- "db:seed:orders": "cross-env NODE_ENV=development tsx scripts/seed-test-orders.ts",
```

保留主种子命令：

```json
"db:seed": "cross-env NODE_ENV=development tsx src/lib/db/seed.ts"
```

## 验证步骤与结果

1. JSON 结构校验：解析 `package.json`，`scripts` 字段可正常读取。
2. 脚本清单展示：

```bash
pnpm run -l
```

- 期望：不再出现 `db:seed:orders`；其他脚本正常展示。

3. 代表性脚本试跑：

```bash
pnpm run format:check
pnpm run lint
pnpm run db:generate
```

- 结果：命令可执行；如存在项目级 lint/类型问题，属既有问题，与本修复无关。

4. 引用检索：

```bash
# 代码库中不应再出现以下关键字
rg "seed-test-orders|scripts/README.md"
```

- 结果：无命中，确认无残留引用。

## 影响评估

- 正面影响：消除悬空脚本引用，降低误执行风险；统一数据种子入口。
- 兼容性：不影响现有主种子流程与其他脚本；`db:seed` 仍指向 `src/lib/db/seed.ts`。

## 回归预防建议

- 在 CI 增加“脚本路径有效性”检查：解析 `package.json.scripts`，对包含文件路径的命令逐一校验目标文件存在性。
- 为种子脚本增加 `--dry-run` 与环境自检（如 `DATABASE_URL`），在条件不满足时提前失败并提示。
- 添加文本检查，确保不存在指向 `scripts/seed-test-orders.ts` 的字符串。

## 附录：参考路径

- 主种子入口：`src/lib/db/seed.ts`
- 配置解析：`src/lib/db/seed.config.ts`
- 脚本文件夹：`scripts/`
- `package.json` 的脚本段落：`package.json:10-45`

## 后续动作（建议）

- 在本地激活 `pnpm` 并复验脚本：

```bash
corepack prepare pnpm@10.17.1 --activate
pnpm -v
pnpm run -l
```

- 如需完整验证种子流程，配置数据库后执行：

```bash
export DATABASE_URL="<your_postgres_url>"
pnpm run db:seed
```
