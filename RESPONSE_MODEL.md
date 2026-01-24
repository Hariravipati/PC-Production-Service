# Standard Response Model

All API responses follow a consistent structure for both success and error cases.

## Success Response Structure

```json
{
  "success": true,
  "status": 200,
  "message": "Success",
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Error Response Structure

```json
{
  "success": false,
  "status": 400,
  "message": "Error message",
  "data": null,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Usage in Controllers

### Automatic Wrapping (Recommended)
All responses are automatically wrapped by the `ResponseInterceptor`:

```typescript
@Get(':id')
async getCandidate(@Param('id') id: number) {
  return this.candidateService.getCandidateById(id);
  // Automatically wrapped in ResponseDto.success()
}
```

### Manual Response (Optional)
Use `ResponseDto` for custom messages:

```typescript
import { ResponseDto } from '../common/dto/response_dto';

@Post()
async createCandidate(@Body() dto: CreateCandidateDto) {
  const candidate = await this.candidateService.createCandidate(dto);
  return ResponseDto.success(candidate, 'Candidate created successfully');
}
```

## Exception Handling

All exceptions are caught by `GlobalExceptionFilter` and formatted consistently:

```typescript
// Throws BadRequestException
throw new BadRequestException('Invalid input');

// Returns:
{
  "success": false,
  "status": 400,
  "message": "Invalid input",
  "data": null,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error
