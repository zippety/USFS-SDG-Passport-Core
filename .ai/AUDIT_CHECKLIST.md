# ✅ AUDIT CHECKLIST (CRA Compliance)

> **Purpose:** Ensure all operations are audit-ready. Check these before major financial actions.

---

## 📋 BEFORE PAYING ANYONE

- [ ] Board approved current year budget?
- [ ] Payment is in approved budget line?
- [ ] Correct bank account being used? (SDG vs Agape)
- [ ] If CSJ/SWPP funds: recipient is NOT a director/founder?
- [ ] If paying DJ: Board resolution exists?
- [ ] Receipt/invoice documented?

---

## 📋 BEFORE HIRING A STUDENT

- [ ] Position was in CSJ/SWPP application?
- [ ] Student signed employment contract?
- [ ] Student signed IP Assignment Agreement?
- [ ] Student added to GitHub with correct permissions?
  - [ ] Access to `sdg-passport-public`: ✅ Yes
  - [ ] Access to `agape-engine-private`: ❌ NO
- [ ] CRA Payroll Account (RP) active?
- [ ] **WSIB registered?** (Required within 10 days of first hire in Ontario)

---

## 📋 BEFORE SIGNING A CONTRACT

- [ ] Contract is with correct entity? (SDG Labs vs Agape)
- [ ] If Agape contracting with SDG Labs:
  - [ ] DJ recused from Board vote?
  - [ ] Board resolution approving contract?
  - [ ] Fair market value pricing?
- [ ] Contract stored in `governance/contracts/`?

---

## 📋 QUARTERLY CHECKS

- [ ] Revenue tracker updated?
- [ ] If SDG Labs revenue >$40k: GST/HST registration started?
- [ ] Bank reconciliation completed?
- [ ] All receipts filed?

---

## 📋 ANNUAL CHECKS

- [ ] Board meeting held (min 1x/year)?
- [ ] Annual budget approved by Board?
- [ ] Director terms reviewed?
- [ ] D&O Insurance renewed?
- [ ] Corporations Canada annual return filed?
- [ ] T1044 (Non-Profit Information Return) filed?
- [ ] T4 slips issued to employees?

---

## 🏦 PAYROLL & BANKING GATES (The "Silent Killers")

> These bureaucratic landmines don't kill the company, but they cause paperwork explosions.

- [ ] **Bank Account:** Dual Authorization enabled? (Digital approval for 2 signers)
- [ ] **Bank Account:** Monthly fee waiver confirmed? (Or using Credit Union like Meridian/Kindred)
- [ ] **WSIB:** Registered within 10 days of first student hire? (Ontario mandatory)
- [ ] **CRA Remittance:** Calendar event set for 10th of every month? (Due 15th, pay early)

### CRA Remittance Schedule

| Payroll Month | Remittance Due | Set Alarm |
|---------------|----------------|-----------|
| June | July 15 | July 10 |
| July | Aug 15 | Aug 10 |
| ... | 15th of next month | 10th of next month |

> **Penalty for late remittance:** 10% instantly. Don't miss this.

---

## 📋 OPERATIONAL SAFETY (The "Gotchas")

> Student-focused non-profit specific landmines.

### Payroll
- [ ] **4% Vacation Pay** added to all student wages? (Ontario law, even for 8-week contracts)
- [ ] Budget calculation: `(Hourly Rate x Hours) x 1.04`?

### IP & Copyright
- [ ] **"Waiver of Moral Rights"** clause in employment contract?
- [ ] **IP Assignment** clause: "All work is property of SDG Innovation Labs"?
- [ ] Covers: code, designs, logos, blog posts, all creative work?

### Funding & Receipts
- [ ] **NO "Charitable Tax Receipts"** issued? (You are Non-Profit, NOT Registered Charity)
- [ ] Sponsorships documented as **"Sponsorship Invoice"** (business expense)?

### Data & Privacy (PIPEDA)
- [ ] **Privacy Policy** posted on website/app?
- [ ] Student data stored in **secure CRM** (Mailchimp/HubSpot), not Google Sheets?
- [ ] **"Delete My Data"** process documented?
- [ ] Data consent log for every user?

---

## 🚨 RED FLAGS (Stop and Get Advice)

| Situation | Risk | Action |
|-----------|------|--------|
| DJ voting on own salary | Self-dealing | Stop. DJ must recuse. |
| Using CSJ funds for founder | Fraud | Stop. Use contract revenue. |
| Student building Agape code | IP conflict | Stop. Reassign to SDG work. |
| Revenue >$50k without HST# | CRA penalty | Register immediately. |
| No Board meeting in 12 months | Governance failure | Schedule meeting now. |
| **Issuing "Donation Receipt"** | Fraud (not a charity) | Issue Sponsorship Invoice instead. |
| **Missing Vacation Pay** | Ministry of Labour fine | Add 4% to all student wages. |
| **No Privacy Policy** | PIPEDA violation | Post policy before collecting data. |

---

## 📁 Where to File Documents

| Document Type | Location |
|---------------|----------|
| Board Resolutions | `governance/board-resolutions/` |
| Contracts | `governance/contracts/` |
| Receipts | `governance/receipts/` (create when needed) |
| Tax Filings | `governance/tax-filings/` (create when needed) |

---

*Last Updated: December 2024*
