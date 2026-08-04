# Railway Deployment

Deploy this monorepo as two Railway services from the same GitHub repository.

## Backend Service

Create a Railway service from the GitHub repo and set:

- Root directory: `backend`
- Builder: Dockerfile

Add a Railway Postgres database to the same project. Railway provides `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, and `PGPASSWORD`; the `railway` Spring profile reads those variables directly.

Required backend variables:

```env
SPRING_PROFILES_ACTIVE=railway
JWT_SECRET=PosthumanLabNetworkProductionJwtSigningKey2026Secure!
ADMIN_EMAIL=posthumanlabnetwork@gmail.com
ADMIN_PASSWORD=AdminSecret123!
FRONTEND_ORIGIN=https://posthumanlabnetwork.online
FRONTEND_WWW_ORIGIN=https://www.posthumanlabnetwork.online
MEMBER_AUTH_EXPOSE_OTP=false
H2_CONSOLE_ENABLED=false
JPA_SHOW_SQL=false
```

Generate a public Railway domain for the backend first. You can use that URL while configuring the frontend.

Useful health check:

```text
/actuator/health
```

## Frontend Service

Create a second Railway service from the same GitHub repo and set:

- Root directory: `frontend`
- Builder: Dockerfile

Required frontend variables:

```env
BACKEND_INTERNAL_URL=https://your-backend-service.up.railway.app
NEXT_PUBLIC_SITE_URL=https://posthumanlabnetwork.online
NEXT_PUBLIC_API_BASE_URL=
```

Leave `NEXT_PUBLIC_API_BASE_URL` empty when you want the browser to call the same domain and let Next.js proxy `/api/*` to the backend through `BACKEND_INTERNAL_URL`.

## Custom Domain

Attach `posthumanlabnetwork.online` to the frontend service, not the backend service.

In Railway:

1. Open the frontend service.
2. Go to Settings -> Networking.
3. Add your custom domain.
4. Add the DNS records Railway shows at your domain registrar.

Add both `posthumanlabnetwork.online` and `www.posthumanlabnetwork.online` if you want both to work. Keep the backend on its Railway-generated domain unless you specifically want an API subdomain such as `api.posthumanlabnetwork.online`.

## Common Failures

- If the backend cannot connect to the database, confirm the Postgres service is attached to the same Railway project and the `PG*` variables are visible to the backend service.
- If frontend API calls fail, confirm `BACKEND_INTERNAL_URL` points to the backend Railway URL and does not end with `/api`.
- If CORS blocks direct backend calls, set `FRONTEND_ORIGIN` to the exact deployed frontend URL.
- If admin login uses the old default password, change `ADMIN_PASSWORD` before the first successful backend startup or update the admin record manually in the database.
