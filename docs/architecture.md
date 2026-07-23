# Architecture Design Spec: Posthuman Lab Network

## 1. Architectural Style
*   **Modular Monolith**: Organized inside a single Spring Boot runtime but partitioned cleanly into domain modules (e.g. `auth`, `event`, `publication`, `membership`, `learning`).
*   **Decoupled Frontend**: Next.js App Router interacting with Spring Boot via standard JSON REST endpoints.

## 2. Component Design
```
[ Next.js Client ]
       │
       ▼ (REST API / JSON)
[ Spring Boot Monolith ]
       │
       ├─► [ Controller Layer ]
       ├─► [ Service Layer ]
       └─► [ Repository Layer (Spring Data JPA) ]
               │
               ▼ (SQL / File I/O)
       [ H2 Embedded Database (File Mode) ]
```

## 3. Database Layer Architecture

### Current Setup: H2 Embedded File Database
*   **Mode**: Embedded File Mode (`jdbc:h2:file:./data/posthuman_db`).
*   **Characteristics**: Runs inside the JVM process of the backend. Writes transaction logs and state changes directly to the local disk under `backend/data/`. No external database server processes are required.
*   **Console Access**: Accessible locally during development at `/h2-console` for debugging and querying. Disabled in production environments.

### Future Migration Roadmap: PostgreSQL
*   **Transitioning**: If multi-server scaling or high concurrent load requires a standalone data server, the persistence layer can be converted to **PostgreSQL**.
*   **JPA Abstraction**: Because the application utilizes Spring Data JPA and Hibernate ORM, migrating databases requires only swap-out of the database driver in `pom.xml` and updating the `spring.datasource` configuration variables in `application.yml`. The Java code (entities, services, repositories) remains untouched.

## 4. Technology Stack Specs
*   **Frontend**: Next.js (TypeScript, Tailwind CSS, Framer Motion)
*   **Backend**: Spring Boot 3.4.2 (Java 17, Spring Web, Spring Data JPA, Hibernate)
*   **Database**: H2 Embedded (File Mode)
*   **Documentation**: Springdoc OpenAPI v3 (Swagger UI)
