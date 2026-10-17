# TradeBook: Product Requirements Document (PRD)

|                       |                        |
| --------------------- | ---------------------- |
| **Product**           | TradeBook              |
| **Version**           | 1.0 (Draft for review) |
| **Date**              | 14 October 2026        |
| **Owner**             | [Product owner name]   |
| **Related documents** | `brd.md`, `scope.md`   |

**Priority:** P0 = must have, P1 = should have, P2 = could have.
**Status:** Done = in the reviewed code; Unverified = delivered as a patch, not yet tested in a browser; Gap = not working or not built.

---

## 1. Product Overview

**Vision.** A trader should be able to run the paperwork and money side of a small business from a phone, with no accounting knowledge, no sign-up and no running cost.

**Summary.** TradeBook is a single-page web app (HTML, CSS and JavaScript, no backend). It combines a sales ledger, an invoice and receipt maker, a client directory, a lending tracker, a purchasing and stock module with seller-quoted prices, a profit and loss view, and an optional invoice-financing add-on. All data is stored in the user's browser.

## 2. Goals and Non-Goals

**Goals**

1. Produce a professional invoice or receipt in under two minutes.
2. Show money received and money owed at a glance, and make chasing late payments one tap.
3. Stop the owner from lending or buying more than the cash available.
4. Make purchase pricing come from a seller, not from the buyer.
5. Show profit per product and overall.
6. Keep data portable through backup, restore and CSV export.

**Non-goals (this version)**

- User accounts, roles and permissions.
- Multi-device sync or a cloud database.
- Real bank, card or mobile-money integration.
- Tax filing or statutory e-invoicing.
- Multi-currency and multi-language.

## 3. Users and Personas

| Persona                       | Description                                                                 | Key needs                                                                   |
| ----------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Provisions shop owner**     | Sells foodstuff and household goods, mostly on phone, many repeat customers | Fast invoices and receipts, WhatsApp sharing, who owes me, stock and profit |
| **Wholesaler / small lender** | Sells on credit and sometimes lends cash to customers                       | Overdue tracking, reminders, loan interest and recovery rules, cash check   |
| **Growing SME**               | Has larger invoices to corporate customers and uses invoice financing       | Notice of assignment, advance and fee tracking, aging, concentration limits |

## 4. Architecture and Technology

| Item         | Detail                                                                                                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Type         | Static, client-side web app, no server                                                                                                                                            |
| Pages        | `index.html` with five views switched in JavaScript, plus Purchases and Profit & loss views injected by `purchases.js`                                                            |
| Styles       | `style.css` (CSS variables, light and dark themes, print styles, mobile card tables under 700 px)                                                                                 |
| Logic        | `script.js` (core), `financing.js` (invoice financing add-on), `seller.js` (seller price engine), `purchases.js` (purchases, stock, P&L), `darkmode.js` (standalone theme toggle) |
| Storage      | Browser `localStorage`: key `tradebook.v1` (all data), `tradebook.ui` (current view and draft), `tradebook.theme` (light or dark)                                                 |
| Libraries    | `qrcode-generator` from cdnjs (loaded); `html2pdf` (expected by the code, **not loaded** by `index.html`)                                                                         |
| Browser APIs | Notifications, File System Access (optional, for PDF save dialog), Clipboard, `matchMedia`                                                                                        |

## 5. Functional Requirements

### 5.1 Documents (invoice and receipt editor)

