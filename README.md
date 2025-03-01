# Samurai Boilerplate

A modern full-stack TypeScript application boilerplate using Domain-Driven Design principles.

## Features

- 🏗️ **Monorepo Structure**: Organized with separate packages for backend and frontend
- 🔒 **Authentication**: Complete JWT-based authentication system
- 🎯 **Domain-Driven Design**: Clean architecture with clear separation of concerns
- 🔍 **Type Safety**: End-to-end TypeScript support
- 🚀 **Modern Stack**: Latest versions of all dependencies

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