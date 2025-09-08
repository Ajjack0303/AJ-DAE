Title

Use JWT stored in HTTP-only cookies for authentication

Context

We needed a secure way to manage user sessions (artist accounts, admin access). Security against XSS and scalability for future services were key factors.

Decision

We chose to use JWT tokens stored in HTTP-only cookies.

Rationale

JWT is stateless, works well with distributed systems

HTTP-only cookies prevent JavaScript access (mitigates XSS)

Compatible with backend frameworks and middleware

Simplifies scaling (no central session store required)

Alternatives considered:

Session IDs in server memory/DB (traditional, but harder to scale horizontally)

JWT in localStorage (easier for frontend, but vulnerable to XSS attacks)

Consequences

More secure against XSS

Requires CSRF protection for cookie-based auth

Token expiration and refresh logic must be implemented

References

https://auth0.com/docs/secure/tokens/json-web-tokens

https://owasp.org/www-community/HttpOnly