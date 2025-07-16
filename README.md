# Virtual Office React

A modern, responsive virtual office application built with React, TypeScript, and Redux. This application provides a comprehensive workspace solution for remote teams with real-time collaboration features.

## 🚀 Features

- **Modern Tech Stack**: Built with React 18, TypeScript, and Redux Toolkit
- **State Management**: Redux with Redux Persist for data persistence
- **UI Components**: Material-UI with Emotion for styling
- **Form Handling**: React Hook Form with Zod validation
- **API Integration**: Axios with React Query for efficient data fetching
- **Routing**: React Router DOM for navigation
- **Styling**: Tailwind CSS with custom utilities
- **Code Quality**: ESLint, Prettier, and Husky for consistent code standards

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Material-UI** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **React Query** - Server state management

### Build Tools

- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Staged file linting

## 📦 Installation

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended package manager)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/alldayPA/virtual-office-v2
cd virtual-office-v2
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
virtual-office-react/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── store/             # Redux store configuration
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── services/          # API service functions
│   └── styles/            # Global styles and themes
├── public/                # Static assets
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking
- `pnpm audit` - Run security audit
- `pnpm outdated` - Check for outdated packages
- `pnpm update` - Update dependencies

## 🎯 Development Workflow

### Code Quality

This project uses several tools to maintain code quality:

- **ESLint** - Identifies and fixes code issues
- **Prettier** - Enforces consistent code formatting
- **Husky** - Manages Git hooks
- **lint-staged** - Runs linters on staged files before commits

### Git Hooks

Pre-commit hooks automatically run:

- ESLint on staged files
- Prettier formatting
- TypeScript type checking

### Package Management

This project uses `pnpm` as the package manager. The `preinstall` script ensures only pnpm is used for consistency.

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

The build artifacts will be stored in the `dist/` directory.

## 📋 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://api.your-domain.com
VITE_APP_NAME=Virtual Office
```

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 Code Style

This project follows strict code style guidelines:

- **ESLint Configuration**: Extends React and TypeScript recommended rules
- **Prettier**: Automatic code formatting on save
- **Import Organization**: Consistent import ordering
- **Type Safety**: Strict TypeScript configuration

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Happy coding! 🚀**
