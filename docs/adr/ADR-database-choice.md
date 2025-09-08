Title

Use PostgreSQL as the primary database

Context

We needed a database solution to manage structured artist data, portfolio content, and user requests. The system requires relationships (users ↔ portfolios, requests ↔ responses) and strong data integrity.

Decision

We chose PostgreSQL as the production database.

Rationale

Mature relational database with strong community support

Enforces schema and constraints for data consistency

Supports advanced queries, indexing, and JSON fields if needed

Well supported by ORMs and backend frameworks

Alternatives considered:

MongoDB (flexible schema, but less suited for relational data)

MySQL (similar relational support, but PostgreSQL offers better JSON handling and features)

Consequences

Strong integrity guarantees

Slightly steeper learning curve compared to schemaless DBs

Requires setup for local dev (can be simplified with Docker)

References

https://www.postgresql.org