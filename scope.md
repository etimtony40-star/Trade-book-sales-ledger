# TradeBook: Scope Statement

|                       |                                            |
| --------------------- | ------------------------------------------ |
| **Product**           | TradeBook                                  |
| **Version**           | 1.0 (Draft for review)                     |
| **Date**              | 14 October 2026                            |
| **Owner**             | [Product owner name]                       |
| **Related documents** | `brd.md` (why), `prd.md` (what, in detail) |

---

## 1. Purpose

This document defines what is and is not part of TradeBook version 1.0, so the owner, developers and testers share one understanding of the boundaries, and so changes can be judged against an agreed baseline.

## 2. Project Overview

TradeBook is a client-side web app that helps small traders in Nigeria issue invoices and receipts, track sales and debts, control lending and purchasing against available cash, see profit, and optionally record invoice financing. It runs in a browser, needs no server and stores data on the user's device.

## 3. In Scope

### 3.1 Documents and Ledger

- Invoice and receipt creation with sequential numbering, items, discount, VAT, terms, notes, logo and signature.
- Live document preview, print, copy message, WhatsApp and email sharing.
- PDF download (requires the missing PDF library to be added).
- Sales ledger with search, filters, statuses, overdue highlighting and an overdue banner that opens the overdue documents.
- Dashboard totals, 7-day chart, money received and money owed lists, CSV export.

### 3.2 Payments and Clients

- Full and part payment recording with an automatically issued, linked receipt.
- Payment reminders over WhatsApp.
- Client directory with auto-fill, billing history, amount owed and an account balance that can be funded.

### 3.3 Loans and Cash Control

- Loans with simple interest every minute, due date, repayments, settle in full and delete.
- Minute reminders (on-page, toast, optional browser notification) and WhatsApp reminders.
- Automatic recovery from the client's TradeBook account at the due date (a ledger entry only).
- **Cash available** figure, with an action to add money to the business.
- **Loans are refused when the amount is more than the cash available.**

### 3.4 Purchases, Stock and Pricing

- Purchases recorded by product, quantity, profit percentage and date.
- **The buyer cannot enter or edit the price.** A simulated seller quotes the price from a built-in table of Nigerian price ranges by item type: low for cheap goods such as stationery and provisions, high for electronics, vehicles, property and similar.
- Quotes are stable per item per calendar day; the buyer may accept or decline.
- **Purchases are refused when the total is more than the cash available.**
- Stock on hand, weighted average cost, profit percentage, selling price, stock value and purchase history.

### 3.5 Profit and Loss

- Sales, cost of goods sold, gross profit, expenses and net profit or loss by period, plus profit by product.
- Expense recording.

### 3.6 Invoice Financing (optional add-on)

- Per-invoice financing status, advance rate, drawdown date, discount fee, financier details and reference.
- Notice of Assignment, QR code, settlement split (advance, fee, reserve).
- Aging buckets, concentration limit flag, recourse buy-back flag, bad debt protection marker, financing defaults in settings, extended CSV export.

### 3.7 Settings, Data and Interface

- Business profile, payment details, default VAT and terms, online payment link, logo, signature and brand colour.
- JSON backup and restore.
- Responsive layout, print styles, light and dark mode (built-in header toggle and a standalone floating toggle).

## 4. Out of Scope

- User accounts, passwords, roles, multi-user access and audit logs.
- Cloud storage, multi-device sync and server-side processing.
- Real banking, card, USSD or mobile-money integration, and real payment confirmation.
- Real market price feeds or live supplier quotes (seller prices are simulated).
- Real debiting of a customer's bank account (the loan "auto-debit" is a bookkeeping entry).
- Automatic sending of WhatsApp, SMS or email messages (the user always presses send).
- Reminders and interest events while the app is closed.
- Statutory tax filing, e-invoicing integration and payroll.
- Multi-currency, multi-language, multi-branch and multi-warehouse support.
- Barcode scanning, supplier payments and returns or credit notes.
- Legal advice or certification of compliance with lending, tax or data-protection rules.

## 5. Deliverables

