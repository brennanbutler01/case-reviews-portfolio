# Case Reviews

A case-review application built around eligibility staff workflows: structured reviews, staff records, PDF reports, and accuracy statistics. The frontend uses React, TypeScript, and Mantine; the companion API uses C#, .NET 10, Entity Framework Core, and PostgreSQL.

Originally developed around requirements from Oregon Department of Human Services staff. This repository is a recovered portfolio demonstration. It does not establish current production deployment status, current policy compliance, or agency endorsement.

## Hosted portfolio demo

Live: https://case-reviews-demo.vercel.app

The hosted demo connects this React frontend to the original .NET 10 API on Vercel and a dedicated PostgreSQL database on Neon's free plan. Visitors receive separate one-hour sessions without signing up. Records survive page reloads within that session. **Reset demo** deletes the session's server-side records and revokes its token. Use invented information only.

The frontend and API use the personal Vercel Hobby account. Database credentials and the session signing key exist only on the API project. Expired sessions are rejected immediately; physical cleanup runs while the container is awake and at startup after idle periods.

```sh
nvm use
corepack yarn deploy:visitor
VISITOR_URL=https://case-reviews-demo.vercel.app VISITOR_API_URL=https://case-reviews-demo-api.vercel.app corepack yarn test:e2e:visitor
```

The browser test exercises real database-backed creation, editing, PDF export, reload persistence, visitor isolation, deletion and reset. The API is at https://case-reviews-demo-api.vercel.app. No historical agency database or identity account is used. This demonstration does not establish current benefit-policy correctness.

Automatic GitHub deployment is not connected. The deployment script validates the linked personal project and publishes only the built frontend artifact from a temporary directory outside Git. It excludes repository history and environment files. API deployment instructions are in the companion repository's VERCEL.md.

For a completely offline frontend demonstration, `corepack yarn build:portfolio` and `corepack yarn test:e2e:portfolio` still provide separate in-memory sample data. That mode does not call the API and is not the hosted visitor mode.

## Run the local demo

Clone this repository and [the companion API](https://github.com/brennanbutler01/case-reviews-api) beside each other. You need Docker, Node 24.13 or newer within Node 24, and Corepack.

```sh
cd ../case-reviews-api
docker compose up -d
cd ../case-reviews-portfolio
nvm use
corepack yarn install --frozen-lockfile
corepack yarn dev:demo
```

Open http://127.0.0.1:5189. Create a staff record, then create a review, select review elements, edit it, and export its PDF. The demo starts as Alice; Logout switches between Alice and Bob so you can check record isolation.

Use invented records only. The demo has intentionally public test credentials and is bound to loopback. It does not connect to the former hosted database or require Auth0 credentials. `docker compose down` in the server repository stops its services and preserves the local demo database.

## Verify changes

With the local API running:

```sh
corepack yarn lint
corepack yarn test:ci
corepack yarn build
corepack yarn playwright install chromium
corepack yarn test:e2e
python3 ../case-reviews-api/tests/test_api.py
```

Alternatively, set `CHROME_PATH` to an installed Chrome executable for browser tests. Browser tests create synthetic records and delete their own fixtures. The default Playwright configuration never runs the historical hosted-account tests under `tests/`.

## Authentication outside the demo

Copy `.env.example` to `.env.local` and supply your own Auth0 application configuration. Run `corepack yarn dev`. Client environment variables are public build inputs; never put passwords or secrets in a `VITE_` variable. The server README lists its separate configuration.

The Docker demo login is available only in Vite development on loopback. Ordinary production builds require Auth0; the explicit visitor build uses temporary API sessions, and the separate portfolio build uses only in-memory synthetic data. Hosted authentication and upgrades of an existing database need separate verification before deployment.

See [RECOVERY.md](RECOVERY.md) for verification and remaining release work. Historical screenshots and exported review documents have been removed from the publication source; the public demo uses synthetic data.

## Real API-backed visitor mode

The `dev:visitor` command connects this original frontend to the companion API's production-mode visitor service on port 5210. Run the API's `compose.visitor.yaml` setup first. Then run `corepack yarn test:e2e:visitor`. This test creates and edits real database records, downloads a report, verifies isolation with a second browser context, reloads persisted data and resets the visitor session.

For hosted builds set `VITE_VISITOR_DEMO=true`, `VITE_PORTFOLIO_DEMO=false`, and `VITE_BACKEND_API` to the real API URL. Visitor data expires after one hour; Reset demo deletes its server-side records. The public Vercel site uses this visitor mode. See the API's VISITOR-DEMO.md for hosting requirements.
