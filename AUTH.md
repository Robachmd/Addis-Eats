# Addis Eats — Authentication and Security

## 1. Document Information

| Property | Value |
|---|---|
| Project | Addis Eats |
| Document | Authentication and Security Review |
| Version | 1.0 |
| Application | Next.js App Router |
| Language | JavaScript / JSX |
| Validation | Zod |
| Status | Implementation review and security verification |

## 2. Purpose

This document describes the authentication and authorization mechanisms implemented in Addis Eats, a restaurant ordering application.

The review covers registration, login, session handling, access to protected routes, order ownership, logout, and security testing.

The objective is to establish whether authentication is correctly enforced and whether unauthorized users can access or modify protected resources.

## 3. Authentication Architecture

### 3.1 Relevant Source Files

| File | Responsibility |
|---|---|
| `src/app/(pages)/(auth)/login/page.jsx` | Login page |
| `src/app/(pages)/(auth)/login/LoginForm.jsx` | Login form interface |
| `src/app/(pages)/(auth)/register/page.jsx` | Registration page |
| `src/app/(pages)/(auth)/logout/logout.jsx` | Logout-related functionality |
| `src/lib/session.js` | Session-related logic |
| `src/middleware.js` | Route-access middleware |
| `src/app/actions.js` | Server Actions, including order operations |
| `src/lib/schema.js` | Input-validation schemas |
| `src/app/api/orders/route.js` | Order API endpoint |

### 3.2 Registration and Login

The application provides registration and login interfaces.

Input validation is performed using Zod schemas where implemented.

The following items must be verified against the actual implementation:

- Whether registration creates a persistent user account.
- Whether passwords are securely hashed before storage.
- Whether login verifies credentials against stored user records.
- Whether successful login establishes a genuine authenticated session.
- Whether invalid credentials are rejected.
- Whether duplicate accounts are handled correctly.

**Security limitation:** A login form and validation schema do not, by themselves, establish secure authentication. The application must verify credentials and associate the resulting session with the correct user.

### 3.3 Session Management

Session-related functionality is located in `src/lib/session.js`.

The session implementation must be evaluated to establish:

- How sessions are created and validated.
- Whether the session identifies a real authenticated user.
- Whether session cookies are configured securely.
- Whether sessions expire.
- Whether logout invalidates the session.
- Whether session identifiers can be forged or reused.

A fixed mock user or a session created without verifying credentials must not be treated as production authentication.

### 3.4 Protected Routes

The application uses `src/middleware.js` to handle access to selected routes.

Relevant routes include checkout, cart, and orders, depending on the configured matcher.

Middleware can provide an initial access-control check, but it is not a substitute for server-side authorization inside protected pages, Server Actions, and API handlers.

Every protected operation must independently verify the authenticated user's permissions where appropriate.

## 4. Authorization and Order Ownership

Order operations must associate each order with the authenticated user's identifier.

The relevant ownership relationship is:

`order.userId === authenticatedUser.id`

Order retrieval must return only the current user's authorized orders.

Order cancellation must verify all of the following:

1. A valid authenticated session exists.
2. The requested order exists.
3. The order belongs to the authenticated user.
4. The order is in a state that permits cancellation.

The application must not rely solely on hiding order links in the user interface.

## 5. Security Verification

The following three negative tests are required for the capstone security review.

### AUTH-01: Unauthenticated Access

**Objective:** Verify that protected resources cannot be accessed without authentication.

**Procedure:**
1. Log out.
2. Request a protected page directly.
3. Request a protected API endpoint directly, where applicable.

**Expected result:** The application denies access or redirects the user appropriately. No protected data is disclosed.

**Actual result:** [Record observed result]

**Status:** [PASS / FAIL / NOT RUN]

**Evidence:** [Test output or screenshot reference]

### AUTH-02: Invalid or Forged Session

**Objective:** Verify that an invalid session cannot grant access.

**Procedure:**
1. Obtain a test session cookie or token.
2. Remove it or replace it with an invalid value.
3. Request a protected resource.
4. Verify the server's response and returned data.

**Expected result:** The server rejects the invalid session and does not disclose protected data.

**Actual result:** [Record observed result]

**Status:** [PASS / FAIL / NOT RUN]

**Evidence:** [Test output or screenshot reference]

### AUTH-03: Cross-User Order Access

**Objective:** Verify that one user cannot access or cancel another user's order.

**Procedure:**
1. Create test accounts A and B.
2. Create an order owned by account A.
3. Authenticate as account B.
4. Attempt to retrieve or cancel account A's order.

**Expected result:** The server denies unauthorized access and leaves the order unchanged.

**Actual result:** [Record observed result]

**Status:** [PASS / FAIL / NOT RUN]

**Evidence:** [Test output or screenshot reference]

## 6. Additional Security Checks

| Control | Verification required |
|---|---|
| Password storage | Confirm secure password hashing |
| Session cookie | Inspect `HttpOnly`, `Secure`, and `SameSite` settings |
| Session expiration | Verify expiry and invalidation |
| Login validation | Verify invalid credentials are rejected |
| Route protection | Test direct requests to protected routes |
| Order ownership | Test cross-user access |
| Input validation | Test invalid and unexpected input |
| Error handling | Verify that sensitive information is not disclosed |

## 7. Findings and Limitations

The implementation review must distinguish working interface behavior from verified security controls.

The project has used mock session and order-storage behavior during development. These mechanisms must not be represented as production-grade authentication or persistent user data unless the current code has been upgraded and verified.

Any fixed mock identity, unverified session token, missing credential verification, or missing server-side ownership check must be documented and corrected before claiming that the relevant security control passes.

## 8. Conclusion

The security assessment is complete only when the authentication implementation has been reviewed and the negative security tests have been executed against the deployed application.

The final assessment must include the results of all three tests, supporting evidence, and any unresolved findings.

**Overall status:** [Complete after verification]