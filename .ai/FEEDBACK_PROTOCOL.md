# 📬 AI Governor Feedback Briefing Protocol

> **Purpose**: Defines how the AI Governor processes user feedback autonomously.

---

## 🔄 SESSION START PROTOCOL

At the start of each session, after reading `ONBOARDING.md`, the AI Governor should:

1. **Query unprocessed feedback** from Firestore:
   ```
   collection: "feedback"
   filter: status == "unprocessed"
   orderBy: createdAt DESC
   ```

2. **Triage by priority**:
   | Priority | Action |
   |----------|--------|
   | `high` | Address immediately if relevant to current task |
   | `medium` | Log for implementation backlog |
   | `low` | Acknowledge, no immediate action |

3. **Mark as processed** after review:
   ```js
   {
     status: 'processed',
     processedAt: serverTimestamp(),
     processedBy: 'AI_SESSION_[DATE]',
     aiNotes: 'Summary of action taken'
   }
   ```

---

## 📊 FEEDBACK SCHEMA (Firestore)

All feedback is stored in the `feedback` collection with this structure:

```javascript
{
  // Core Data
  type: 'survey' | 'vibe_check',  // Source component
  trigger: string,                 // What page/action triggered it
  responses: object,               // Survey answers OR text message
  text: string,                    // For vibe_check: raw message
  
  // User Context
  uid: string,
  displayName: string,
  
  // AI Governor Metadata
  priority: 'high' | 'medium' | 'low',
  status: 'unprocessed' | 'processed' | 'actioned',
  aiActionRequired: boolean,       // True if contains actionable suggestion
  category: 'bug_report' | 'feature_request' | 'user_research' | 'general',
  
  // Timestamps
  createdAt: Timestamp,
  processedAt: Timestamp | null,
  processedBy: string | null,      // AI session identifier
  
  // AI Response (filled after processing)
  aiNotes: string | null,          // What AI decided/did
  relatedCommit: string | null,    // Git commit if code was changed
}
```

---

## 🤖 AUTONOMOUS ACTIONS

The AI Governor may take these actions without human approval:

| Feedback Type | Auto-Action Allowed |
|---------------|---------------------|
| Bug report with clear reproduction | ✅ Fix immediately if low-risk |
| Feature request < 30 min work | ✅ Implement if aligns with roadmap |
| UX confusion report | ✅ Add to `.ai/BACKLOG.md` |
| High priority + actionable | ⚠️ Notify DJ via CURRENT_STATUS.md |

---

## 📋 SAMPLE QUERY (For AI Reference)

When starting a session, I can query feedback like this:

```
"Show me all unprocessed feedback from the SDG Passport app, prioritized by urgency."
```

Then I will:
1. Review each item
2. Take action or log to backlog
3. Update `status` to `processed`
4. Note my actions in `CURRENT_STATUS.md`

---

## 🔗 RELATED FILES

- [ONBOARDING.md](./ONBOARDING.md) - Session start checklist
- [CURRENT_STATUS.md](./CURRENT_STATUS.md) - Live status dashboard
- [DELEGATION_OF_AUTHORITY.md](./DELEGATION_OF_AUTHORITY.md) - What AI can approve

---

*Last Updated: December 16, 2025*
*Governor Protocol v1.0*
