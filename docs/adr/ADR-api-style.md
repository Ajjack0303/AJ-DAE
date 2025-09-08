Title

Use REST API with versioning (/api/v1/)

Context

The backend must expose endpoints for client apps (portfolio site, admin dashboard, etc.). We needed a style that is simple, widely adopted, and easy to evolve as the project grows.

Decision

We chose a REST API design with versioning using /api/v1/ as a prefix.

Rationale

REST is familiar to most developers and widely supported by tools

Works well for CRUD operations (create/update portfolio, request, user)

Versioning avoids breaking changes when APIs evolve

Easier to document with tools like Swagger/OpenAPI

Alternatives considered:

GraphQL (powerful for flexible queries, but adds complexity and overhead)

gRPC (fast binary protocol, but unnecessary for a lightweight web API)

Consequences

Straightforward for client integration

Limited flexibility compared to GraphQL for highly customized queries

Must manage multiple versions in future releases

References

https://restfulapi.net/versioning/