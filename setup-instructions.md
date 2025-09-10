# Database Setup Instructions

## Option 1: Using MySQL Command Line

1. Install MySQL Server if not already installed
2. Open MySQL command line or MySQL Workbench
3. Run the setup script:
```bash
mysql -u root -p < setup-database.sql
```

## Option 2: Manual Setup

1. Connect to MySQL as root user
2. Execute these commands:
```sql
CREATE DATABASE todoapp;
USE todoapp;
```

3. The tables will be created automatically by TypeORM when you start the backend

## Option 3: Using Docker (Recommended)

1. Create and run MySQL container:
```bash
docker run --name todoapp-mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=todoapp -p 3306:3306 -d mysql:8.0
```

2. The database is ready to use with the backend

## Start the Application

1. Backend:
```bash
cd backend
npm install
npm run start:dev
```

2. Frontend:
```bash
cd frontend
npm install
npx expo start
```

3. Seed sample data (optional):
```bash
cd backend
npx ts-node src/seeds/seed.ts
```