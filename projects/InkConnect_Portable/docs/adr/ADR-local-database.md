# Use SQLite for Local Development

## Context
We needed a lightweight database that works offline for testing and initial development.

## Decision
We chose SQLite for local development environments.

## Rationale
- Simple to set up and doesn’t require network or credentials.
- Faster for small teams and testing purposes.
- Fully supported by SQLAlchemy and Django ORM for local dev.

### Alternatives Considered
- **PostgreSQL** – More powerful, but heavier for local setup.
- **Firebase** – Not local, requires internet.

## Consequences
- Easy onboarding for new developers.
- Will need migration to PostgreSQL for production.
- Minimal configuration needed for tests.

## References
- https://www.sqlite.org
