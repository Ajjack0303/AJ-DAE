# InkConnect API Outline

## Authentication
- `POST /auth/register` – Register new user (artist or client)
- `POST /auth/login` – Login user, return JWT token
- `POST /auth/logout` – Logout user (invalidate token)

## Artist Profiles
- `GET /artists` – List all artists
- `GET /artists/{id}` – Get artist by ID
- `POST /artists` – Create artist profile
- `PUT /artists/{id}` – Update artist profile
- `DELETE /artists/{id}` – Delete artist profile

## Client Requests
- `GET /requests` – List all requests
- `GET /requests/{id}` – Get request by ID
- `POST /requests` – Create new tattoo request
- `PUT /requests/{id}` – Update request (status, description)
- `DELETE /requests/{id}` – Delete request

## Messages
- `GET /messages` – List all messages for user
- `POST /messages` – Send new message
- `GET /messages/{id}` – Get specific message by ID
- `DELETE /messages/{id}` – Delete message
