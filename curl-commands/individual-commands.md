# PC Production Service - Individual API Commands
# Replace YOUR_TOKEN with actual JWT token from login response

## 1. AUTHENTICATION

### Register User
curl -X POST http://localhost:3002/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "email": "test@example.com"
  }'

### Login User
curl -X POST http://localhost:3002/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'

### Get Profile
curl -X GET http://localhost:3002/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"

## 2. ARTICLES

### Create Article (Complete)
curl -X POST http://localhost:3002/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
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

### Create Article (Minimal)
curl -X POST http://localhost:3002/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "articleNo": 1002,
    "articleName": "Simple Box",
    "articleRate": 10.00
  }'

### Update Article
curl -X PUT http://localhost:3002/articles/1001 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "articleName": "Updated Box Type A",
    "articleRate": 16.00,
    "articleStatus": "Active",
    "remarks": "Updated description"
  }'

### Get Single Article
curl -X GET http://localhost:3002/articles/1001 \
  -H "Authorization: Bearer YOUR_TOKEN"

### Get All Articles
curl -X GET http://localhost:3002/articles \
  -H "Authorization: Bearer YOUR_TOKEN"

### Delete Article
curl -X DELETE http://localhost:3002/articles/1002 \
  -H "Authorization: Bearer YOUR_TOKEN"

## 3. ERROR TESTING

### Access Without Token (401 Error)
curl -X GET http://localhost:3002/articles

### Invalid Credentials (401 Error)
curl -X POST http://localhost:3002/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "wrong",
    "password": "wrong"
  }'

### Non-existent Article (404 Error)
curl -X GET http://localhost:3002/articles/99999 \
  -H "Authorization: Bearer YOUR_TOKEN"

### Invalid Data (422 Error)
curl -X POST http://localhost:3002/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "articleName": "",
    "articleRate": -5
  }'