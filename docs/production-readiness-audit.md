# Production Readiness Audit

## Architecture Assessment

The repository is a full-stack modular monolith: a Spring Boot backend organized by feature packages and a decoupled Next.js frontend that talks to the backend through JSON REST APIs.

Strengths:

- Clear top-level split between `frontend`, `backend`, and `docs`.
- Backend feature packages are already present for auth, events, publications, membership, media, learning, labs, people, conversations, curation, contact, collaboration, and audit.
- DTOs are used for many API responses and form requests.
- Spring Data JPA centralizes persistence access.
- Frontend API calls are centralized under `src/lib/api`.
- The app already has integration-style backend tests for several critical public workflows.

Weaknesses addressed in this modernization pass:

- Duplicated slug generation was spread across services and admin controllers.
- Enum parsing was duplicated and inconsistent.
- Infrastructure settings such as media upload paths and CORS were not strongly modeled.
- Error handling used `printStackTrace` and swallowed file deletion failures.
- Frontend quality gates did not include formal type checking, formatting, or dependency audit scripts.
- CI/CD automation was missing.

## Scalability Assessment

Current scalability posture:

- The modular monolith is appropriate for the current domain size and is easier to operate than premature microservices.
- Feature packages provide a reasonable future extraction path if a domain grows independently.
- H2 file storage and local media uploads are the largest production scalability limits.
- Several list endpoints still return unpaginated collections; these should be paginated before high-volume content growth.
- Some controllers still depend directly on repositories for simple CRUD-style content. This is acceptable for now but should move behind services as business rules grow.

Recommended scaling path:

- Keep the monolith, but strengthen module boundaries through service interfaces and DTO boundaries.
- Move production persistence to PostgreSQL with Flyway or Liquibase migrations.
- Move local media files to object storage such as S3, Cloudflare R2, or GCS behind a storage interface.
- Add pagination to public and admin list endpoints.
- Add rate limiting for public form submission endpoints.
- Add structured request logging and correlation IDs.

## Dead Code Report

Removed verified orphan assets:

- `frontend/public/window.svg`
- `frontend/public/vercel.svg`
- `frontend/public/next.svg`
- `frontend/public/globe.svg`
- `frontend/public/file.svg`
- `docs/AI-images.png`

Reason:

- Repository-wide search found no references to these files.
- The SVG files were default starter assets from Next.js.
- The PNG was not referenced by docs, frontend code, backend code, or configuration.

No Java classes, API clients, React components, or route modules were removed because the static scan did not prove they were unused safely enough. Further removals should use bundler analysis plus runtime route checks.

## Performance Findings

Low-risk improvements made:

- Disabled SQL logging for tests to reduce CI noise and overhead.
- Kept production SQL logging disabled in `application-prod.yml`.
- Removed orphan assets from the repository.

Remaining performance concerns:

- Unpaginated `findAll` and `findAllBy...` endpoints can grow into memory and response-time bottlenecks.
- Local file storage is synchronous and single-node oriented.
- There is no HTTP caching strategy for mostly static content lists.
- The frontend statically generates many pages, which is fine now but should be watched as route count grows.

## Refactoring Summary

Backend changes:

- Added `SlugUtils` for consistent slug creation.
- Added `EnumUtils` for consistent case-insensitive enum parsing.
- Added `CorsProperties` and refactored CORS config away from raw string splitting.
- Added `MediaStorageProperties` and moved upload settings into configuration.
- Improved exception handling for invalid input and authentication failures.
- Replaced stack traces and swallowed IO errors with structured logging.
- Added Maven Enforcer, JaCoCo, and OWASP Dependency Check configuration.

Frontend changes:

- Added strict type-only import linting.
- Added `typecheck`, `format`, `format:check`, and `audit` scripts.
- Added Prettier and formatted the frontend codebase.
- Upgraded Next.js to `16.2.11`.
- Added npm overrides for vulnerable transitive packages.
- Verified `npm audit --audit-level=high` reports zero vulnerabilities.

Repository changes:

- Added `.editorconfig`.
- Added Prettier config and ignore file.
- Added a root `Makefile`.
- Added a `.githooks/pre-commit` hook.
- Added GitHub Actions CI with frontend, backend, and CodeQL jobs.
- Updated `.env.example`.

## CI/CD Documentation

The workflow at `.github/workflows/ci.yml` runs on pushes to `main`/`master` and pull requests.

Quality gates:

- Frontend dependency installation with `npm ci`.
- Frontend linting with ESLint.
- Frontend formatting check with Prettier.
- Frontend type checking with TypeScript.
- Frontend dependency vulnerability scan with `npm audit --audit-level=high`.
- Frontend production build.
- Backend tests and JaCoCo coverage report generation.
- Backend dependency vulnerability scan with OWASP Dependency Check.
- CodeQL static security analysis for Java and TypeScript.

No deployment job is included yet because the repository does not define a production hosting target, registry, or environment contract. Add deployment only after secrets, environment URLs, database credentials, and artifact strategy are finalized in GitHub Secrets.

## Code Quality Report

Verified locally:

- `npm run lint`
- `npm run typecheck`
- `npm run format:check`
- `npm run build`
- `npm run audit`
- `mvn test`

Partially verified:

- `mvn org.owasp:dependency-check-maven:check` is configured but timed out locally during vulnerability database initialization. CI should be the source of truth for this long-running scan.

## Remaining Technical Debt

- H2 file database is not a production database.
- There is no migration tool.
- Local disk uploads are not horizontally scalable.
- Many admin endpoints accept entities directly instead of request DTOs.
- Some controllers still directly use repositories.
- Public/admin authorization is path-rule based and should be backed by endpoint-level tests.
- Client admin token storage uses `localStorage`; production should reassess XSS/token theft risk.
- Public form endpoints lack rate limiting or abuse protection.
- Test coverage is mostly integration smoke coverage and does not yet cover all services or security failures.

## Recommended Next Steps

1. Add PostgreSQL and Flyway/Liquibase production profile.
2. Introduce pagination response contracts for list endpoints.
3. Extract direct repository usage from admin controllers into feature services.
4. Add request DTOs for admin create/update endpoints.
5. Add object-storage abstraction for media.
6. Add Spring Boot Actuator health/readiness endpoints.
7. Add rate limiting for public form submissions.
8. Add targeted service tests for validation, authorization, and mapping behavior.
