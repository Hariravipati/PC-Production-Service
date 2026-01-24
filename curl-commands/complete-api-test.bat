@echo off
REM PC Production Service - Complete API Test Suite (Windows)
set BASE_URL=http://localhost:3002

echo === PC Production Service API Test Suite ===
echo Base URL: %BASE_URL%
echo.

echo 1. AUTHENTICATION ENDPOINTS
echo ==========================

echo 1.1 Register User
curl -X POST %BASE_URL%/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"testuser\", \"password\": \"password123\", \"email\": \"test@example.com\"}"
echo.

echo 1.2 Login User
curl -X POST %BASE_URL%/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"testuser\", \"password\": \"password123\"}"
echo.
echo NOTE: Copy the access_token from above response for subsequent requests
set /p ACCESS_TOKEN=Enter the access_token: 

echo 1.3 Get User Profile
curl -X GET %BASE_URL%/auth/profile ^
  -H "Authorization: Bearer %ACCESS_TOKEN%"
echo.

echo.
echo 2. ARTICLE ENDPOINTS
echo ====================

echo 2.1 Create Article - Complete Data
curl -X POST %BASE_URL%/articles ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer %ACCESS_TOKEN%" ^
  -d "{\"articleNo\": 1001, \"articleName\": \"Corrugated Box Type A\", \"articleHsnCode\": \"4819100000\", \"articleUnit\": \"PCS\", \"articleGstPercent\": 18, \"articleDate\": \"2024-01-15\", \"articleRate\": 15.50, \"articleStatus\": \"Active\", \"isIdSelected\": true}"
echo.

echo 2.2 Update Article
curl -X PUT %BASE_URL%/articles/1001 ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer %ACCESS_TOKEN%" ^
  -d "{\"articleName\": \"Updated Box Type A\", \"articleRate\": 16.00, \"articleStatus\": \"Active\"}"
echo.

echo 2.3 Get Single Article
curl -X GET %BASE_URL%/articles/1001 ^
  -H "Authorization: Bearer %ACCESS_TOKEN%"
echo.

echo 2.4 Get All Articles
curl -X GET %BASE_URL%/articles ^
  -H "Authorization: Bearer %ACCESS_TOKEN%"
echo.

echo 2.5 Create Simple Article
curl -X POST %BASE_URL%/articles ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer %ACCESS_TOKEN%" ^
  -d "{\"articleNo\": 1002, \"articleName\": \"Simple Box\", \"articleRate\": 10.00}"
echo.

echo 2.6 Delete Article
curl -X DELETE %BASE_URL%/articles/1002 ^
  -H "Authorization: Bearer %ACCESS_TOKEN%"
echo.

echo.
echo 3. ERROR SCENARIOS
echo ==================

echo 3.1 Access Without Token (Should Fail)
curl -X GET %BASE_URL%/articles
echo.

echo 3.2 Invalid Login (Should Fail)
curl -X POST %BASE_URL%/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"wrong\", \"password\": \"wrong\"}"
echo.

echo 3.3 Get Non-Existent Article (Should Fail)
curl -X GET %BASE_URL%/articles/99999 ^
  -H "Authorization: Bearer %ACCESS_TOKEN%"
echo.

echo.
echo === Test Suite Complete ===
pause