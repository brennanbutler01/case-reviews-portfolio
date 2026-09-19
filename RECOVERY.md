# Local recovery status

September 18, 2026. This public edition starts from the recovered source on `portfolio-refresh`. The historical repositories remain private; their cached commits are not part of this independent repository.

## Implemented

-   Reproducible Docker API/PostgreSQL demo, with synthetic Alice and Bob accounts and a loopback-only frontend.
-   API ownership enforced on list, read, create, update, and delete. Route IDs and linked staff validated. Bulk cleanup endpoint removed.
-   Correct persistence when replacing review elements and adding, replacing, or removing eligibility counts. Staff deletion is blocked while reviews reference them.
-   Review details no longer depend on staff having loaded; table loading rows no longer crash.
-   HTTP failures no longer masquerade as successful saves/deletes. PDF actions wait for their staff record.
-   Fixed office filtering, including office zero, numeric selector values, and statistics that counted unreviewed elements in error/action rates.
-   Migrated server to .NET 10. Refreshed frontend tools and dependency lockfile; pinned Node 24 and Yarn. Removed tracked environment/session files from the current frontend tree and replaced configuration with examples.
-   Default browser tests target the local demo, not historical hosted accounts.

## Verification

-   Frontend: 104 tests across 32 files; lint with zero allowed warnings; TypeScript and production build.
-   API: three HTTP regression scenarios with multiple assertions against real local PostgreSQL, covering ownership, forged IDs/owners, anonymous access, invalid input, linked records, and nested updates.
-   Chrome: creates staff and a review, opens details, edits and verifies persistence, downloads a PDF, opens statistics, checks user isolation, and deletes the review. Fixtures are removed afterward.
-   Production environment rejects demo authentication at startup.
-   Yarn audit reports no known advisories in the final lockfile. The .NET transitive package audit reports no vulnerable packages from configured sources. These checks do not constitute a complete security review.

## Remaining before authenticated hosted use

-   The publication snapshot excludes historical screenshots, exported case documents, credentials, and old Git history. Both Gitleaks and comparison against 350 previously exposed values report zero findings. Revocation of old credentials and cached-commit removal in the private originals remain separate follow-up.
-   Verify real Auth0 login and deployment configuration with a new test environment. No historical hosted account or database was accessed.
-   Review and test migration of any existing database. Demo schema creation is for a new disposable database only.
-   Six browser scenarios cover the main workflow and PDF exports for all five benefit programs. This does not validate every policy combination or current agency rule.
-   PDF dependencies still produce a large frontend bundle. Some old tests emit React/Vite warnings and use module mocks; tests pass, but further cleanup would improve maintainability.

Use the README for startup and checks. This is a working local portfolio candidate, not a claim of production readiness or a complete security audit.

## Portfolio hosting preparation

Added an explicit `build:portfolio` mode with independent in-memory sample data per tab, no Auth0 login and no backend calls. It resets on refresh, and the interface explains that behavior. Vercel configuration targets this static build and excludes archived tests and historical assets from upload. At that stage, the dedicated personal Hobby project at https://case-reviews-demo.vercel.app served only static assets and had no configured environment secrets. The September 18 hosted integration below supersedes that deployment while retaining the static build as an offline option.

The old hosted-test password has also been removed from the current source; those tests now require explicitly supplied environment variables. The September 17 cleanup rewrote affected branch histories; GitHub retained old commits still require Support follow-up. View details now includes general comments and creates fresh form state when opened, avoiding stale values after editing.

Portfolio verification: all six production-build browser scenarios pass, alongside 104 unit/component tests, lint, build, the Docker browser workflow, and three API regression scenarios. The same six portfolio browser scenarios also pass against the public HTTPS site without an authenticated browser session.

## September 18 hosted integration

The public site now uses expiring visitor sessions, the original .NET API on Vercel container services, and a dedicated Neon free PostgreSQL database. The former static-only deployment described above is retained as an optional local build mode. All five hosted API ownership/session tests passed. Both desktop and mobile browser workflows passed against the hosted frontend, .NET API and Neon database, including reload persistence, PDF export, visitor isolation and reset. No historical provider credentials are reused.