| ID     | Requirement                                                                                                       | P   | Acceptance criteria                                                                                          | Status                                                                             |
| ------ | ----------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| FR-101 | Choose document type Invoice or Receipt                                                                           | P0  | Switching type updates the preview heading; due date and status hide for receipts                            | Done                                                                               |
| FR-102 | Capture customer name, phone, email, address, date, payment terms, due date                                       | P0  | Choosing Net 7/15/30/60/90 sets the due date from the date; editing the due date sets terms to Custom        | Done                                                                               |
| FR-103 | Add, edit and remove item lines (description, quantity, unit price)                                               | P0  | Preview updates on every keystroke; removing the last line leaves one blank line                             | Done                                                                               |
| FR-104 | Apply a discount % then VAT %                                                                                     | P0  | Totals follow BRL-01; default VAT comes from settings                                                        | Done                                                                               |
| FR-105 | Live preview styled as a paper document with logo, signature, payment details, notes and a PAID or RECEIVED stamp | P0  | Stamp appears only when fully paid or on a linked part-payment receipt                                       | Done                                                                               |
| FR-106 | Save to ledger with an auto number (INV-0001, RCT-0001)                                                           | P0  | Saving requires a customer and at least one item with price and quantity; the number is assigned once        | Done                                                                               |
| FR-107 | Auto-fill customer phone, email and address from a saved client                                                   | P1  | Typing an existing client name fills the other fields                                                        | Done                                                                               |
| FR-108 | Print the document                                                                                                | P0  | Print output shows only the paper preview                                                                    | Done                                                                               |
| FR-109 | Download as A4 PDF                                                                                                | P0  | A PDF file downloads, with a save dialog where supported                                                     | **Gap**: PDF library not loaded; the user sees a "PDF tool could not load" message |
| FR-110 | Share via WhatsApp, email or copied text                                                                          | P0  | WhatsApp converts a leading 0 to 234; a Draft invoice becomes Sent; missing phone copies the message instead | Done                                                                               |
| FR-111 | Show profit or loss on stocked items in the current sale                                                          | P2  | Hint appears under the form when items match stocked products                                                | Done                                                                               |

### 5.2 Ledger and Dashboard

| ID     | Requirement                                                                          | P   | Acceptance criteria                                                                                                                | Status     |
| ------ | ------------------------------------------------------------------------------------ | --- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| FR-201 | Stat cards: total sales, money received, still owed, document count                  | P0  | Values follow BRL-02 and BRL-06 and refresh while the page is open                                                                 | Done       |
| FR-202 | 7-day sales bar chart                                                                | P1  | One bar per day, scaled to the maximum                                                                                             | Done       |
| FR-203 | "Money received" and "Still owed to you" lists                                       | P1  | Show the 8 latest items with totals                                                                                                | Done       |
| FR-204 | Searchable, filterable ledger table (All, Paid, Unpaid, Overdue, Invoices, Receipts) | P0  | Search matches customer or number                                                                                                  | Done       |
| FR-205 | Row actions: Open, Record payment, Remind, Delete                                    | P0  | Delete asks for confirmation                                                                                                       | Done       |
| FR-206 | Overdue banner listing each overdue invoice as a button that opens it                | P1  | Clicking opens the invoice in the editor; "Show overdue" opens the invoice if only one, otherwise filters and scrolls to the table | Unverified |
| FR-207 | Export ledger to CSV (extended columns when financing is present)                    | P1  | File downloads with all documents                                                                                                  | Done       |
| FR-208 | Cash available bar with an "Add money to business" action                            | P0  | Shows the figure from BRL-06; adding money updates it everywhere                                                                   | Unverified |

### 5.3 Payments and Receipts

| ID     | Requirement                                        | P   | Acceptance criteria                                                  | Status |
| ------ | -------------------------------------------------- | --- | -------------------------------------------------------------------- | ------ |
| FR-301 | Record a full or part payment                      | P0  | Amount is capped at the balance; zero or negative is rejected        | Done   |
| FR-302 | Auto-issue a linked receipt per payment            | P0  | Receipt shows invoice reference, amount, balance remaining and notes | Done   |
| FR-303 | Invoice becomes Paid when the balance reaches zero | P0  | Status tag and stamp update                                          | Done   |
| FR-304 | WhatsApp reminder with balance and due date        | P0  | Message includes payment details when unpaid                         | Done   |

### 5.4 Clients

| ID     | Requirement                                                                            | P   | Acceptance criteria                                                   | Status |
| ------ | -------------------------------------------------------------------------------------- | --- | --------------------------------------------------------------------- | ------ |
| FR-401 | Clients are created or updated when a document is saved                                | P0  | No duplicate by case-insensitive name                                 | Done   |
| FR-402 | Client table: contact, number of documents, total billed, amount owed, account balance | P1  | "Owes you" includes invoices, open loans and negative account balance | Done   |
| FR-403 | Add funds to a client account                                                          | P1  | Account balance rises and the amount counts as money received         | Done   |
| FR-404 | New invoice and History shortcuts                                                      | P2  | New invoice pre-fills the client; History filters the ledger          | Done   |

### 5.5 Loans and Cash Control

