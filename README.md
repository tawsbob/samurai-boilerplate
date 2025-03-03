# Samurai Boilerplate

A modern full-stack TypeScript application boilerplate using Domain-Driven Design principles.

## Features

- 🏗️ **Monorepo Structure**: Organized with separate packages for backend and frontend
- 🔒 **Authentication**: Complete JWT-based authentication system
- 🎯 **Domain-Driven Design**: Clean architecture with clear separation of concerns
- 🔍 **Type Safety**: End-to-end TypeScript support
- 🚀 **Modern Stack**: Latest versions of all dependencies
- 💅 **Code Formatting**: Automated code formatting with Prettier and Husky pre-commit hooks

### Backend Features

- Node.js + Express
- TypeScript
- PostgreSQL with Prisma ORM
- JWT Authentication
- Domain-Driven Design architecture
- Unit and Integration Testing with Jest
- Input validation
- Error handling
- Docker support for development

### Frontend Features

- React 18
- TypeScript
- Vite for fast development
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management
- HTTP client abstraction
- Form handling
- Protected routes
- Responsive design

## Project Structure

```
packages/
  ├── server/              # Backend package
  │   ├── src/
  │   │   ├── application/    # Application services
  │   │   ├── domain/        # Domain entities and interfaces
  │   │   ├── infrastructure/ # External services implementation
  │   │   ├── interfaces/    # Controllers and routes
  │   │   └── test/         # Test files
  │   └── package.json
  │
  └── client/              # Frontend package
      ├── src/
      │   ├── components/    # Reusable React components
      │   ├── contexts/      # React Context providers
      │   ├── lib/          # Utility functions and helpers
      │   ├── pages/        # Page components
      │   └── services/     # API service abstractions
      └── package.json
```

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Docker (optional)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/samurai-boilerplate.git
cd samurai-boilerplate
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# In packages/server/.env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/samurai_db"
JWT_SECRET="your-jwt-secret"

# In packages/client/.env
VITE_API_URL="http://localhost:3000"
```

4. Start the development servers:

```bash
# Start the backend server
cd packages/server
npm run dev

# In another terminal, start the frontend server
cd packages/client
npm run dev
```

## Development

### Backend Development

The backend follows a Domain-Driven Design architecture:

- `domain/`: Contains business logic and entities
- `application/`: Application services and use cases
- `infrastructure/`: External service implementations
- `interfaces/`: HTTP controllers and routes

### Frontend Development

The frontend is organized by feature and follows React best practices:

- `components/`: Reusable UI components
- `contexts/`: React Context providers for state management
- `lib/`: Utility functions and HTTP client
- `pages/`: Page components
- `services/`: API service abstractions

## Testing

```bash
# Run backend tests
cd packages/server
npm test

# Run frontend tests
cd packages/client
npm test
```

## Authentication Flow

The application uses JWT-based authentication:

1. User registers or logs in
2. Server validates credentials and returns JWT token
3. Client stores token in localStorage
4. Token is included in subsequent API requests
5. Protected routes check for valid token

## Internationalization (i18n)

The application supports multiple languages through `react-i18next`. Currently supported languages are:

- English (en)
- Portuguese (pt)
- Spanish (es)

### URL Structure

The language is determined by the URL prefix:

- English: `/en/*`
- Portuguese: `/pt/*`
- Spanish: `/es/*`

For example:

- `/en/login` - English login page
- `/pt/login` - Portuguese login page
- `/es/login` - Spanish login page

### Language Detection

The application automatically detects the preferred language in the following order:

1. URL path prefix
2. Local storage
3. Browser language

If no language preference is detected or if the detected language is not supported, the application defaults to English.

### Translation Files

Translation files are located in the `packages/client/public/locales` directory, organized by language and namespace:

```
public/locales/
├── en/
│   ├── common.json   # Common translations (navigation, language names)
│   └── auth.json     # Authentication-related translations
├── pt/
│   ├── common.json
│   └── auth.json
└── es/
    ├── common.json
    └── auth.json
```

### Language Switching

Users can switch between languages using the language switcher component located in the top-right corner of the application. When switching languages, the current URL path is preserved, only updating the language prefix.

### Adding New Translations

To add new translations:

1. Add translation keys to the appropriate namespace file (common.json or auth.json)
2. Add translations for all supported languages
3. Use the `useTranslation` hook in your components:

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('namespace');
  return <div>{t('key.path')}</div>;
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Code Formatting

The project uses Prettier for code formatting and Husky for Git hooks:

- Prettier automatically formats code according to the configuration in `.prettierrc`
- Husky runs Prettier on pre-commit to ensure consistent code style
- Formatting rules apply to JavaScript, TypeScript, JSON, CSS, SCSS, and Markdown files

### Prettier Configuration

The following Prettier rules are enforced:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### Manual Formatting

You can manually format code using the following commands:

```bash
# Format all files
npm run format

# Check formatting without making changes
npm run format:check
```
