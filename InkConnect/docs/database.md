# InkConnect Database Normalization

## Overview
This database manages artists, clients, portfolios, and client requests. It is normalized up to **3NF**.

## Tables

### 1. users
- **user_id** (PK)
- username
- email
- password_hash
- role (client, artist, admin)
- created_at

### 2. portfolios
- **portfolio_id** (PK)
- artist_id (FK → users.user_id)
- title
- description
- created_at

### 3. artist_requests
- **request_id** (PK)
- client_id (FK → users.user_id)
- artist_id (FK → users.user_id)
- title
- description
- status (pending, accepted, completed)
- created_at

### 4. request_responses
- **response_id** (PK)
- request_id (FK → artist_requests.request_id)
- artist_id (FK → users.user_id)
- message
- created_at

## Normalization Steps

1. **1NF**: All attributes are atomic; no repeating groups.
2. **2NF**: All non-key attributes fully depend on the primary key.
3. **3NF**: No transitive dependencies. All data that could change (like artist or client names) are stored only in the `users` table.

## Relationships

- **Users ↔ Portfolios**: One-to-many (1 artist can have many portfolios)
- **Users ↔ Artist Requests**: One-to-many (1 client can have many requests; 1 artist can receive many requests)
- **Artist Requests ↔ Request Responses**: One-to-many (1 request can have multiple responses)
