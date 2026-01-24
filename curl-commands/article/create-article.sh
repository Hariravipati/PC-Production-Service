curl -X POST "http://localhost:3000/articles" \
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