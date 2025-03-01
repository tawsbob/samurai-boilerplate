# Samurai Boilerplate

A modern full-stack TypeScript application boilerplate featuring a robust tech stack and best practices.

## Tech Stack

### Backend
- Node.js
- Express
- TypeScript
- Prisma (ORM)
- ZenStack 2.x (Enhanced Prisma with access control)
- PostgreSQL

### Frontend
- React
- TypeScript
- Vite
- TanStack Query (formerly React Query)
- Tailwind CSS

## Project Structure

```
samurai-boilerplate/
├── packages/
│   ├── server/         # Backend Express server
│   │   ├── src/
│   │   ├── prisma/
│   │   └── schema.zmodel
│   └── client/         # Frontend React application
├── docker-compose.yml  # Docker configuration for PostgreSQL
└── package.json       # Root package.json for workspace
```

## Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd samurai-boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Start the PostgreSQL database:
```bash
docker-compose up -d
```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in the server package
   - Update the database connection string if needed

5. Generate Prisma client and ZenStack files:
```bash
cd packages/server
npx zenstack generate
npx prisma generate
```

6. Start the development servers:

In separate terminals:
```bash
# Terminal 1 - Backend
cd packages/server
npm run dev

# Terminal 2 - Frontend
cd packages/client
npm run dev
```

## Development

### Backend Development
- The backend server runs on `http://localhost:3000`
- API endpoints are available under `/api`
- Database schema is defined in `packages/server/schema.zmodel`
- Access control rules are defined using ZenStack's policy syntax

### Frontend Development
- The frontend dev server runs on `http://localhost:5173`
- API hooks are auto-generated in `packages/client/src/lib/hooks`
- Styling is handled with Tailwind CSS

## Features

- 🔐 Built-in authentication and authorization
- 🚀 Type-safe full-stack development
- 📝 Auto-generated API hooks
- 🔄 Real-time data synchronization
- 🎨 Modern UI with Tailwind CSS
- 🛠 Developer-friendly setup

## Scripts

### Server
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 