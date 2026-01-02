# @nomad/ui

Shared UI component library for Nomad applications, based on shadcn/ui.

## Installation

This package is part of the Nomad monorepo. Add it to your app:

```json
{
  "dependencies": {
    "@nomad/ui": "workspace:*"
  }
}
```

## Usage

### Import Components

```tsx
import { Button } from "@nomad/ui/components/button";
import { Card } from "@nomad/ui/components/card";
```

### Import Styles

In your root layout:

```tsx
import "@nomad/ui/globals.css";
```

### PostCSS Config

```javascript
export { default } from "@nomad/ui/postcss.config";
```

## Adding New Components

From the ui package directory:

```bash
cd packages/ui
npx shadcn@latest add <component-name>
```

## Components

- 53 components including Button, Card, Dialog, Form, Table, and more
- Built on Radix UI for accessibility
- Styled with Tailwind CSS v4
- Full TypeScript support
