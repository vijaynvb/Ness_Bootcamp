---
applyTo: "backend/**/*.ts, backend/**/*.js, backend/**/*.json, backend/**/*.tsx"
description: "Nodejs TypeScript backend coding guidelines"
---

# TypeScript Backend Guidelines

## Architecture
- Follow layered architecture: controller → service → repository.
- Use DTOs for all inbound/outbound API data.
- Avoid exposing entity models directly.

## Error Handling
- Use custom exceptions for domain and service errors.
- Return standardized error responses.
- Never swallow exceptions.

## Persistence
- Use parameterized queries or ORM (TypeORM/Sequelize).
- Avoid N+1 queries; prefer join fetch or batch fetching.

## Testing
- Use Jest + Mocking Library.
- Each service must have unit tests for critical functions.