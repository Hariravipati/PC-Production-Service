curl -X PUT "http://localhost:3000/articles/1" \
  -H "Content-Type: application/json" \
  -d '{
    "articleName": "Updated Article Name",
    "articleGstPercent": 12
  }'