| Deliverable                    | Description                               |
| ------------------------------ | ----------------------------------------- |
| `index.html`                   | Application shell and script order        |
| `style.css`                    | Styling for light, dark, print and mobile |
| `script.js`                    | Core application logic                    |
| `financing.js`                 | Invoice financing add-on                  |
| `seller.js`                    | Seller price engine                       |
| `purchases.js`                 | Purchases, stock, profit and loss         |
| `darkmode.js`                  | Standalone dark-mode toggle               |
| `brd.md`, `prd.md`, `scope.md` | Requirements documentation                |

Required script order in `index.html`: `script.js`, QR library, `financing.js`, `seller.js`, `purchases.js`, `darkmode.js`.

## 6. Assumptions

1. One business uses one browser profile as its record.
2. Currency is the Nigerian naira.
3. Users have a modern browser (current Chrome, Edge, Safari or Firefox).
4. Seller prices are indicative and may differ from real prices.
5. Users accept that clearing browser data deletes records unless they have a backup.

## 7. Constraints

- No backend, so storage is limited by the browser (a few megabytes) and tied to one device.
- Money is calculated with standard JavaScript numbers.
- Third-party scripts come from public CDNs.
- The owner is responsible for legal and tax compliance of how the tool is used.

## 8. Dependencies

- Browser features: local storage, notifications, clipboard, optional File System Access.
- `qrcode-generator` library (loaded) and an HTML-to-PDF library (to be added).
- WhatsApp web links and a default mail client for sharing.

## 9. Acceptance Criteria for Version 1.0

Version 1.0 is accepted when all of the following are true:

1. Every Must (P0) requirement in `prd.md` passes testing.
2. A user can create an invoice, record a part payment, and see the receipt, balance, ledger status and dashboard totals update correctly.
3. An overdue invoice appears in the overdue banner and can be opened from it.
4. A loan larger than cash available is refused, and one within cash available is recorded.
5. A purchase has no editable price field; the seller's quote is shown; a purchase larger than cash available is refused; an accepted purchase updates stock and cash available.
6. The same item returns the same quote on the same day, and changing the purchase date does not change it.
7. A cheap item (for example a biro) returns a low price and an expensive item (for example a laptop) returns a high price.
8. PDF download works, or the PDF button is removed.
9. The dark-mode toggle switches themes, remembers the choice and shows no console errors on load.
10. Backup followed by restore returns the data exactly.
11. The app is usable on a 360 px wide phone screen and prints a clean document.

## 10. Scope Boundary Decisions

| Topic                                  | Decision                                                              |
| -------------------------------------- | --------------------------------------------------------------------- |
| Receipts from payments in sales totals | Excluded, to avoid counting a sale twice                              |
| Standalone receipts                    | Counted as paid sales                                                 |
| Quote variation                        | Same item, same day, same price; price may change on another day      |
| Expenses vs cash                       | Expenses reduce cash available but are not blocked when cash is short |
| Deleting purchases or loans            | Restores the cash they used; recorded as a known behaviour to review  |
| Interest                               | Simple interest only, per full minute                                 |
| Stock matching                         | By product name, ignoring capitalisation                              |

## 11. Change Control

1. Any new feature or change to the items above is raised as a written change request describing the need, effort and impact on the documents.
2. The product owner approves or rejects it. Approved changes update `scope.md`, then `prd.md` and `brd.md` where affected.
3. Items listed in section 4 are only added through this process.

## 12. Future Phases (not committed)

- **1.1 Hardening:** fix PDF, bundle libraries locally, integer-kobo money, automated tests, review loan rate defaults, label seller prices as indicative.
- **1.2 Safety:** PIN lock, backup reminders, audit trail.
- **2.0 Platform:** cloud sync and accounts, roles, server-side reminders, real payment links, live price sources.

## 13. Open Items

1. Add the PDF library to `index.html`, or remove the PDF button.
2. Diagnose why the header dark-mode toggle did not work (check the browser console for a script error).
3. Test the cash-available checks, seller pricing, overdue links and standalone dark-mode toggle.
4. Review the seller price table and the default loan rate with the business and legal advisers.
5. Decide whether expenses should also be blocked when cash is insufficient.
