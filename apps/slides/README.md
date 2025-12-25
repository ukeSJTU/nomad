# Nomad Slides

基于 [Slidev](https://sli.dev/) 框架创建的课程汇报演示文稿。

## 文件说明

- `slides.md` - Slidev 官方示例，展示 Slidev 的各种功能特性
- `midterm-2.md` - 第二次中期汇报 PPT
- `midterm-3.md` - 第三次中期汇报 PPT（待添加）
- `final.md` - 期末汇报 PPT（待添加）

## 快速开始

### 开发模式

在项目根目录运行：

```bash
# 开发默认 slides.md
pnpm slides:dev

# 或指定具体文件
pnpm --filter slides dev midterm-2.md
```

访问 <http://localhost:3030> 查看幻灯片。

### 构建部署

```bash
# 在根目录构建
pnpm slides:build

# 导出为 PDF
pnpm slides:export
```

构建产物在 `dist/` 目录，可以部署到任何静态托管服务。

## Slidev 功能

- **Markdown 语法** - 使用 Markdown 编写幻灯片
- **主题系统** - 支持主题定制
- **代码高亮** - 内置代码高亮和 TypeScript 类型提示
- **演讲者模式** - 支持演讲者备注和计时器
- **多种导出** - 支持导出为 PDF、PNG、SPA 等格式
- **Vue 组件** - 可以在幻灯片中使用 Vue 组件

## 相关链接

- [Slidev 官方文档](https://sli.dev/)
- [Slidev GitHub](https://github.com/slidevjs/slidev)
- [主题展示](https://sli.dev/resources/theme-gallery)

## GitHub Actions 自动部署

修改 `apps/slides/` 目录下的文件后，推送到 GitHub 会自动触发部署到 GitHub Pages。

部署地址：
- **Production**: https://ukesjtu.github.io/nomad/slides/
- **Staging**: https://ukesjtu.github.io/nomad/slides/develop/
