# Addis Eats — Data Architecture and Integrity

## 1. Document Information

| Property | Value |
|---|---|
| Project | Addis Eats |
| Document | Data Architecture and Integrity |
| Version | 1.0 |
| Primary framework | Next.js App Router |
| Language | JavaScript |
| Validation | Zod |
| Status | Architecture documentation and verification |

## 2. Purpose

This document describes how Addis Eats obtains menu data, validates customer input, processes orders, associates orders with users, and handles data-related errors.

It identifies the data sources, validation rules, integrity requirements, and limitations of the current storage implementation.

## 3. Data Architecture

### 3.1 Menu Data

The application retrieves menu information from an external backend API.

Configured menu endpoints include:

- `https://addis-eats-backend.onrender.com/menu/`
- `https://addis-eats-backend.onrender.com/menu/specials`

Menu records include fields such as:

- `id`
- `slug`
- `nameEn`
- `nameAm`
- `category`
- `priceETB`
- `spiceLevel`
- `isFasting`
- `isSpecial`
- `description`
- `ingredients`
- `servings`

The application uses this information to display dishes, filter categories, and present menu details.

Menu data obtained from the external API is distinct from locally managed order data.

### 3.2 Order Data

Order-related functionality is implemented through the following files:

| File | Responsibility |
|---|---|
| `src/lib/db.js` | Data-access and order-storage functions |
| `src/lib/schema.js` | Order validation schema |
| `src/app/actions.js` | Order placement and cancellation actions |
| `src/app/api/orders/route.js` | Order API endpoint |
| `src/app/(pages)/checkout/CheckoutForm.jsx` | Checkout form |
| `src/app/orders/page.js` | Orders page |
| `src/app/orders/OrderTable.jsx` | Order table interface |

The development implementation has used in-memory mock order storage.

In-memory storage is suitable for demonstrations and development, but it is not durable production persistence. Records held only in process memory can disappear when the process restarts, and different application instances may not share the same records.

**Storage limitation:** Do not describe order data as permanently stored in a database unless a persistent database is actually configured and used.

## 4. Order Data Model

The following describes the principal order attributes used or expected by the application. Confirm the exact fields and types against `src/lib/db.js` and `src/lib/schema.js`.

| Field | Purpose |
|---|---|
| `id` | Identifies an order |
| `userId` | Associates an order with its owner |
| `name` | Customer name |
| `phone` | Customer telephone number |
| `email` | Customer email address |
| `dishId` | Optional dish identifier |
| `quantity` | Requested quantity |
| `subcity` | Delivery subcity |
| `address` | Delivery address |
| `notes` | Additional customer instructions |
| `paymentMethod` | Selected payment method |
| `status` | Order-processing state |

The actual stored fields may differ. The source implementation is authoritative.

## 5. Input Validation

Order input is validated through the Zod schema in `src/lib/schema.js`.

Known validation rules include:

- Customer name must contain at least two characters.
- Ethiopian phone numbers must match the configured format.
- Email addresses must satisfy email validation.
- Quantity must be at least one, with a default of one where configured.
- Notes are limited to 200 characters.
- Subcity, address, and payment method are validated according to the schema.

The phone-number pattern used in the documented implementation is:

`^(09|\+2519)\d{8}$`

Validation must occur on the server before untrusted input is used to create or modify an order.

Client-side validation may improve usability but must not replace server-side validation.

## 6. Order Lifecycle

The primary order-processing flow is:

1. The customer selects dishes and prepares a cart.
2. The customer opens checkout.
3. The customer submits contact, delivery, and payment-method information.
4. The server validates the submitted data.
5. The application creates an order using its configured data-access functions.
6. The order is associated with the authenticated user when authentication is available and verified.
7. The application updates the relevant order view or revalidates the affected route.
8. The customer or authorized staff member views the order status.

The actual implementation must be checked to ensure that every step occurs in this order and that failed operations do not create unintended records.

## 7. Data Integrity and Authorization

The following requirements apply to order operations.

### Order Ownership

Every private order must be associated with its owner's authenticated user ID.

When retrieving orders, the application must filter by the current user's ID.

When cancelling an order, the server must verify that the authenticated user owns the requested order.

### Input Integrity

The server must reject invalid fields, malformed requests, and unsupported values.

### Order State

Order-status transitions must follow explicitly defined business rules. Cancellation must not be allowed when the order has reached a state in which cancellation is prohibited.

### Persistence

If a persistent database is introduced, the application should enforce appropriate primary keys, foreign keys, uniqueness constraints, and transactions where required.

These database controls must not be claimed as implemented while order storage remains in memory.

## 8. Data Testing

| Test ID | Scenario | Expected result | Actual result |
|---|---|---|---|
| DATA-01 | Invalid order input | Validation errors are returned | [Record result] |
| DATA-02 | Missing order | Appropriate not-found response | [Record result] |
| DATA-03 | Cross-user order access | Unauthorized access is denied | [Record result] |
| DATA-04 | Invalid quantity | Order is rejected | [Record result] |
| DATA-05 | Order cancellation | Only authorized, eligible orders are cancelled | [Record result] |
| DATA-06 | Storage restart | Persistence behavior is documented accurately | [Record result] |

Record each test's status as `PASS`, `FAIL`, or `NOT RUN`.

## 9. Privacy and Data Protection

Order records may contain personal information, including customer names, phone numbers, email addresses, and delivery addresses.

The application should:

- Restrict private order access to authorized users and staff.
- Avoid logging unnecessary personal information.
- Keep secrets out of source control.
- Avoid exposing private order data in API responses.
- Define appropriate data retention and deletion behavior.
- Use secure, access-controlled storage for production records.

## 10. Known Limitations

The development implementation has used mock in-memory order storage. Consequently, durable persistence, recovery after process restarts, and consistency across multiple application instances must not be assumed.

The data-access implementation should be reviewed before deployment to verify that authentication, ownership checks, validation, and storage behavior match this document.

## 11. Conclusion

The data architecture separates external menu retrieval from order processing.

The application uses server-side validation to support correct order submission, while order ownership and storage durability remain critical verification requirements.

This document should be updated whenever the underlying data model, storage technology, or order-processing workflow changes.