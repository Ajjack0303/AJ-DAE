# Use Email + OTP for User Authentication

## Context
InkConnect users include clients, artists, and admins. We wanted a simple, secure login method without requiring password complexity or heavy auth infrastructure.

## Decision
We chose email + one-time password (OTP) authentication for login.

## Rationale
- Simplifies onboarding for new users.
- Reduces risk of weak passwords or password reuse.
- Can integrate easily with third-party email/OTP services.
- Works across all user types (clients, artists, admins).

### Alternatives Considered
- **Username + Password** – Traditional method, but higher risk for weak passwords.
- **OAuth (Google, GitHub)** – Good option, but would require extra setup and may limit users who don’t have those accounts.
- **SMS OTP** – Adds cost and dependency on mobile network.

## Consequences
- Users rely on email for login; email delivery must be reliable.
- Cannot use offline login; requires email access.
- Must implement OTP expiration and secure storage of tokens.

## References
- https://en.wikipedia.org/wiki/Two-factor_authentication
- https://auth0.com/docs
