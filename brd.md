# TradeBook: Business Requirements Document (BRD)

|                       |                                                                  |
| --------------------- | ---------------------------------------------------------------- |
| **Product**           | TradeBook: invoices, receipts and sales ledger for small traders |
| **Document version**  | 1.0 (Draft for review)                                           |
| **Date**              | 14 October 2026                                                  |
| **Owner**             | [Product owner name]                                             |
| **Related documents** | `prd.md` (Product Requirements), `scope.md` (Scope Statement)    |

**Status legend used in this document**

- **Implemented**: present in the code base reviewed.
- **Implemented (unverified)**: delivered as a code patch (cash-available checks, seller-quoted purchase pricing, clickable overdue banner, standalone dark-mode toggle) that has not yet been tested in a browser.
- **Gap**: required by the business but not yet working or not yet built.

---

## 1. Executive Summary

TradeBook is a browser-based sales ledger and light back-office tool for small traders in Nigeria. A trader can issue professional invoices and receipts, record payments, see who owes them money, send reminders over WhatsApp, track goods bought and sold, lend money to customers with controlled interest, and (optionally) use invoices to raise working capital through invoice financing.

The product needs no server, no sign-up and no monthly cost. Everything runs in the browser and is saved on the user's own device, which keeps it cheap to deliver and easy to adopt on a phone.

## 2. Business Context and Problem Statement

Many small traders record sales in notebooks, phone notes or WhatsApp chats. The following problems are **hypotheses to be validated** through trader interviews:

1. **No professional paperwork.** Customers, especially businesses, expect a numbered invoice or receipt with the seller's details and payment instructions.
2. **No clear view of money owed.** Traders cannot see at a glance who has paid, who is late, and how much is waiting to be collected.
3. **Slow, awkward collection.** Reminders are sent ad hoc and without the invoice details.
4. **Informal lending and credit.** Money lent to customers is tracked from memory, with no interest schedule, no reminders and no recovery rule.
5. **Weak purchasing control.** Goods are bought without checking available cash, and profit per product is unknown.
6. **Limited access to working capital.** Unpaid invoices tie up cash, and there is no structured way to record financing against them.

## 3. Business Objectives and Success Measures

Targets below are **proposed** and should be baselined during a pilot.

| ID   | Objective                                           | Proposed success measure                                                              |
| ---- | --------------------------------------------------- | ------------------------------------------------------------------------------------- |
| BO-1 | Give traders professional, consistent documents     | A new invoice can be created and sent in under 2 minutes                              |
| BO-2 | Give traders a clear view of cash and receivables   | Dashboard shows total sales, money received and money owed without manual calculation |
| BO-3 | Speed up collection of late payments                | Every overdue invoice can be reminded in one tap                                      |
| BO-4 | Keep lending controlled and traceable               | No loan can be issued for more than the cash available                                |
| BO-5 | Improve purchasing discipline and profit visibility | No purchase can be made without enough cash; profit shown per product and overall     |
| BO-6 | Support access to working capital                   | Financed invoices carry advance, fee and settlement details end to end                |
| BO-7 | Keep cost and effort of adoption low                | Runs on a phone browser with no installation, server or subscription                  |
| BO-8 | Let traders own and move their data                 | One-step backup, restore and CSV export                                               |

## 4. Stakeholders

| Stakeholder                               | Interest                                          | Influence       |
| ----------------------------------------- | ------------------------------------------------- | --------------- |
| Business owner / trader (primary user)    | Faster paperwork, collection, profit visibility   | High            |
| Sales attendant / staff                   | Quick document creation and payment recording     | Medium          |
| Customers / clients                       | Clear invoices, receipts and payment instructions | Medium          |
| Financier / factoring partner             | Accurate invoice, advance and settlement data     | Medium          |
| Accountant / bookkeeper                   | Exportable, consistent records                    | Low to medium   |
| Product owner and developer               | Delivery, maintainability, roadmap                | High            |
| Regulators and tax authorities (indirect) | Lending conduct, invoicing and tax rules          | High (external) |

## 5. Scope Summary

In scope: documents, ledger, payments, clients, loans, cash-available checks, purchases with seller-quoted prices, stock, profit and loss, invoice financing, business settings, backup and export, responsive and dark-mode interface. Out of scope: user accounts, multi-device sync, real bank or payment integrations, tax filing, payroll and multi-currency. See `scope.md` for the full statement.

## 6. Business Requirements

