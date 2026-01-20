# @ukeraser/nomad-ui

A comprehensive UI component library built with React, Radix UI, and Tailwind CSS. Based on shadcn/ui with additional custom components.

## 📦 Installation

### For new projects (from npm):

```bash
pnpm add @ukeraser/nomad-ui
# or
npm install @ukeraser/nomad-ui
# or
yarn add @ukeraser/nomad-ui
```

### For monorepo projects (workspace):

```json
{
  "dependencies": {
    "@nomad/ui": "workspace:*"
  }
}
```

## 🚀 Quick Start

### 1. Import styles

Add to your root layout or main entry file:

```tsx
import "@ukeraser/nomad-ui/globals.css";
```

### 2. Use components

```tsx
import { Button } from "@ukeraser/nomad-ui/components/primitives/button";
import { Card } from "@ukeraser/nomad-ui/components/primitives/card";

export default function App() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

## 📚 Available Exports

### Components

```tsx
import { Button } from "@ukeraser/nomad-ui/components/primitives/button";
import { Card } from "@ukeraser/nomad-ui/components/primitives/card";
import { Dialog } from "@ukeraser/nomad-ui/components/primitives/dialog";
// ... and more
```

### Custom Components

```tsx
import { SearchForm } from "@ukeraser/nomad-ui/components/flights/search/search-form";
// ... and more domain-specific components
```

### Hooks

```tsx
import { useMounted } from "@ukeraser/nomad-ui/hooks/use-mounted";
import { useMediaQuery } from "@ukeraser/nomad-ui/hooks/use-media-query";
```

### Utilities

```tsx
import { cn } from "@ukeraser/nomad-ui/lib/utils";
```

### Styles

```tsx
import "@ukeraser/nomad-ui/globals.css";
```

### PostCSS Config

```javascript
export { default } from "@ukeraser/nomad-ui/postcss.config";
```

## 🔧 Requirements

This library requires the following peer dependencies:

- React ≥ 19.1.2
- React DOM ≥ 19.1.2
- Next.js ≥ 15.5.9 (if using Next.js features)

## 📖 Documentation

For detailed component documentation and examples, visit: [Nomad Docs](https://github.com/ukeSJTU/nomad)

## 🛠️ Development

### Adding New Components

```bash
cd packages/ui
pnpm dlx shadcn@latest add <component-name>
```

### Running Tests

```bash
pnpm test
```

### Type Checking

```bash
pnpm type-check
```

## 📄 License

MIT
