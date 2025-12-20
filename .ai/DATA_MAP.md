# 🗺️ DATA MAP (Data Governance Layer)

> **Purpose:** Documents what personal data is collected, where it lives, who can access it, and how long it's retained. Required for PIPEDA compliance.

---

## 📊 DATA INVENTORY

### SDG Passport Platform (SDG Innovation Labs)

| Data Category | Data Elements | Collection Purpose | Legal Basis |
|---------------|---------------|-------------------|-------------|
| **User Account** | Name, email, password hash | Account creation, authentication | Consent |
| **Student Profile** | Name, institution, program | Track SDG engagement | Consent |
| **Activity Data** | Actions logged, SDG tags, points | Gamification, engagement tracking | Consent |
| **Photo/Media** | Profile photos, uploaded images | User-generated content | Consent |
| **Analytics** | Page views, session data, device info | Platform improvement | Legitimate interest |

### Student Employment (SDG Innovation Labs)

| Data Category | Data Elements | Collection Purpose | Legal Basis |
|---------------|---------------|-------------------|-------------|
| **Employment Records** | Name, SIN, address, bank info | Payroll, tax filings | Legal obligation |
| **Work Records** | Hours, pay, evaluations | HR administration | Contract performance |
| **GitHub Access** | Username, access logs | IP protection, audit trail | Legitimate interest |

### USFS Club (SSF-governed)

| Data Category | Data Elements | Collection Purpose | Legal Basis |
|---------------|---------------|-------------------|-------------|
| **Member List** | Name, email, student ID | Club administration | Consent |
| **Event Attendance** | Name, event, date | Participation tracking | Consent |

> **Note:** USFS data is governed by SSF policies. SDG Labs provides technology but does not own this data.

---

## 🏠 DATA LOCATIONS

| Data Type | Storage Location | Encryption | Backup |
|-----------|------------------|:----------:|:------:|
| **User data (production)** | [Cloud provider TBD] | ✅ At rest + transit | ✅ Daily |
| **User data (dev/test)** | Local/staging | ⚠️ Test data only | ❌ |
| **Employment records** | [HR system TBD] | ✅ | ✅ |
| **Payroll data** | [Payroll provider TBD] | ✅ | ✅ |
| **Financial records** | [Accounting software TBD] | ✅ | ✅ |
| **Board documents** | `governance/` in GitHub (private) | ✅ (GitHub encryption) | ✅ (Git history) |
| **Contracts** | `governance/contracts/` | ✅ | ✅ |

---

## 👁️ ACCESS CONTROL MATRIX

| Role | User Data | Employment Data | Financial Data | Board Docs |
|------|:---------:|:---------------:|:--------------:|:----------:|
| **Executive Director** | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **Board Directors** | ❌ | ❌ | ✅ Summary only | ✅ Full |
| **Digital Treasurer** | ❌ | ⚠️ Pay rates only | ✅ Full | ✅ Full |
| **CSJ/SWPP Students** | ⚠️ Aggregate only | ❌ | ❌ | ❌ |
| **External Partners** | ⚠️ Anonymized only | ❌ | ❌ | ❌ |

**Legend:** ✅ Full access | ⚠️ Limited access | ❌ No access

---

## ⏱️ DATA RETENTION SCHEDULE

| Data Type | Retention Period | Deletion Method | Legal Requirement |
|-----------|------------------|-----------------|-------------------|
| **Active user accounts** | While account active | — | — |
| **Inactive accounts** | 2 years after last login | Anonymize or delete | PIPEDA |
| **User activity logs** | 2 years | Aggregate, delete PII | — |
| **Employment records** | 7 years after termination | Secure destruction | CRA requirement |
| **Payroll records** | 7 years | Secure destruction | CRA requirement |
| **Tax filings** | 7 years | Secure destruction | CRA requirement |
| **Contracts** | 7 years after expiry | Secure destruction | Legal best practice |
| **Board resolutions** | Permanent | — | Corporate records |

---

## 🔐 SECURITY CONTROLS

### Technical Controls

