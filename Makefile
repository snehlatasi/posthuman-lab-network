.PHONY: install frontend-lint frontend-typecheck frontend-build frontend-audit backend-test backend-coverage backend-audit quality

install:
	cd frontend && npm ci

frontend-lint:
	cd frontend && npm run lint

frontend-typecheck:
	cd frontend && npm run typecheck

frontend-build:
	cd frontend && npm run build

frontend-audit:
	cd frontend && npm run audit

backend-test:
	cd backend && mvn test

backend-coverage:
	cd backend && mvn test jacoco:report

backend-audit:
	cd backend && mvn org.owasp:dependency-check-maven:check

quality: frontend-lint frontend-typecheck backend-test
