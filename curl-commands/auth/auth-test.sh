# JWT Authentication Test Commands

## 1. Register a new user
curl -X POST http://localhost:3002/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "email": "test@example.com"
  }'

## 2. Login to get JWT token
curl -X POST http://localhost:3002/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'

## 3. Access protected route (replace YOUR_JWT_TOKEN with actual token from login)
curl -X GET http://localhost:3002/articles \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

## 4. Get user profile
curl -X GET http://localhost:3002/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

## 5. Try accessing protected route without token (should fail)
curl -X GET http://localhost:3002/articles