| ID     | Requirement                                                                       | P   | Acceptance criteria                                                                        | Status     |
| ------ | --------------------------------------------------------------------------------- | --- | ------------------------------------------------------------------------------------------ | ---------- |
| FR-501 | Create a loan with client, phone, amount, interest % per minute and days to repay | P1  | All fields validated; interest default 0.01%, days default 30                              | Done       |
| FR-502 | **Refuse a loan larger than cash available**                                      | P0  | A message states the funds held and the amount wanted; no loan is recorded                 | Unverified |
| FR-503 | Accrue simple interest each full minute (BRL-04)                                  | P1  | Interest and balance update live on the Loans view                                         | Done       |
| FR-504 | Minute reminders as a toast, an on-page feed and an optional browser notification | P1  | Can be switched off; feed keeps the latest 25                                              | Done       |
| FR-505 | "Send to client" and "Remind client" via WhatsApp                                 | P1  | Message includes rate, amount added and balance                                            | Done       |
| FR-506 | Record repayment, settle in full, delete                                          | P1  | Repayments count as money received; deleting an auto-debited loan returns the amount taken | Done       |
| FR-507 | Auto-debit at the due date (BRL-05)                                               | P1  | Loan closes as "Auto-debited"; client account may go negative; a notification shows        | Done       |
| FR-508 | Disclose the risk of high interest and local lending rules                        | P1  | Hint text shows per-hour and per-day rates and advises checking rules                      | Done       |

### 5.6 Purchases, Stock and Seller Pricing

| ID     | Requirement                                                                                              | P   | Acceptance criteria                                                                                                                                                                                  | Status     |
| ------ | -------------------------------------------------------------------------------------------------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| FR-601 | Buyer enters product, quantity, profit % and date only; there is **no price field**                      | P0  | The form has no cost input                                                                                                                                                                           | Unverified |
| FR-602 | "Ask seller for price" returns a seller name and unit price based on the item                            | P0  | Cheap goods (stationery, small items) return low prices; expensive goods (electronics, vehicles, property) return high prices; unknown items get a general price, higher for cartons, bales and bags | Unverified |
| FR-603 | A quote is stable for the same item on the same day                                                      | P0  | Re-asking, or changing the purchase date, returns the same price                                                                                                                                     | Unverified |
| FR-604 | Quote card shows unit price, total, resulting selling price and available funds, with Accept and Decline | P0  | Changing product or quantity discards the quote                                                                                                                                                      | Unverified |
| FR-605 | **Refuse a purchase larger than cash available**                                                         | P0  | Quote card states the shortfall; accepting is blocked                                                                                                                                                | Unverified |
| FR-606 | Stock on hand with average cost, profit %, selling price and stock value                                 | P1  | Stock reduces automatically when invoices include the product                                                                                                                                        | Done       |
| FR-607 | Change profit % per product                                                                              | P1  | Selling price updates                                                                                                                                                                                | Done       |
| FR-608 | Purchase history with delete                                                                             | P1  | Deletion confirms and changes stock and costs                                                                                                                                                        | Done       |
| FR-609 | Product suggestions and auto-filled price on the invoice editor                                          | P2  | Selecting a stocked product fills the selling price when empty                                                                                                                                       | Done       |

### 5.7 Profit and Loss and Expenses

| ID     | Requirement                                                                                | P   | Acceptance criteria                     | Status |
| ------ | ------------------------------------------------------------------------------------------ | --- | --------------------------------------- | ------ |
| FR-701 | Period selector: This month, Last 30 days, This year, All time                             | P1  | All figures respect the period          | Done   |
| FR-702 | Show sales (before VAT), cost of goods sold, gross profit, expenses and net profit or loss | P1  | Loss is shown in red                    | Done   |
| FR-703 | Profit by product and "items with no cost recorded" notice                                 | P1  | Unmatched items are grouped and flagged | Done   |
| FR-704 | Add and delete expenses                                                                    | P1  | Expenses reduce cash available          | Done   |

### 5.8 Invoice Financing

