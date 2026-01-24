# Onboarding Service - cURL Commands

Base URL: `http://localhost:3001`

## Controllers Overview
- **Candidate Controller**: `/candidates`
- **Onboarding Controller**: `/onboarding`
- **OTP Verification Controller**: `/onboarding` (OTP endpoints)

---

## 1. CANDIDATE CONTROLLER

### Create Candidate
```bash
curl -X POST http://localhost:3001/candidates \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john.doe@example.com","phone":"1234567890"}'
```

### Update Candidate
```bash
curl -X PUT http://localhost:3001/candidates/1 \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Smith","email":"jane.smith@example.com","phone":"9876543210"}'
```

### Get Candidate by ID
```bash
curl -X GET http://localhost:3001/candidates/1
```

---

## 2. ONBOARDING CONTROLLER

### Get All Organizations
```bash
curl -X GET http://localhost:3001/onboarding/organizations
```

### Get Form Details
```bash
curl -X GET "http://localhost:3001/onboarding/org-formDetails?orgId=1&formMappingId=1"
```

### Get Organization Forms List
```bash
curl -X GET "http://localhost:3001/onboarding/org-forms-list?orgId=1"
```

### Create EOB Request
```bash
curl -X POST http://localhost:3001/onboarding/eob-request \
  -H "Content-Type: application/json" \
  -d '{"organizationId":1,"candidateName":"John Doe","email":"john.doe@example.com","mobileNo":"1234567890"}'
```

### Get EOB Requests by Organization ID
```bash
curl -X GET http://localhost:3001/onboarding/eob-requests-by-orgId/1
```

### Download EOB Template (CSV)
```bash
curl -X GET "http://localhost:3001/onboarding/download-eob-template?format=csv" --output eob-template.csv
```

### Download EOB Template (Excel)
```bash
curl -X GET "http://localhost:3001/onboarding/download-eob-template?format=xlsx" --output eob-template.xlsx
```

### Bulk Upload File
```bash
curl -X POST http://localhost:3001/onboarding/bulk-S3-upload-async \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/your/file.csv"
```

---

## 3. OTP VERIFICATION CONTROLLER

### Send OTP to Mobile Number
```bash
curl -X POST http://localhost:3001/onboarding/send-otp \
  -H "Content-Type: application/json" \
  -d '{"mobileNo":"1234567890"}'
```

### Verify OTP
```bash
curl -X POST http://localhost:3001/onboarding/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"mobileNo":"1234567890","otp":"123456"}'
```

---

## Folder Structure
```
curl-commands/
├── README.md (this file)
├── candidate/
│   └── candidate-all.sh
├── onboarding/
│   └── onboarding-all.sh
└── otp-verification/
    └── otp-all.sh
```
