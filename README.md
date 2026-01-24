# POC Order Service

This is a POC (Proof of Concept) repository for testing auto-remediation capabilities.

## Purpose

This service simulates an order management service that can experience various issues:
- Database connection timeouts
- Inventory check failures
- Order processing errors
- Service unavailability

## Structure

```
poc-order-service/
├── src/
│   └── index.js      # Main service code
├── package.json      # Dependencies
└── README.md         # This file
```

## Running

```bash
npm install
npm start
```

## Endpoints

- `POST /api/v1/orders` - Create a new order
- `GET /api/v1/orders/:orderId` - Get order status
- `DELETE /api/v1/orders/:orderId` - Delete an order
- `GET /health` - Health check

## Auto-Remediation

This repository is used to test automated incident remediation:
1. When incidents are detected, GitHub issues are created here
2. Issue Agent analyzes the code and proposes fixes
3. PR Review Agent reviews and approves fixes
