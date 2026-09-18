# Case Reviews

A case-review application built around eligibility staff workflows: structured reviews, staff records, PDF reports, and accuracy statistics. The frontend uses React, TypeScript, and Mantine; the companion API uses C#, .NET 10, Entity Framework Core, and PostgreSQL.

Originally developed around requirements from Oregon Department of Human Services staff. This repository is a recovered portfolio demonstration. It does not establish current production deployment status, current policy compliance, or agency endorsement.

## Hosted portfolio demo

Live: https://case-reviews-demo.vercel.app

`corepack yarn build:portfolio` builds a standalone, no-signup demonstration for Vercel's free personal Hobby plan. The deployment configuration selects this command. It seeds invented staff and case records in memory, scoped to the visitor's current tab. Edits survive navigation within the app and reset on a page refresh or **Reset demo**. Case records are never submitted to a backend or stored remotely.

This mode demonstrates the frontend workflows, including PDF export. The actual C# API remains a separate component verified through the Docker setup below. The hosted demo does not demonstrate live database persistence, real authentication, or current benefit-policy correctness.

```sh
corepack yarn build:portfolio
corepack yarn test:e2e:portfolio
```

To test the published site, set `PORTFOLIO_URL` to its HTTPS origin when running the browser test. It checks creation, editing, details, PDF download, deletion, statistics, tab isolation, reset, direct routes, a mobile viewport, and absence of case-data network calls.

The dedicated Vercel project is `case-reviews-demo` under the personal `brennanbutler01s-projects` Hobby account. It is separate from the historical `case-reviews` deployment.

The personal account is on Vercel's free Hobby plan. No database, server, paid add-on, or environment secret is needed. Vercel Authentication is disabled only on the dedicated demo project so visitors can open it without an account.

Automatic GitHub deployment is not connected. Vercel's commit-author check blocked source deployment, so updates publish only the locally built static artifact through the signed-in project owner's account:

```sh
nvm use
corepack yarn deploy:portfolio
PORTFOLIO_URL=https://case-reviews-demo.vercel.app corepack yarn test:e2e:portfolio
```

This requires Python 3 and an authenticated Vercel CLI. The script validates the linked personal project, creates a temporary artifact directory outside Git, and uploads only `dist`. It never includes repository history, historical screenshots, test credentials, or environment files. `python3 scripts/deploy_portfolio.py --check` validates packaging without uploading. Do not use this command for the authenticated application.

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

The Docker demo login is available only in Vite development on loopback. Ordinary production builds require real authentication; the separate portfolio build uses only in-memory synthetic data. Hosted authentication and upgrades of an existing database need separate verification before deployment.

See [RECOVERY.md](RECOVERY.md) for verification and remaining release work. Historical screenshots and exported review documents have been removed from the publication source; the public demo uses synthetic data.
