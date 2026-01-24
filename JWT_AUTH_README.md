# JWT Authentication Implementation

## Overview
This implementation provides JWT-based authentication with login/password functionality, including user registration, login, and route protection.

## Features
- User registration with password hashing
- JWT token-based authentication
- Global route protection with public route exceptions
- Password validation and user management

## API Endpoints

### Authentication Routes (Public)
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token
- `GET /auth/profile` - Get current user profile (Protected)

### Protected Routes
All other routes require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Usage

### 1. Register User
```bash
POST /auth/register
{
  "username": "testuser",
  "password": "password123",
  "email": "test@example.com"
}
```

### 2. Login
```bash
POST /auth/login
{
  "username": "testuser", 
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

### 3. Access Protected Routes
Include JWT token in Authorization header:
```bash
GET /articles
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Implementation Details

### Files Created
- `src/modules/auth/` - Auth module directory
- `entities/user.entity.ts` - User database entity
- `dto/login.dto.ts` - Login request validation
- `dto/register.dto.ts` - Registration request validation
- `auth.service.ts` - Authentication business logic
- `auth.controller.ts` - Auth API endpoints
- `auth.module.ts` - Module configuration
- `guards/jwt-auth.guard.ts` - JWT route protection
- `strategies/jwt.strategy.ts` - JWT validation strategy
- `decorators/public.decorator.ts` - Public route marker

### Security Features
- Passwords hashed with bcrypt
- JWT tokens with configurable expiration
- Global route protection by default
- Public decorator for open endpoints

### Configuration
JWT secret configured in `.env`:
```
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
```

## Testing
Use the curl commands in `curl-commands/auth/auth-test.sh` to test the authentication flow.