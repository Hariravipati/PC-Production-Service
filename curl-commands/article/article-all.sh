#!/bin/bash

# Base URL
BASE_URL="http://localhost:3000"

echo "=== Article API CURL Commands ==="

# 1. Create Article
echo "1. Create Article:"
curl -X POST "$BASE_URL/articles" \
  -H "Content-Type: application/json" \
  -d '{
    "articleNo": 1,
    "articleName": "Sample Article",
    "articleHsnCode": "HSN001",
    "articleUnit": "PCS",
    "articleGstPercent": 18,
    "articleDate": "2024-01-01",
    "articleNoOfPly": 3,
    "articleFluteType": "B"
  }'

echo -e "\n\n"

# 2. Get All Articles
echo "2. Get All Articles:"
curl -X GET "$BASE_URL/articles"

echo -e "\n\n"

# 3. Get Article by ID
echo "3. Get Article by ID (articleNo: 1):"
curl -X GET "$BASE_URL/articles/1"

echo -e "\n\n"

# 4. Update Article
echo "4. Update Article:"
curl -X PUT "$BASE_URL/articles/1" \
  -H "Content-Type: application/json" \
  -d '{
    "articleName": "Updated Article Name",
    "articleGstPercent": 12
  }'

echo -e "\n\n"

# 5. Delete Article
echo "5. Delete Article:"
curl -X DELETE "$BASE_URL/articles/1"

echo -e "\n\n"