This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
"# katara" 

## Registration fields API

The six signup forms share `components/auth/registration/RegistrationForm.tsx`.
Each form wrapper supplies its API user type: `member`, `agency_employee`,
`broker`, `travel_company`, `company`, or `third_party_partner`.

`lib/auth/use-registration-fields.ts` loads fields again when the language or
user type changes and ignores outdated results without aborting requests.
Concurrent loads for the same type and language share one active request.
`lib/auth/api.ts` calls
`GET https://katara.tawajood.com/api/steps/all?type=member` directly from the browser
with `Accept-Language: ar` (or `en`). The upstream must allow the frontend origin
through CORS. Set `NEXT_PUBLIC_KATARA_API_BASE_URL` in `.env.local` before
starting or building the app to override this public base URL.
Direct registration and login use the same public base URL. Server-side auth routes
use `KATARA_API_BASE_URL` instead.

`lib/auth/registration-schema.ts` validates and normalizes the remote schema.
Fields follow `sort_order` and `is_required`, support array/object options,
and retain numeric option IDs. Empty select options are displayed as unavailable;
they are never replaced with local country or nationality values.

The form posts JSON directly to `https://katara.tawajood.com/api/auth/register`
with `Accept-Language: ar` (or `en`); the upstream must support CORS for this POST.
Profile values use `{ field_id, value }` entries from the
loaded schema; scalar values are strings and multiselect values (including
`services` and `agency_type`) are string arrays.
Empty optional values are omitted. The form validates required fields, available
options, email, an eight-character password, matching confirmation, and terms.
The API remains authoritative for additional validation rules.

File fields (such as the optional agency logo) are supported. When a file is
selected, direct registration sends multipart form data using
`fields[index][field_id]` and `fields[index][value]`; multiselect entries use
`fields[index][value][]`. The browser supplies the multipart boundary. Requests
without files retain the JSON format. Multipart acceptance and file validation
rules must also be supported by the upstream API.

Validation failures are shown without clearing entered values. Submission is
locked while pending and successful registration shows a confirmation. The
direct registration response contains `data.user.token`, which `lib/auth/api.ts`
validates and persists in `localStorage` under `token` using `lib/auth/storage.ts`.
Public user metadata is returned separately to the form and saved by `AuthProvider`.
Direct registration does not create same-origin HttpOnly session cookies.
Direct login also validates `data.user.token` and stores it in localStorage;
it does not create same-origin HttpOnly session cookies.
Failed requests leave the existing token untouched. Tokens are never logged.
Future authenticated route handlers should
read this cookie and forward it as a bearer token. Loading full profile data
is a separate integration.

## Login

`app/login/page.tsx` uses `lib/auth/use-login.ts` for validation, pending state,
duplicate-submit prevention, API errors, and navigation to `/profile` on success.
`userTypeByRole` maps each sidebar role to its API user type.
The browser posts email, password, and user_type as URL-encoded form fields
directly to `https://katara.tawajood.com/api/auth/login?lang=ar` (or `en`),
with the matching `Accept-Language` header. The upstream must allow the frontend
origin through CORS. `NEXT_PUBLIC_KATARA_API_BASE_URL` overrides the base URL.
Passwords are preserved exactly and are never logged.

The local login and registration routes share `lib/auth/session.ts` for session-cookie handling.
The user object contains public fields; the token is returned separately for
localStorage. An additional HttpOnly
`katara_user` cookie holds display metadata. `AuthProvider` stores public user
metadata under `user` in localStorage and restores it locally when `token` exists,
without calling `/api/auth/session`. It updates the navbar and profile sidebar
and synchronizes changes across tabs. This metadata
is for display only, never for authorization. Future protected API requests must
forward `katara_session` as a bearer token and let the upstream API validate it.
Profile sections still use their existing data sources.

Run `npm run test:auth` with Node.js 22.6+ to check schemas, registration, login,
and session cookies using mocked upstream responses.
