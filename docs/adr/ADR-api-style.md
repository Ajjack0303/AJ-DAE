# Use RESTful API Style for InkConnect Backend

## Context
We needed a consistent API design for frontend consumption (React app or mobile clients). The API must support CRUD operations on users, portfolios, requests, and responses.

## Decision
We decided to implement a RESTful API design for all endpoints.

## Rationale
- Widely understood and compatible with most frontend frameworks.
- Easy to test using tools like Postman or Swagger.
- Simplifies versioning and resource-based design.
- Aligns with common FastAPI and Django REST practices.

### Alternatives Considered
- **GraphQL** – Offers flexible queries but adds complexity and requires learning curve.
- **gRPC** – More efficient for microservices, but overkill for this project’s size.
- **SOAP** – Outdated, verbose, not ideal for modern frontend frameworks.

## Consequences
- Must adhere to REST standards (HTTP verbs, status codes, resource URLs).
- Easy to document and maintain for the frontend team.
- Limits overly flexible queries that GraphQL allows.

## References
- https://restfulapi.net
- FastAPI REST tutorial: https://fastapi.tiangolo.com/tutorial/
