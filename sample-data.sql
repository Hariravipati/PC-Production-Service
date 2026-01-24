-- Sample Data for Onboarding Service MS SQL Database
-- Execute these INSERT statements in order due to foreign key dependencies

-- 1. Insert Organizations
INSERT INTO Organization (OrgName, OrgCode, Description, IsActive, CreatedDate) VALUES
('Tech Solutions Inc', 'TECH001', 'Leading technology solutions provider', 1, GETDATE()),
('Global Finance Corp', 'FIN002', 'International financial services company', 1, GETDATE()),
('Healthcare Plus', 'HEALTH003', 'Comprehensive healthcare services', 1, GETDATE()),
('EduTech Academy', 'EDU004', 'Online education platform', 1, GETDATE()),
('Retail Masters', 'RETAIL005', 'Multi-channel retail operations', 0, GETDATE());

-- 2. Insert Forms
INSERT INTO Forms (FormName, FormUrl, LogoUrl, CreatedDate) VALUES
('Employee Onboarding Form', 'https://forms.company.com/employee', 'https://cdn.company.com/employee-logo.png', GETDATE()),
('Vendor Registration Form', 'https://forms.company.com/vendor', 'https://cdn.company.com/vendor-logo.png', GETDATE()),
('Customer KYC Form', 'https://forms.company.com/kyc', 'https://cdn.company.com/kyc-logo.png', GETDATE()),
('Contractor Agreement Form', 'https://forms.company.com/contractor', 'https://cdn.company.com/contractor-logo.png', GETDATE()),
('Partner Registration Form', 'https://forms.company.com/partner', 'https://cdn.company.com/partner-logo.png', GETDATE());

-- 3. Insert Form Versions
INSERT INTO FormVersion (FormId, VersionNo, FormJson, IsActive, CreatedDate) VALUES
(1, 1, N'{"fields":[{"name":"fullName","type":"text","required":true},{"name":"email","type":"email","required":true},{"name":"department","type":"select","options":["IT","HR","Finance","Operations"]}]}', 1, GETDATE()),
(1, 2, N'{"fields":[{"name":"fullName","type":"text","required":true},{"name":"email","type":"email","required":true},{"name":"department","type":"select","options":["IT","HR","Finance","Operations","Marketing"]},{"name":"startDate","type":"date","required":true}]}', 1, GETDATE()),
(2, 1, N'{"fields":[{"name":"companyName","type":"text","required":true},{"name":"contactEmail","type":"email","required":true},{"name":"taxId","type":"text","required":true},{"name":"serviceType","type":"select","options":["Software","Hardware","Consulting"]}]}', 1, GETDATE()),
(3, 1, N'{"fields":[{"name":"customerName","type":"text","required":true},{"name":"idNumber","type":"text","required":true},{"name":"address","type":"textarea","required":true},{"name":"phoneNumber","type":"tel","required":true}]}', 1, GETDATE()),
(4, 1, N'{"fields":[{"name":"contractorName","type":"text","required":true},{"name":"skillSet","type":"multiselect","options":["Java","Python","React","Angular"]},{"name":"hourlyRate","type":"number","required":true}]}', 1, GETDATE());

-- 4. Insert Organization Form Mappings (using actual FormVersionId values)
DECLARE @FormVersion1 INT = (SELECT FormVersionId FROM FormVersion WHERE FormId = 1 AND VersionNo = 1);
DECLARE @FormVersion2 INT = (SELECT FormVersionId FROM FormVersion WHERE FormId = 1 AND VersionNo = 2);
DECLARE @FormVersion3 INT = (SELECT FormVersionId FROM FormVersion WHERE FormId = 2 AND VersionNo = 1);
DECLARE @FormVersion4 INT = (SELECT FormVersionId FROM FormVersion WHERE FormId = 3 AND VersionNo = 1);
DECLARE @FormVersion5 INT = (SELECT FormVersionId FROM FormVersion WHERE FormId = 4 AND VersionNo = 1);

INSERT INTO OrgFormMapping (OrgId, FormVersionId, IsActive, CreatedDate) VALUES
(1, @FormVersion1, 1, GETDATE()),
(1, @FormVersion4, 1, GETDATE()),
(2, @FormVersion2, 1, GETDATE()),
(2, @FormVersion5, 1, GETDATE()),
(3, @FormVersion1, 1, GETDATE()),
(3, @FormVersion5, 1, GETDATE()),
(4, @FormVersion2, 1, GETDATE()),
(4, @FormVersion3, 1, GETDATE());

-- 5. Insert E-Onboarding Requests (using actual FormVersionId values)
INSERT INTO EOnboardingRequest (OrgId, FormVersionId, Email, MobileNo, ExpiryDate, Status, CreatedDate) VALUES
(1, @FormVersion1, 'john.doe@techsolutions.com', '+1234567890', DATEADD(day, 30, GETDATE()), 'PENDING', GETDATE()),
(1, @FormVersion4, 'vendor@supplier.com', '+1234567891', DATEADD(day, 15, GETDATE()), 'IN_PROGRESS', GETDATE()),
(2, @FormVersion2, 'jane.smith@globalfinance.com', '+1234567892', DATEADD(day, 45, GETDATE()), 'COMPLETED', GETDATE()),
(2, @FormVersion5, 'contractor@freelance.com', '+1234567893', DATEADD(day, 60, GETDATE()), 'PENDING', GETDATE()),
(3, @FormVersion1, 'doctor@healthcareplus.com', '+1234567894', DATEADD(day, 20, GETDATE()), 'EXPIRED', GETDATE()),
(3, @FormVersion5, 'nurse@healthcareplus.com', '+1234567895', DATEADD(day, 25, GETDATE()), 'IN_PROGRESS', GETDATE()),
(4, @FormVersion2, 'teacher@edutech.com', '+1234567896', DATEADD(day, 35, GETDATE()), 'COMPLETED', GETDATE()),
(4, @FormVersion3, 'partner@education.com', '+1234567897', DATEADD(day, 40, GETDATE()), 'PENDING', GETDATE());

