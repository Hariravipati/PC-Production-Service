#!/bin/bash

# PC Production Service - Complete API Test Suite
BASE_URL="http://localhost:3002"

echo "=== PC Production Service API Test Suite ==="
echo "Base URL: $BASE_URL"
echo ""

# Variables to store tokens
ACCESS_TOKEN=""

echo "1. AUTHENTICATION ENDPOINTS"
echo "=========================="

echo "1.1 Register User"
curl -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "email": "test@example.com"
  }'
echo -e "\n"

echo "1.2 Login User (Save token for subsequent requests)"
RESPONSE=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }')
echo $RESPONSE

# Extract token (requires jq - install with: npm install -g jq or apt-get install jq)
ACCESS_TOKEN=$(echo $RESPONSE | jq -r '.data.access_token // .access_token // empty')
echo "Extracted Token: $ACCESS_TOKEN"
echo -e "\n"

echo "1.3 Get User Profile (Protected)"
curl -X GET $BASE_URL/auth/profile \
  -H "Authorization: Bearer $ACCESS_TOKEN"
echo -e "\n"

echo ""
echo "2. ARTICLE ENDPOINTS (All Protected)"
echo "=================================="

echo "2.1 Create Article"
curl -X POST $BASE_URL/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "articleNo": 1001,
    "articleName": "Corrugated Box Type A",
    "articleHsnCode": "4819100000",
    "articleUnit": "PCS",
    "articleGstPercent": 18,
    "articleDate": "2024-01-15",
    "articleNoOfPly": 3,
    "articleFluteType": "B",
    "articleBoxWeight": 0.5,
    "articleUps": 1,
    "articlePcsPerBunddle": 25,
    "articleIdLength": 30.5,
    "articleIdWidth": 20.5,
    "articleIdHeight": 15.0,
    "articleOdLenth": 32.0,
    "articleOdWidth": 22.0,
    "articleOdHeight": 16.0,
    "articleUom": "CM",
    "articleSheetSize": "70x100",
    "articleRotarySize": "65x95",
    "articleBoardCuttingSize": "68x98",
    "articleBoardGsm": "120GSM",
    "articleBs": "22",
    "articleCs": "3.5",
    "articleMoisture": "8%",
    "articlePrinting": "4 Color Offset",
    "articleColor": "CMYK",
    "articleArtWork": "Customer Logo",
    "articleBlockCode": "BLK001",
    "remarks": "Standard corrugated box",
    "articleStatus": "Active",
    "articleRate": 15.50,
    "customerFcode": 2001,
    "articleType": "Standard",
    "articlePcsPerBoard": 8,
    "revision": 1,
    "route": "Production",
    "boardMargin": 5,
    "reelMargin": 3,
    "articleReelSize": 1200.0,
    "articleSquareMeter": 0.0626,
    "isIdSelected": true,
    "itemFcode": 3001,
    "isTrayRequired": false,
    "isPartitionRequired": true,
    "noOfColor": 4,
    "lamination": "Matt",
    "metPad": "Silver",
    "windowArticle": "None",
    "boardLength": 70.0,
    "boardWidth": 100.0,
    "splitJoinStage": "Die Cutting",
    "uv": true,
    "dripoff": false,
    "varnish": true,
    "articleCurrentStock": 500.0,
    "materialType": "Corrugated",
    "uvSize": "Full",
    "varnishSize": "Spot",
    "articleBoardWeight": 0.8,
    "laminationRate": 2.5,
    "windowRate": 0.0,
    "uvRate": 1.2,
    "varnishRate": 0.8
  }'
echo -e "\n"

echo "2.2 Update Article"
curl -X PUT $BASE_URL/articles/1001 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "articleName": "Corrugated Box Type A - Updated",
    "articleRate": 16.00,
    "articleStatus": "Active",
    "remarks": "Updated standard corrugated box",
    "articleGstPercent": 18,
    "noOfColor": 5,
    "articleCurrentStock": 750.0
  }'
echo -e "\n"

echo "2.3 Get Single Article"
curl -X GET $BASE_URL/articles/1001 \
  -H "Authorization: Bearer $ACCESS_TOKEN"
echo -e "\n"

echo "2.4 Get All Articles"
curl -X GET $BASE_URL/articles \
  -H "Authorization: Bearer $ACCESS_TOKEN"
echo -e "\n"

echo "2.5 Create Another Article (Minimal Data)"
curl -X POST $BASE_URL/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "articleNo": 1002,
    "articleName": "Simple Box",
    "articleRate": 10.00
  }'
echo -e "\n"

echo "2.6 Delete Article"
curl -X DELETE $BASE_URL/articles/1002 \
  -H "Authorization: Bearer $ACCESS_TOKEN"
echo -e "\n"

echo ""
echo "3. ERROR SCENARIOS"
echo "=================="

echo "3.1 Access Protected Route Without Token (Should Fail)"
curl -X GET $BASE_URL/articles
echo -e "\n"

echo "3.2 Invalid Login Credentials (Should Fail)"
curl -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "wronguser",
    "password": "wrongpass"
  }'
echo -e "\n"

echo "3.3 Create Article with Invalid Data (Should Fail)"
curl -X POST $BASE_URL/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "articleName": "",
    "articleRate": -5
  }'
echo -e "\n"

echo "3.4 Get Non-Existent Article (Should Fail)"
curl -X GET $BASE_URL/articles/99999 \
  -H "Authorization: Bearer $ACCESS_TOKEN"
echo -e "\n"

echo "3.5 Register Duplicate User (Should Fail)"
curl -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "email": "test2@example.com"
  }'
echo -e "\n"

echo ""
echo "4. ADDITIONAL TEST USERS"
echo "======================="

echo "4.1 Register Second User"
curl -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user2",
    "password": "password456",
    "email": "user2@example.com"
  }'
echo -e "\n"

echo "4.2 Login as Second User"
USER2_RESPONSE=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user2",
    "password": "password456"
  }')
echo $USER2_RESPONSE

USER2_TOKEN=$(echo $USER2_RESPONSE | jq -r '.data.access_token // .access_token // empty')
echo "User2 Token: $USER2_TOKEN"
echo -e "\n"

echo "4.3 Create Article as Second User"
curl -X POST $BASE_URL/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $USER2_TOKEN" \
  -d '{
    "articleNo": 2001,
    "articleName": "User2 Article",
    "articleRate": 25.00,
    "articleStatus": "Active"
  }'
echo -e "\n"

echo ""
echo "=== Test Suite Complete ==="
echo "Note: Install jq for automatic token extraction: npm install -g jq"
echo "Manual token extraction: Copy access_token from login response"