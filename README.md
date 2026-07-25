# Posthuman Lab Network

Posthuman Lab Network is a full-stack digital platform for posthuman thought, education, research, events, publications, collaboration, membership, and media curation.

## Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Three.js
- Backend: Spring Boot 3, Java 17, Maven, Spring Security, Spring Data JPA
- Local database: H2 file mode
- API docs: Springdoc OpenAPI / Swagger

## Repository Layout

```text
posthuman-lab-network/
  backend/   Spring Boot API
  frontend/  Next.js application
  docs/      Architecture and production-readiness documentation
```

## Environment

Copy the example file and set local values:

```bash
cp .env.example .env
```

Important production settings:

- `JWT_SECRET` must be at least 32 random characters.
- `ADMIN_PASSWORD` must be changed from the example value.
- `H2_CONSOLE_ENABLED=false` in production.
- `JPA_SHOW_SQL=false` in production.
- `FRONTEND_ORIGIN` must match the deployed frontend origin.
- `MEMBER_AUTH_EXPOSE_OTP=false` in production so verification codes are never returned by the API.
- Use a production database profile before multi-user or multi-instance deployment.

## Member Sign-In

Member applicants create an email/password account, verify a one-time code, submit an application, and wait for admin approval.

Local development values:

```env
MEMBER_AUTH_EXPOSE_OTP=true
MEMBER_AUTH_OTP_TTL_MINUTES=10
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

With `MEMBER_AUTH_EXPOSE_OTP=true`, the API response includes the OTP so local development can complete the verification flow without email infrastructure. Keep it disabled in production and deliver OTPs through a mail provider.

## Backend

```bash
cd backend
mvn test
mvn spring-boot:run
```

Local endpoints:

- API: `http://localhost:8080`
- Swagger: `http://localhost:8080/swagger-ui.html`
- H2 console: `http://localhost:8080/h2-console`

## Frontend

```bash
cd frontend
npm ci
npm run dev
```

Local app:

- `http://localhost:3000`

## Quality Gates

Frontend:

```bash
cd frontend
npm run lint
npm run format:check
npm run typecheck
npm run audit
npm run build
```

Backend:

```bash
cd backend
mvn test
mvn org.owasp:dependency-check-maven:check
```

Root convenience targets:

```bash
make quality
make frontend-build
make backend-coverage
```

## Git Hooks

Optional local pre-commit hook:

```bash
git config core.hooksPath .githooks
```

The hook runs frontend linting, frontend type checking, and backend tests.

## CI

GitHub Actions are configured in `.github/workflows/ci.yml`.

The pipeline runs:

- Frontend install, lint, formatting check, typecheck, audit, and build
- Backend tests with JaCoCo coverage
- Backend dependency vulnerability scan
- CodeQL security analysis for Java and TypeScript

## Production Readiness

See `docs/production-readiness-audit.md` for the architecture assessment, scalability review, dead-code report, performance findings, CI documentation, remaining technical debt, and recommended next steps.