-- 6. Insert E-Onboarding Responses (using actual RequestId values)
DECLARE @Req1 INT = (SELECT RequestId FROM EOnboardingRequest WHERE Email = 'john.doe@techsolutions.com');
DECLARE @Req2 INT = (SELECT RequestId FROM EOnboardingRequest WHERE Email = 'vendor@supplier.com');
DECLARE @Req3 INT = (SELECT RequestId FROM EOnboardingRequest WHERE Email = 'jane.smith@globalfinance.com');
DECLARE @Req4 INT = (SELECT RequestId FROM EOnboardingRequest WHERE Email = 'contractor@freelance.com');
DECLARE @Req5 INT = (SELECT RequestId FROM EOnboardingRequest WHERE Email = 'doctor@healthcareplus.com');
DECLARE @Req6 INT = (SELECT RequestId FROM EOnboardingRequest WHERE Email = 'nurse@healthcareplus.com');
DECLARE @Req7 INT = (SELECT RequestId FROM EOnboardingRequest WHERE Email = 'teacher@edutech.com');
DECLARE @Req8 INT = (SELECT RequestId FROM EOnboardingRequest WHERE Email = 'partner@education.com');

INSERT INTO EOnboardingResponse (RequestId, IsSaved, IsCompleted, ResponseJson, UpdatedDate) VALUES
(@Req1, 1, 0, '{"fullName":"John Doe","email":"john.doe@techsolutions.com","department":"IT"}', GETDATE()),
(@Req2, 1, 0, '{"companyName":"Supplier Corp","contactEmail":"vendor@supplier.com","taxId":"TAX123456"}', GETDATE()),
(@Req3, 1, 1, '{"fullName":"Jane Smith","email":"jane.smith@globalfinance.com","department":"Finance","startDate":"2024-01-15"}', GETDATE()),
(@Req4, 0, 0, NULL, GETDATE()),
(@Req5, 1, 1, '{"fullName":"Dr. Wilson","email":"doctor@healthcareplus.com","department":"Operations"}', GETDATE()),
(@Req6, 1, 0, '{"contractorName":"Nurse Johnson","skillSet":["Healthcare","Patient Care"],"hourlyRate":45}', GETDATE()),
(@Req7, 1, 1, '{"fullName":"Prof. Anderson","email":"teacher@edutech.com","department":"Marketing","startDate":"2024-02-01"}', GETDATE()),
(@Req8, 0, 0, NULL, GETDATE());

-- 7. Insert Request Status History (using actual RequestId values)
INSERT INTO RequestStatusHistory (RequestId, OldStatus, NewStatus, ChangedAt) VALUES
(@Req1, NULL, 'PENDING', GETDATE()),
(@Req2, NULL, 'PENDING', DATEADD(hour, -2, GETDATE())),
(@Req2, 'PENDING', 'IN_PROGRESS', GETDATE()),
(@Req3, NULL, 'PENDING', DATEADD(day, -5, GETDATE())),
(@Req3, 'PENDING', 'IN_PROGRESS', DATEADD(day, -3, GETDATE())),
(@Req3, 'IN_PROGRESS', 'COMPLETED', DATEADD(day, -1, GETDATE())),
(@Req4, NULL, 'PENDING', GETDATE()),
(@Req5, NULL, 'PENDING', DATEADD(day, -10, GETDATE())),
(@Req5, 'PENDING', 'EXPIRED', DATEADD(day, -2, GETDATE())),
(@Req6, NULL, 'PENDING', DATEADD(hour, -6, GETDATE())),
(@Req6, 'PENDING', 'IN_PROGRESS', DATEADD(hour, -2, GETDATE())),
(@Req7, NULL, 'PENDING', DATEADD(day, -7, GETDATE())),
(@Req7, 'PENDING', 'IN_PROGRESS', DATEADD(day, -4, GETDATE())),
(@Req7, 'IN_PROGRESS', 'COMPLETED', DATEADD(day, -1, GETDATE())),
(@Req8, NULL, 'PENDING', GETDATE());

-- Verification Queries (Optional - Run these to verify data insertion)
/*
SELECT 'Organizations' as TableName, COUNT(*) as RecordCount FROM Organization
UNION ALL
SELECT 'Forms', COUNT(*) FROM Forms
UNION ALL
SELECT 'FormVersion', COUNT(*) FROM FormVersion
UNION ALL
SELECT 'OrgFormMapping', COUNT(*) FROM OrgFormMapping
UNION ALL
SELECT 'EOnboardingRequest', COUNT(*) FROM EOnboardingRequest
UNION ALL
SELECT 'EOnboardingResponse', COUNT(*) FROM EOnboardingResponse
UNION ALL
SELECT 'RequestStatusHistory', COUNT(*) FROM RequestStatusHistory;
*/