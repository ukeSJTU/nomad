# @ukesjtu/nomad-ui

A comprehensive UI component library built with React, Radix UI, and Tailwind CSS.

> **Note**: This is the internal package for the Nomad monorepo. For usage in external projects, see the [Publishing Guide](../../docs/publishing-ui-package.md).

## Development

### Adding New Components

```bash
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

## Internal Usage (Monorepo)

Within this monorepo, use the workspace reference:

```json
{
  "dependencies": {
    "@ukesjtu/nomad-ui": "workspace:*"
  }
}
```

## External Usage

See [Publishing Guide](../../docs/publishing-ui-package.md) for installation and usage in external projects.

## License

MIT
