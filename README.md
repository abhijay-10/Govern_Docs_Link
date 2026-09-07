# OneID — Unified Identity Verification & Linking System (Frontend)

> **Privacy-First Identity Verification & Heuristic Document Linking**

OneID is a modern, sober, privacy-focused identity management and verification platform built with React, TypeScript, Tailwind CSS, and Vite.

It allows an individual to securely associate multiple identity documents (Aadhaar, PAN Card, Voter ID, Passport, Driving Licence) into a single unified profile and evaluate cross-credential consistency using client-side heuristic matching models.

---

## Important Notice & Terminology

> [!IMPORTANT]
> **OneID is a conceptual identity verification platform. It does not create official government document linkages.**
>
> All cross-document matching and confidence scores represent **AI-assisted document consistency analysis**. No connection is made to UIDAI, NSDL, UTIITSL, Election Commission, DigiLocker, or external statutory identity databases.

### Core Terminology
- **Identity Association**: Connecting a document's optical metadata to your local profile anchor.
- **Identity Verification**: Algorithmic evaluation of attribute alignment across documents.
- **Document Matching**: Heuristic lexical, phonetic, and chronological comparison.
- **Verification Confidence**: A normalized percentage indicating degree of concordant attributes.
- **Identity Profile**: A privacy-isolated data structure holding verified attributes with synthetic masks.

---

## Technology Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom sober palette, slate typography, subtle borders, accessible status tokens)
- **Routing**: [React Router 6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Visualizers**: Custom reactive SVG components (Interactive Identity Relationship Graph and Animated Circular Consistency Meters) — **Zero heavy 3rd-party charting bloat**.

---

## Application Structure & Routes

| Route | Page / View | Description |
|---|---|---|
| `/` | **Landing Page** | Hero, interactive tree diagram, supported IDs, privacy-first principles |
| `/login` | **Sign In** | Email / Mobile authentication with instant demo profile access |
| `/signup` | **Sign Up** | Profile creation with terms acknowledgment and guided onboarding |
| `/dashboard` | **Main Dashboard** | Executive status: Active profile, 3/5 documents added, 97.8% confidence, strong security |
| `/identity` | **My Identity** | Unified profile card, masked DOB (`•• / •• / 2003`), circular score & 4-vector breakdown |
| `/documents` | **My Documents** | Document cards by category (Identity, Financial, Address) with view & remove actions |
| `/documents/add` | **Add Document** | Drag-and-drop upload with 5-stage simulated OCR extraction and review |
| `/verification` | **Verification Center** | Pairwise comparison cards (Aadhaar ↔ PAN, etc.) and detailed field modal |
| `/graph` | **Identity Graph** | Interactive SVG topology with clickable satellite nodes and detail drawer |
| `/sharing` | **Secure Sharing** | Time-gated verification token generator, QR pass modal, and access revocation |
| `/verify/:token` | **Receiver Portal** | Third-party organization view (Demo Organization) with Approve / Reject actions |
| `/activity` | **Audit Trail** | Security event timeline with categories, device signatures, and IP locations |
| `/settings` | **Settings** | Profile, Two-Factor Authentication, login alerts, data retention, and privacy mode |
| `/privacy` | **Privacy & Security** | Security checklist and deep dive into the 4 Privacy-by-Design principles |

---

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm 9+ or pnpm / yarn

### Installation & Launch

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run local development server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000` (or the port specified by Vite).

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production bundle**:
   ```bash
   npm run preview
   ```

---

## Future FastAPI + PostgreSQL Backend Compatibility

The frontend is structured with an isolated async service layer in `src/services/`:

- `src/services/authService.ts` ➔ Replace with `POST /auth/login`, `POST /auth/signup`
- `src/services/documentService.ts` ➔ Replace with `GET /documents`, `POST /documents/upload`, `DELETE /documents/:id`
- `src/services/verificationService.ts` ➔ Replace with `GET /verification/matrix`, `POST /verification/run`
- `src/services/sharingService.ts` ➔ Replace with `POST /sharing/generate`, `GET /verify/:token`, `DELETE /sharing/:id`
- `src/services/activityService.ts` ➔ Replace with `GET /activity`

The UI consumes these services via the centralized `src/context/IdentityContext.tsx`. Connecting the backend requires modifying only the service functions to invoke `fetch` / `axios` endpoints with zero UI component changes.

---

## Security UX Guarantees

1. **Strict Masking**: Real document numbers are never exposed (e.g. `XXXX XXXX 4821`, `XXXXX1234X`).
2. **Minimal Exposure**: Receiver verification links reveal consistency pass/fail statuses rather than downloadable raw files.
3. **Time-To-Live Expiration**: Tokens expire automatically after 15m, 1h, 24h, or 7d.
4. **Immediate Revocation**: Any active share link can be revoked instantly by the user.
