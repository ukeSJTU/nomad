# Nomad

A modern Next.js full-stack application with TypeScript, Tailwind CSS, and comprehensive development tooling.

[![Scc Count Badge](https://sloc.xyz/github/ukeSJTU/nomad/?category=code)](https://github.com/ukeSJTU/nomad)
[![Scc Count Badge](https://sloc.xyz/github/ukeSJTU/nomad/?category=blanks)](https://github.com/ukeSJTU/nomad)
[![Scc Count Badge](https://sloc.xyz/github/ukeSJTU/nomad/?category=lines)](https://github.com/ukeSJTU/nomad)

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **ESLint & Prettier** for code quality
- **Husky & lint-staged** for Git hooks
- **Conventional Commits** with commitlint
- **GitHub Actions** for CI/CD
- **pnpm** for package management

## Quick Start

### Prerequisites

- Node.js 20.15.0+
- pnpm 10.0.0+
- postgresql 15

### Clone the repository

```bash
git clone https://github.com/ukeSJTU/nomad.git
cd nomad

# Install dependencies
pnpm install
```

### Create Database

If using postgresql (recommended):

```bash
createdb nomad
```

### Create config file

```bash
cp .env.example .env
```

Then you **must** configure the `.env` file based on your actual environment such as `DATABASE_URL`.

### Start the server

```bash
# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm format       # Format code with Prettier
pnpm format:check # Check code formatting
pnpm type-check   # Run TypeScript type checking
```

## Development

### Code Quality

This project uses several tools to maintain code quality:

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **Husky**: Git hooks management
- **lint-staged**: Run linters on staged files
- **commitlint**: Conventional commit message validation

### Git Workflow

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Make your changes
3. Commit using conventional commits: `git commit -m "feat: add new feature"`
4. Push and create a Pull Request

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment
