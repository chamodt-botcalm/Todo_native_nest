# Full-Stack Todo App

A production-ready Todo List application built with React Native (Expo) frontend and NestJS backend.

## Features

### Backend (NestJS + MySQL)
- JWT-based authentication (register, login, logout)
- User management with secure password hashing
- CRUD operations for todos
- Advanced filtering (status, priority, search)
- Pagination and sorting
- Protected routes with user isolation
- TypeORM with MySQL database
- Input validation and error handling

### Frontend (React Native + Expo)
- Authentication screens (login, register)
- Secure token storage with AsyncStorage
- Todo list with filtering and search
- Create/edit todo functionality
- Real-time updates and optimistic UI
- Toast notifications for user feedback
- Clean, responsive UI with dark mode support
- Navigation with React Navigation

## Tech Stack

**Backend:**
- NestJS (TypeScript)
- TypeORM
- MySQL
- JWT Authentication
- bcryptjs for password hashing
- Class Validator for input validation

**Frontend:**
- React Native with Expo
- TypeScript
- React Navigation
- Axios for API calls
- AsyncStorage for local storage
- Toast notifications

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MySQL database
- Expo CLI (`npm install -g @expo/cli`)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=todoapp
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
PORT=3000
```

5. Create MySQL database:
```sql
CREATE DATABASE todoapp;
```

6. Start the development server:
```bash
npm run start:dev
```

7. (Optional) Seed sample data:
```bash
npx ts-node src/seeds/seed.ts
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update API base URL in `services/api.ts` if needed:
```typescript
const API_BASE_URL = 'http://your-backend-url:3000';
```

4. Start the Expo development server:
```bash
npx expo start
```

5. Use Expo Go app on your phone or run on simulator

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Todos (Protected)
- `GET /todos` - Get user's todos with filtering
- `POST /todos` - Create new todo
- `GET /todos/:id` - Get specific todo
- `PATCH /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo

### Query Parameters for GET /todos
- `status`: 'completed' | 'pending'
- `priority`: 'low' | 'medium' | 'high'
- `search`: Search in title
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Field to sort by (default: 'createdAt')
- `sortOrder`: 'ASC' | 'DESC' (default: 'DESC')

## Sample Data

The seed script creates:

**Users:**
- Username: `john_doe`, Email: `john@example.com`, Password: `password123`
- Username: `jane_smith`, Email: `jane@example.com`, Password: `password123`

**Sample Todos:**
- High priority documentation task
- Completed code review task
- Low priority grocery shopping
- High priority presentation preparation

## Example Usage

### 1. Register a new user
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### 3. Create a todo (with JWT token)
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Learn React Native",
    "description": "Build a todo app with React Native and NestJS",
    "priority": "high",
    "dueDate": "2024-12-31"
  }'
```

### 4. Get todos with filtering
```bash
curl "http://localhost:3000/todos?status=pending&priority=high&page=1&limit=5" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Project Structure

```
Todo App/
├── backend/
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── todos/          # Todos module
│   │   ├── config/         # Database configuration
│   │   └── seeds/          # Database seeding
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── (auth)/         # Auth screens
│   │   └── (tabs)/         # Main app screens
│   ├── services/           # API services
│   ├── context/            # React context
│   └── package.json
└── README.md
```

## Development Notes

- Backend runs on port 3000 by default
- Frontend uses Expo for development and testing
- JWT tokens are stored securely in AsyncStorage
- All API calls include automatic token management
- Error handling with user-friendly toast messages
- Optimistic UI updates for better user experience

## Production Deployment

### Backend
- Set `synchronize: false` in database config
- Use proper environment variables
- Set up database migrations
- Configure CORS for production domains
- Use PM2 or similar for process management

### Frontend
- Build for production: `expo build`
- Deploy to app stores or web
- Update API URLs for production
- Configure proper error tracking

## License

MIT License - feel free to use this project as a starting point for your own applications.