| Control | Status | Notes |
|---------|:------:|-------|
| Encryption at rest | ⬜ TBD | Required for all PII |
| Encryption in transit (HTTPS) | ⬜ TBD | Mandatory |
| Password hashing (bcrypt/argon2) | ⬜ TBD | Never store plain text |
| 2FA for admin accounts | ⬜ TBD | Required for ED, devs |
| Access logging | ⬜ TBD | Who accessed what, when |
| Automated backups | ⬜ TBD | Daily minimum |
| Backup encryption | ⬜ TBD | Same as production |

### Administrative Controls

| Control | Status | Notes |
|---------|:------:|-------|
| Privacy Policy published | ⬜ TBD | Before collecting data |
| Terms of Service | ⬜ TBD | Before user registration |
| Consent logging | ⬜ TBD | Record when user agreed |
| Data access request process | ⬜ TBD | For user inquiries |
| Data deletion process | ⬜ TBD | "Delete My Data" workflow |
| Breach notification process | ⬜ TBD | See EMERGENCY_PLAYBOOK.md |

---

## 📋 PIPEDA COMPLIANCE CHECKLIST

### Data Collection

- [ ] Only collect data necessary for stated purposes
- [ ] Clearly state purposes at time of collection
- [ ] Obtain meaningful consent
- [ ] Allow users to withdraw consent

### Data Use

- [ ] Use data only for purposes stated
- [ ] Document any new uses before implementation
- [ ] Minimize data shared with third parties
- [ ] Ensure third parties have adequate protections

### Data Protection

- [ ] Implement appropriate security safeguards
- [ ] Limit access to need-to-know basis
- [ ] Train staff on data handling
- [ ] Regular security reviews

### Individual Rights

- [ ] Allow individuals to access their data
- [ ] Allow individuals to correct their data
- [ ] Allow individuals to request deletion
- [ ] Respond to requests within 30 days

### Accountability

- [ ] Designate privacy officer (ED default)
- [ ] Maintain records of processing activities
- [ ] Report breaches as required
- [ ] Regular compliance reviews

---

## 📝 DATA REQUEST WORKFLOW

### User Requests "What data do you have on me?"

1. User sends request to [privacy email TBD]
2. ED verifies identity (require account login or ID)
3. Within 30 days:
   - Export all data associated with account
   - Provide in readable format (JSON, CSV, or PDF)
   - Document request and response

### User Requests "Delete my data"

1. User sends request to [privacy email TBD]
2. ED verifies identity
3. Inform user of consequences (account deleted, points lost)
4. If user confirms:
   - Delete account and all PII
   - Retain anonymized aggregate data
   - Retain employment records if applicable (7-year legal hold)
5. Confirm deletion in writing
6. Log request and completion

---

## 🔗 THIRD-PARTY DATA SHARING

| Third Party | Data Shared | Purpose | Agreement |
|-------------|-------------|---------|-----------|
| [Cloud Provider TBD] | All platform data | Hosting | DPA required |
| [Analytics TBD] | Anonymized usage | Platform insights | — |
| [Email Provider TBD] | Email addresses | Notifications | DPA required |
| **Seneca (institutional)** | Aggregated only | AASHE STARS reporting | Data sharing agreement |

> **Rule:** Never share individual student data with institutions. Only aggregated, anonymized data.

---

## 📄 REQUIRED DOCUMENTS

| Document | Status | Location |
|----------|:------:|----------|
| Privacy Policy | ⬜ Draft | Website footer |
| Terms of Service | ⬜ Draft | Website footer |
| Cookie Policy | ⬜ Draft | Website footer |
| Data Processing Agreement (template) | ⬜ Draft | `templates/` |
| Employee Data Handling Policy | ⬜ Draft | HR docs |

---

## 🔗 Related Documents

- [EMERGENCY_PLAYBOOK.md](./EMERGENCY_PLAYBOOK.md) - Breach response
- [AUDIT_CHECKLIST.md](./AUDIT_CHECKLIST.md) - Privacy checkpoints
- [ACCESS_INVENTORY.md](./ACCESS_INVENTORY.md) - System access

---

*Last Updated: December 2025*