| ID    | Business requirement                                                                                                                                                                                                                           | Priority | Objective  | Status                                                                                                           |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------- | ---------------------------------------------------------------------------------------------------------------- |
| BR-01 | Issue sequentially numbered invoices (INV-0001) and receipts (RCT-0001) carrying the business's name, contact details, logo, signature and payment details                                                                                     | Must     | BO-1       | Implemented                                                                                                      |
| BR-02 | Record full and part payments against an invoice and automatically issue a linked receipt                                                                                                                                                      | Must     | BO-2, BO-3 | Implemented                                                                                                      |
| BR-03 | Keep a sales ledger showing each document's status (Draft, Sent, Viewed, Part paid, Overdue, Paid) with search and filters                                                                                                                     | Must     | BO-2       | Implemented                                                                                                      |
| BR-04 | Show totals for sales, money received, money still owed and document count, plus the last 7 days of sales                                                                                                                                      | Must     | BO-2       | Implemented                                                                                                      |
| BR-05 | Maintain a client directory that auto-fills repeat customers and shows billing history and account balance                                                                                                                                     | Should   | BO-1, BO-2 | Implemented                                                                                                      |
| BR-06 | Deliver documents by print, PDF download, WhatsApp, email or copied message                                                                                                                                                                    | Must     | BO-1       | Implemented, except PDF (see BR-19)                                                                              |
| BR-07 | Send a payment reminder for any unpaid invoice and warn the owner when invoices are overdue                                                                                                                                                    | Must     | BO-3       | Implemented                                                                                                      |
| BR-08 | Record loans to clients with simple interest added every minute, reminders, repayments, and automatic recovery from the client's account at the due date                                                                                       | Should   | BO-4       | Implemented                                                                                                      |
| BR-09 | Refuse to issue a loan larger than the cash available                                                                                                                                                                                          | Must     | BO-4       | Implemented (unverified)                                                                                         |
| BR-10 | Refuse any purchase larger than the cash available                                                                                                                                                                                             | Must     | BO-5       | Implemented (unverified)                                                                                         |
| BR-11 | The buyer cannot choose the purchase price. A seller quotes the price based on the item (cheap goods at normal Nigerian market prices, expensive goods at high prices) and the buyer only enters product, quantity, profit percentage and date | Must     | BO-5       | Implemented (unverified)                                                                                         |
| BR-12 | Track stock and average cost per product, and derive the selling price from the owner's profit percentage                                                                                                                                      | Should   | BO-5       | Implemented                                                                                                      |
| BR-13 | Produce a profit and loss view (sales, cost of goods sold, expenses, gross and net profit, profit by product) for selectable periods                                                                                                           | Should   | BO-5       | Implemented                                                                                                      |
| BR-14 | Record invoice financing: status, advance rate, drawdown date, discount fee, financier details, notice of assignment, and the split of each settlement                                                                                         | Could    | BO-6       | Implemented                                                                                                      |
| BR-15 | Flag receivables risk: aging buckets, client concentration limit, recourse buy-back and bad-debt-protection marker                                                                                                                             | Could    | BO-6       | Implemented                                                                                                      |
| BR-16 | Let the owner set brand colour, default terms, default VAT and an online payment link                                                                                                                                                          | Should   | BO-1       | Implemented                                                                                                      |
| BR-17 | Provide backup, restore and CSV export of the ledger                                                                                                                                                                                           | Must     | BO-8       | Implemented                                                                                                      |
| BR-18 | Work on phones and desktops, in light and dark mode, and keep working without a network once loaded                                                                                                                                            | Must     | BO-7       | Implemented (unverified for dark-mode toggle)                                                                    |
| BR-19 | Generate a downloadable A4 PDF of any document                                                                                                                                                                                                 | Must     | BO-1       | **Gap**: the PDF library is not referenced in `index.html`, so the button falls back to a message advising Print |
| BR-20 | Open an overdue invoice directly from the overdue banner to see its full content                                                                                                                                                               | Should   | BO-3       | Implemented (unverified)                                                                                         |

## 7. Business Rules

| ID     | Rule                                                                                                                                                                                                                                            |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BRL-01 | **Document total** = subtotal, less discount % of subtotal, plus VAT % of the discounted amount.                                                                                                                                                |
| BRL-02 | A receipt created on its own is treated as a paid sale. A receipt created by recording a payment is linked to its invoice and is **not** counted again in sales totals.                                                                         |
| BRL-03 | An invoice is **paid** when its balance is under half a kobo. It is **overdue** when unpaid and its due date is before today. It is **part paid** when some but not all of it has been received.                                                |
| BRL-04 | **Loan interest** (simple) = principal x rate % x number of full minutes elapsed. The default rate is 0.01% of principal per minute. Reminders are produced each minute while the app is open.                                                  |
| BRL-05 | When a loan passes its due date, the remaining balance is taken from the client's TradeBook account. The account can go negative until the client adds funds. This is a bookkeeping entry only, not a bank debit.                               |
| BRL-06 | **Cash available** = money added by the owner + payments received on invoices and standalone receipts + loan repayments + positive client account balances - negative client account balances - loans given (principal) - purchases - expenses. |
| BRL-07 | A loan or purchase is refused if its amount exceeds cash available.                                                                                                                                                                             |
| BRL-08 | **Purchase price** is supplied by a seller. For a given item the quote is the same for the whole calendar day, so asking again or changing the date cannot produce a cheaper price.                                                             |
| BRL-09 | **Average cost** is weighted across all purchases of a product. **Selling price** = average cost x (1 + profit %). **Stock** = quantity bought less quantity sold on invoices (matched by product name).                                        |
| BRL-10 | **Financing advance** = invoice total x advance rate %. **Accrued fee** = advance x fee % per 30 days x days outstanding / 30.                                                                                                                  |
| BRL-11 | On settlement of a financed invoice, the payment is split into advance repaid to the lender, fee, and reserve released to the trader.                                                                                                           |
| BRL-12 | **Concentration** = a client's share of all outstanding invoice balances. Above the limit (default 30%) the invoice is flagged.                                                                                                                 |
| BRL-13 | A financed, unpaid invoice that is 90 or more days past due (configurable) is flagged for buy-back.                                                                                                                                             |
| BRL-14 | Aging buckets: Current, 0-30, 31-60, 61-90 and 90+ days past due.                                                                                                                                                                               |

