# Posthuman Lab Network

Posthuman Lab Network is a full-stack, interactive digital ecosystem dedicated to posthuman thought, education, research, collaborative creative practices, and physical gatherings. It is designed to look and feel like a **"Living Digital Laboratory"**, connecting international scholars, artists, philosophers, and community members.

---

## 1. Technology Stack

### Frontend
*   **Framework**: Next.js (React 19 / App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Animation**: Framer Motion

### Backend
*   **Framework**: Spring Boot 3.x (Modular Monolith)
*   **Language**: Java 17 (Maven)
*   **Database**: H2 Embedded Database (File Mode)
*   **Documentation**: Springdoc OpenAPI / Swagger

---

## 2. Database Model: Persistence Strategy

### Current Database
*   **Embedded H2 Database — File Mode**: The database runs in-process as part of the Spring Boot application. It does **not** require a separate external database server.
*   **Data Persistence**: Database records are stored locally in the folder `backend/data/posthuman_db.mv.db` and persist between application restarts.

### Future Option
*   If the application grows significantly, requires multi-server deployment, or transitions to a highly concurrent production workspace, the persistence layer can be easily migrated to **PostgreSQL** by updating the drivers and JDBC configurations, as the backend architecture relies entirely on abstract JPA interfaces.

---

## 3. Prerequisites
Ensure the following tools are installed in your development environment:
*   **Java**: JDK 17
*   **Maven**: 3.8.x or above
*   **Node.js**: v18.x or above (npm v9.x+)

---

## 4. Project Structure
```text
posthuman-lab-network/
├── frontend/               # Next.js Application
├── backend/                # Java Spring Boot Monolith
│   └── data/               # Local H2 Database storage (git-ignored)
├── docs/                   # Requirements and architecture documentation
├── .gitignore              # Global git ignore configurations
├── .env.example            # Environment variables template
└── README.md               # Main developer setup guide
```

---

## 5. Setup & Running Instructions

### Step 1: Environment Variables
Copy `.env.example` to `.env` (or configure system env properties) and adjust credentials:
```bash
# Copy template
cp .env.example .env
```

### Step 2: Running the Backend
Navigate to the `backend` folder and run the Maven wrapper or Maven CLI:
```bash
cd backend
mvn clean compile
mvn spring-boot:run
```
The server will start on port `8080`.
*   Swagger API Docs: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
*   H2 Console: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
    *   **JDBC URL**: `jdbc:h2:file:./data/posthuman_db`
    *   **User Name**: `sa`
    *   **Password**: *(leave blank)*

### Step 3: Running the Frontend
Navigate to the `frontend` folder, install packages, and start the development server:
```bash
cd frontend
npm install
npm run dev
```
The client app will start on [http://localhost:3000](http://localhost:3000).

---

## 6. Build Verification
To check standard build compilation:
*   **Frontend build check**: Run `npm run build` inside `/frontend`
*   **Backend test compile**: Run `mvn clean test` inside `/backend`
