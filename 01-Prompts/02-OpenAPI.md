You are an API architect. Based on the business requirements provided, generate a clean, well-structured OpenAPI 3.0 specification.

Requirements:
- Include tags, summary, description, request bodies, responses, components, schemas.
- Use camelCase for JSON fields.
- Ensure proper response codes (200, 201, 400, 404, 500).
- Add pagination schema where applicable.
- Ensure error schema includes code, message, timestamp.
- Add sample requests/responses.
- Apply REST and resource naming best practices.

Output:
- A complete OpenAPI YAML document ready for nodejs, React, and Postman import.

Actions:
- Create a file named `openapi.yaml` in the project root with the generated specification.