| ID     | Requirement                                                                                                                      | P   | Acceptance criteria                                             | Status |
| ------ | -------------------------------------------------------------------------------------------------------------------------------- | --- | --------------------------------------------------------------- | ------ |
| FR-801 | Per-invoice financing status (Eligible, Ineligible, Financed), advance rate, drawdown date, fee, financier details and reference | P2  | Marking Financed sets the drawdown date to today if empty       | Done   |
| FR-802 | Notice of Assignment and "pay to financier" block on the document                                                                | P2  | Appears only when Disclosed is ticked and the invoice is unpaid | Done   |
| FR-803 | QR code on financed invoices                                                                                                     | P2  | Encodes number, financier reference, total and due date         | Done   |
| FR-804 | Settlement split into advance, fee and reserve                                                                                   | P2  | Shown on the receipt                                            | Done   |
| FR-805 | Aging buckets, advances outstanding and accrued fees summary                                                                     | P2  | Updates with the ledger                                         | Done   |
| FR-806 | Flags: over concentration limit, buy-back due                                                                                    | P2  | Defaults 30% and 90 days, editable in settings                  | Done   |
| FR-807 | Bad debt protection tick per invoice                                                                                             | P2  | Saved and exported                                              | Done   |

### 5.9 Business Settings

| ID     | Requirement                                                                                            | P   | Acceptance criteria                          | Status |
| ------ | ------------------------------------------------------------------------------------------------------ | --- | -------------------------------------------- | ------ |
| FR-901 | Business name, phone, email, address, payment details, default VAT, default terms, online payment link | P0  | Appear on all new previews                   | Done   |
| FR-902 | Logo and signature upload (images resized and stored as data URLs)                                     | P1  | Logo max 320 px, signature 360 px; removable | Done   |
| FR-903 | Brand colour recolours the interface, documents and favicon                                            | P2  | Works in light and dark mode                 | Done   |
| FR-904 | Financing defaults (financier, advance rate, fee, buy-back days, concentration limit)                  | P2  | Pre-fill new invoices                        | Done   |

### 5.10 Data Management

| ID      | Requirement                                     | P   | Acceptance criteria                                               | Status |
| ------- | ----------------------------------------------- | --- | ----------------------------------------------------------------- | ------ |
| FR-1001 | Download a JSON backup of all data              | P0  | File named `tradebook-backup-YYYY-MM-DD.json`                     | Done   |
| FR-1002 | Restore from backup                             | P0  | Validates the file, asks for confirmation, replaces data, reloads | Done   |
| FR-1003 | Warn if saving fails (for example storage full) | P1  | Toast "Could not save in this browser"                            | Done   |

### 5.11 Appearance

| ID      | Requirement                                                       | P   | Acceptance criteria                                                                     | Status                                                     |
| ------- | ----------------------------------------------------------------- | --- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| FR-1101 | Light and dark mode, remembered, defaulting to the device setting | P1  | Built-in header toggle in `script.js` and a standalone floating toggle in `darkmode.js` | Unverified (the header toggle was reported as not working) |
| FR-1102 | Responsive layout; tables become cards under 700 px               | P0  | No horizontal scrolling of the page                                                     | Done                                                       |
| FR-1103 | Respect reduced-motion and show visible keyboard focus            | P1  | Animations disabled under the reduced-motion setting                                    | Done                                                       |

## 6. Business Rules

All calculations (totals, overdue, interest, cash available, stock, selling price, financing) are defined in `brd.md`, section 7, rules BRL-01 to BRL-14. Engineering and test cases should treat that section as the source of truth.

## 7. Data Model (stored in `tradebook.v1`)

| Field                         | Content                                                                                                                                                                                                                           |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `settings`                    | Business details, defaults, brand colour, images, financing defaults                                                                                                                                                              |
| `docs[]`                      | Invoices and receipts: id, type, number, dates, terms, customer fields, `items[]` (description, quantity, price), discount, VAT, notes, status, `pays[]`, `ref`/`bal` (for payment receipts), `fin` (financing), `split`, `payer` |
| `clients[]`                   | name, phone, email, address, `acct` (account balance)                                                                                                                                                                             |
| `loans[]`                     | client, principal, rate, period, start, due, `reps[]`, `closed`, `forced`, `taken`, reminder counter                                                                                                                              |
| `feed[]`, `rem`               | Reminder log and the reminder on/off switch                                                                                                                                                                                       |
| `n`                           | Document counters `{INV, RCT}`                                                                                                                                                                                                    |
| `buys[]`, `prods{}`, `exps[]` | Purchases (seller, product, quantity, unit cost), product profit %, expenses                                                                                                                                                      |
| `cap[]`                       | Money the owner added to the business                                                                                                                                                                                             |