## 8. Assumptions, Constraints and Dependencies

**Assumptions**

- Each business uses one browser profile on one device as its system of record.
- The currency is the Nigerian naira only.
- Seller prices are simulated from a built-in price table and are guides, not live market quotes.
- Users understand that the loan "auto-debit" is an internal ledger entry.

**Constraints**

- No backend: all data lives in the browser's local storage, limited to a few megabytes.
- No authentication: anyone with access to the device and browser profile can see the data.
- Reminders and interest events only run while the page is open.

**Dependencies**

- Browser features: local storage, Notification API, File System Access API (optional), clipboard.
- Third-party libraries loaded from a CDN: QR code generator (loaded) and an HTML-to-PDF library (not currently loaded).
- WhatsApp web links and the device's default mail client for sharing.

## 9. Risks and Mitigations

| ID   | Risk                                                                                                                                                             | Impact | Mitigation                                                                                               |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| R-01 | Data loss if the user clears browser data or loses the device                                                                                                    | High   | Prominent backup and restore; prompt for periodic backups; consider optional cloud sync in a later phase |
| R-02 | No login, so data is exposed on shared devices                                                                                                                   | Medium | Add optional PIN lock; advise use of a personal device                                                   |
| R-03 | Default loan rate of 0.01% per minute equals 14.4% per day (about 5,256% a year, simple), which is extremely high and may breach lending rules or harm customers | High   | Obtain legal advice; add rate caps and clear disclosure; review the default                              |
| R-04 | Lending and automatic recovery rules differ by state and regulator                                                                                               | High   | Legal review before real-customer use; keep the in-app warning                                           |
| R-05 | Floating-point arithmetic for money can cause small rounding differences                                                                                         | Medium | Move to whole-kobo integers in a later release                                                           |
| R-06 | Users mistake simulated seller prices for real market quotes                                                                                                     | Medium | Label prices as indicative and keep the price table editable                                             |
| R-07 | Reminders miss events when the page is closed                                                                                                                    | Medium | Clear on-screen notice (already present); consider a server-side scheduler in a later phase              |
| R-08 | CDN failure or blocked scripts disable QR codes or PDF                                                                                                           | Medium | Bundle libraries locally; fix the missing PDF library                                                    |
| R-09 | Invoice-financing terms (assignment, recourse) have legal effect                                                                                                 | Medium | Treat as a record-keeping aid only; legal review of the assignment notice wording                        |
| R-10 | Tax invoicing rules (VAT, e-invoicing) may require fields the product does not capture                                                                           | Medium | Confirm requirements with a tax advisor before claiming compliance                                       |

## 10. Compliance Considerations

This section is a prompt for specialist review, not legal advice. Before use with real customers, confirm requirements for: money-lending and digital-lending conduct, interest disclosure and recovery practices; consumer data protection and privacy (customer names, phone numbers and addresses are stored); VAT and electronic invoicing; and the legal effect of notices of assignment in invoice financing.

## 11. Expected Benefits and Cost

- **Benefits:** faster, more professional paperwork; faster collection; clearer cash position; fewer unplanned purchases and loans; visible profit per product; documented financing trail.
- **Cost:** no server, licence or recurring hosting cost. Effort is limited to development, testing, legal review and support.

## 12. Approval

| Name | Role             | Signature | Date |
| ---- | ---------------- | --------- | ---- |
|      | Product owner    |           |      |
|      | Business sponsor |           |      |
|      | Technical lead   |           |      |

## Glossary

- **Advance rate:** share of an invoice value a financier pays upfront.
- **Aging:** grouping of unpaid invoices by how many days late they are.
- **Bad debt protection (BDP):** credit insurance marker on an invoice.
- **Concentration limit:** maximum share of receivables owed by one client.
- **Net 30:** payment due 30 days after the invoice date.
- **Notice of Assignment:** statement that payment of an invoice must go to a financier.
- **Recourse buy-back:** obligation to repurchase a financed invoice that stays unpaid too long.
