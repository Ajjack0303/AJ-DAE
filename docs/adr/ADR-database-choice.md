# Use PostgreSQL for InkConnect Database

## Context
We needed a relational database to store users, portfolios, requests, and responses. The database must support foreign key relationships, data integrity, and scale for multiple artists and clients.

## Decision
We chose PostgreSQL as the primary database for InkConnect.

## Rationale
- Mature, widely used, and well-supported open-source RDBMS.
- Supports advanced relational features (foreign keys, constraints).
- Works well with SQLAlchemy or Django ORM.
- Strong community support and good documentation.
- Compatible with cloud deployments for production.

### Alternatives Considered
- **MySQL** – Similar features, but we preferred PostgreSQL’s advanced type system and stricter standard compliance.
- **SQLite** – Lightweight and good for local dev, but not suitable for multi-user production.
- **MongoDB** – NoSQL, but we need relational integrity and joins.

## Consequences
- Developers must use PostgreSQL for local dev and production.
- Migration scripts and ORMs must target PostgreSQL features.
- Slightly higher setup overhead compared to SQLite.

## References
- https://www.postgresql.org
- SQLAlchemy documentation: https://docs.sqlalchemy.org