## 8. UX Requirements

- **Navigation:** Ledger, New document, Clients, Loans, Purchases, Profit & loss, My business, plus a theme toggle.
- **Feedback:** short toasts for actions; longer messages stay visible longer.
- **Confirmations:** delete, settle in full and restore always confirm.
- **Empty states:** every list explains what to do next; the Ledger offers sample data.
- **Money display:** naira with two decimals and thousands separators.

## 9. Non-Functional Requirements

| Area                 | Requirement                                                                                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Performance          | Interface responds instantly for up to a few thousand documents; clock tick every second must not cause visible lag                                                                  |
| Reliability          | Data written to local storage on every change; failure is reported                                                                                                                   |
| Security and privacy | All user-entered text is escaped before display; no data leaves the device except through links the user clicks (WhatsApp, email). No encryption or login (see risk R-02 in the BRD) |
| Accessibility        | Labelled controls, focus outlines, colour contrast in both themes                                                                                                                    |
| Compatibility        | Current Chrome, Edge, Safari and Firefox on Android, iOS and desktop                                                                                                                 |
| Offline              | Works offline after first load; QR codes and PDF need their libraries available                                                                                                      |
| Maintainability      | Add-ons extend core functions through wrappers; the file load order in `index.html` is a hard requirement                                                                            |

## 10. Integrations

| Integration                  | Use                          | Risk                                                 |
| ---------------------------- | ---------------------------- | ---------------------------------------------------- |
| WhatsApp web links (`wa.me`) | Send documents and reminders | Needs a valid phone number; the user must press send |
| `mailto:` links              | Send by email                | Depends on a default mail app                        |
| Notification API             | Interest and due-date alerts | Needs permission; only while the page is open        |
| `qrcode-generator` (CDN)     | QR on financed invoices      | Needs network on first load                          |
| `html2pdf`                   | PDF download                 | **Not loaded** in the current `index.html`           |

## 11. Release Plan

| Release           | Contents                                                                                                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1.0 (current)** | Everything in section 5, with items marked Unverified tested and the PDF gap closed                                                                                                                                             |
| **1.1 Hardening** | Fix PDF library and local copies of libraries; fix or retire the header dark-mode toggle; cap and review the default loan rate; label seller prices as indicative; integer-kobo money; automated tests for the rules in the BRD |
| **1.2 Safety**    | Optional PIN lock; scheduled backup reminders; audit trail for edits and deletes                                                                                                                                                |
| **2.0 Platform**  | Optional cloud sync and accounts, multi-user roles, server-side reminders, payment links with real payment status                                                                                                               |

## 12. Success Metrics (proposed)

- Median time to create and send an invoice: under 2 minutes.
- Share of overdue invoices reminded within 24 hours of becoming overdue.
- Share of users who download a backup within 30 days.
- Number of refused loans and purchases due to insufficient funds (a sign the control is working).
- Support requests about lost data or failed PDF downloads (target: none).

## 13. Known Issues and Open Questions

1. PDF download cannot work until `html2pdf` is added to `index.html`.
2. Dark-mode toggle in the header was reported as not working; a standalone toggle was provided. Root cause still needs a console check for a script error.
3. The patches for cash-available checks, seller pricing, overdue links and standalone dark mode need a full test pass.
4. Seller price ranges are rough assumptions and should be reviewed against current Nigerian market prices.
5. Should deleting a purchase or loan restore cash, as it does now, or be blocked once other records depend on it?
6. Should expenses also be blocked when cash is insufficient?
7. What is the right default loan rate and what caps does legal review require?

## Appendix: File Inventory

| File           | Purpose                                                          |
| -------------- | ---------------------------------------------------------------- |
| `index.html`   | Page structure and script loading order                          |
| `style.css`    | Themes, layout, print and responsive styles                      |
| `script.js`    | Core: documents, ledger, clients, loans, settings, backup, theme |
| `financing.js` | Invoice financing add-on (load after `script.js`)                |
| `seller.js`    | Seller price engine (load before `purchases.js`)                 |
| `purchases.js` | Purchases, stock, profit and loss, expenses                      |
| `darkmode.js`  | Standalone dark-mode toggle (load last)                          |
