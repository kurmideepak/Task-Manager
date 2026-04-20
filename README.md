# Full-Stack Task Manager

A modern, containerized Task Manager application built with a React frontend, Spring Boot backend, and a MySQL database. This project is fully orchestrated using Docker Compose and is designed for seamless local development and production deployments.

## 🚀 Overview

- **Frontend**: React 19 + Vite, styled using Tailwind CSS. In production/Docker environments, it runs on an ultralight Nginx server acting as a reverse proxy to prevent CORS issues.
- **Backend**: Java 17 + Spring Boot 3.2.4 REST API. Utilizes Spring Data JPA (Hibernate) and HikariCP for connection pooling.
- **Database**: MySQL 8.0, cleanly integrated with health checks assuring backend reliability upon startup.
- **CI/CD**: Contains a declarative `Jenkinsfile` orchestrating automatic, safe deployments dynamically leveraging Docker Multi-stage builds.

## 🛠 Prerequisites
Ensure you have the following installed on your machine:
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

*(Note: You do not natively need Node.js, Maven, or Java installed on your machine as Docker isolates those requirements).*

## 📥 How to Pull and Run the Code

### 1. Clone the Repository
Open your terminal/command prompt and pull the code from the remote repository:
```bash
git clone <your-repository-url-here>
cd "Task Manager"
```

### 2. Build and Run via Docker Compose
Thanks to multi-stage Dockerfiles, you can cleanly build and launch all services through one single command:
```bash
docker-compose up --build -d
```
Docker will sequentially map dependencies: 
1. The **MySQL database** spins up and conducts health checks.
2. The **Spring Boot Backend** starts up afterward and applies the DB schemas dynamically.
3. The **React Frontend** compiles, builds, and successfully launches the Nginx proxy network.

### 3. Verify Application Unveiling
Wait roughly 30 to 60 seconds manually for the backend to finalize its JPA migrations fully, and then access your application in your browser:
* **Frontend UI**: [http://localhost:3000](http://localhost:3000)
* **Backend API (Task Proxy)**: [http://localhost:3000/api/tasks](http://localhost:3000/api/tasks)

*(You can also securely verify database port mapping mapped via your local network interface on `3307`).*

### Stopping the Application
To gracefully shut down the service containers:
```bash
docker-compose down
```
If you wish to completely wipe volumes (destroying the persisted database data):
```bash
docker-compose down -v
```

---
*Created for robust and scalable full-stack task administration.*