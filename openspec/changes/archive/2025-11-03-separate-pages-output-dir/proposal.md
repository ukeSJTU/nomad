# Proposal: Separate Pages Output Directory

## Change ID

`separate-pages-output-dir`

## Summary

将 GitHub Pages 部署工作流的输出目录从 `public/` 调整为 `_pages/`，以避免与 Next.js 项目的静态资源目录产生冲突。

## Problem Statement

当前 `deploy-pages.yml` 工作流将测试报告、Storybook 和覆盖率数据输出到 `public/` 目录，这与 Next.js 项目的静态资源目录重名，可能导致：

1. **资源冲突**：Next.js 使用 `public/` 目录存储静态资源（如 SVG 图标），CI/CD 生成的测试报告可能覆盖这些文件
2. **构建混淆**：Next.js 构建时会处理 `public/` 目录，可能将 CI/CD 产物误认为项目资源
3. **版本控制污染**：`public/` 通常不在 `.gitignore` 中，可能意外提交 CI/CD 产物
4. **目录职责不清**：同一目录同时承担项目静态资源和 CI/CD 输出的双重职责

## Proposed Solution

将 CI/CD 工作流的输出目录统一修改为 `_pages/`：

1. **deploy-pages.yml 工作流**：
   - 将所有 `public/` 路径替换为 `_pages/`
   - 更新 upload artifact 路径为 `./_pages`

2. **generate-dashboard.js 脚本**：
   - 将所有 `public/` 路径替换为 `_pages/`
   - 确保目录创建和文件写入指向新路径

3. **.gitignore 更新**：
   - 添加 `_pages/` 到忽略列表，确保 CI/CD 产物不被提交

## Rationale

选择 `_pages/` 作为新目录名的原因：

- **下划线前缀约定**：在 Web 开发中，下划线前缀通常表示构建产物或临时目录（如 `_next/`、`_site/`）
- **语义明确**：名称清晰表明这是 GitHub Pages 相关内容
- **避免冲突**：Next.js 不会处理下划线开头的目录
- **一致性**：与 Next.js 的 `_next/` 构建目录命名风格一致

## Impact

### Changed Components

- `.github/workflows/deploy-pages.yml`
- `scripts/generate-dashboard.js`
- `.gitignore`

### Affected Areas

- **CI/CD 流水线**：所有依赖 Pages 部署的工作流
- **测试报告访问**：GitHub Pages 部署的 URL 路径不变（部署时会将 `_pages/` 内容作为根目录）
- **本地开发**：开发者不再看到 `public/` 目录中的测试报告

### Breaking Changes

无。此变更仅影响 CI/CD 内部路径，不影响：

- 最终部署的 URL 结构
- PR 评论中的链接
- 用户访问测试报告的方式

## Alternatives Considered

1. **使用 `dist/` 或 `build/`**
   - 拒绝原因：这些名称过于通用，可能与其他构建工具冲突

2. **使用 `gh-pages/`**
   - 拒绝原因：可能与 `gh-pages` 分支概念混淆

3. **保持 `public/` 并添加 `.gitignore` 规则**
   - 拒绝原因：无法解决 Next.js 构建时的目录混淆问题

4. **使用 `reports/` 直接作为输出**
   - 拒绝原因：`reports/` 已用于存储中间产物，`_pages/` 是最终部署产物

## Dependencies

无外部依赖。此变更为自包含的配置调整。

## Risks

- **低风险**：路径变更仅影响 CI/CD 内部逻辑
- **回滚简单**：如有问题可快速还原路径配置

## Timeline

预计 1-2 小时完成：

- 修改工作流文件：20 分钟
- 修改脚本文件：20 分钟
- 更新 .gitignore：5 分钟
- 测试验证：30-60 分钟

## Success Criteria

- [ ] 工作流成功运行，产物生成到 `_pages/` 目录
- [ ] GitHub Pages 正常部署，报告可访问
- [ ] PR 评论中的链接正常工作
- [ ] 本地测试脚本运行正常
- [ ] `public/` 目录不再包含 CI/CD 产物
- [ ] `.gitignore` 正确忽略 `_pages/` 目录

## Related Documents

- `.github/workflows/deploy-pages.yml` - 部署工作流配置
- `scripts/generate-dashboard.js` - 仪表板生成脚本
- `openspec/project.md` - 项目技术栈和约定
