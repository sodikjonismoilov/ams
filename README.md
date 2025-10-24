# AMS - Attendance Management System

A full-stack web application for managing attendance with a modern tech stack featuring Spring Boot backend and React frontend.

## 🚀 Tech Stack

### Backend
- **Java 21** - Programming language
- **Spring Boot 3.5.6** - Application framework
- **Spring Data JPA** - Data persistence
- **Spring Security** - Authentication & authorization
- **Hibernate** - ORM framework
- **MySQL 8.4** - Relational database
- **Flyway** - Database migration tool
- **Thymeleaf** - Server-side template engine
- **Maven** - Build automation tool
- **Lombok** - Reduces boilerplate code
- **Spring Boot Actuator** - Application monitoring

### Frontend
- **React 19.1** - UI library
- **Vite 7.1** - Build tool & development server
- **TailwindCSS 4.1** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
  - Radix UI primitives
  - Class Variance Authority
  - clsx & tailwind-merge
- **Lucide React** - Icon library
- **next-themes** - Dark mode support
- **Sonner** - Toast notifications
- **ESLint** - Code linting

### DevOps & Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Multi-stage Dockerfile** - Optimized image builds

## 📋 Prerequisites

- Java 21 or higher
- Maven 3.9+
- Node.js 18+ and npm/yarn
- Docker & Docker Compose
- MySQL 8.4 (if running without Docker)

## 🛠️ Installation & Setup

### Option 1: Running with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ams
   ```

2. **Build the backend Docker image**
   ```bash
   docker build -t ams-backend:latest .
   ```

3. **Start all services**
   ```bash
   docker-compose up -d
   ```

4. **Install frontend dependencies**
   ```bash
   cd ams_frontend
   npm install
   ```

5. **Start the frontend development server**
   ```bash
   npm run dev
   ```

The application will be available at:
- Backend API: `http://localhost:8080`
- Frontend: `http://localhost:5173` (default Vite port)
- MySQL: `localhost:3306`

### Option 2: Running Locally

1. **Set up MySQL Database**
   ```bash
   mysql -u root -p
   CREATE DATABASE attendance_db;
   CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'app_pass';
   GRANT ALL PRIVILEGES ON attendance_db.* TO 'app_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

2. **Update application.properties**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/attendance_db
   spring.datasource.username=app_user
   spring.datasource.password=app_pass
   ```

3. **Build and run the backend**
   ```bash
   ./mvnw clean package
   ./mvnw spring-boot:run
   ```

4. **Set up and run the frontend**
   ```bash
   cd ams_frontend
   npm install
   npm run dev
   ```

## 📁 Project Structure

```
ams/
├── src/
│   ├── main/
│   │   ├── java/com/acme/ams/     # Java source code
│   │   ├── resources/
│   │   │   ├── application.properties
│   │   │   ├── static/            # Static resources
│   │   │   └── templates/         # Thymeleaf templates
│   │   └── webapp/
│   └── test/                      # Test files
├── ams_frontend/                  # React frontend
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── lib/                  # Utility functions
│   │   └── App.jsx               # Main app component
│   ├── public/                   # Public assets
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── Dockerfile                    # Backend Docker configuration
├── docker-compose.yml           # Multi-container setup
├── pom.xml                      # Maven configuration
└── README.md
```

## 🐳 Docker Configuration

The project uses a multi-stage Dockerfile for optimized builds:
- **Build stage**: Uses Maven to compile and package the application
- **Runtime stage**: Minimal JRE image for running the application

Docker Compose orchestrates:
- MySQL 8.4 database with health checks
- Spring Boot backend with automatic dependency on healthy database

## 🔧 Available Scripts

### Backend
```bash
./mvnw clean install          # Build the project
./mvnw spring-boot:run        # Run the application
./mvnw test                   # Run tests
./mvnw package -DskipTests    # Package without tests
```

### Frontend
```bash
npm run dev                   # Start development server
npm run build                 # Build for production
npm run preview               # Preview production build
npm run lint                  # Run ESLint
```

### Docker
```bash
docker-compose up -d          # Start all services in background
docker-compose down           # Stop all services
docker-compose logs -f        # Follow logs
docker-compose ps             # List running containers
```

## 🌐 Environment Variables

### Backend (Docker)
- `SPRING_DATASOURCE_URL` - Database connection URL
- `SPRING_DATASOURCE_USERNAME` - Database username
- `SPRING_DATASOURCE_PASSWORD` - Database password
- `JAVA_OPTS` - Additional JVM options

### Database (Docker)
- `MYSQL_DATABASE` - Database name
- `MYSQL_USER` - Application database user
- `MYSQL_PASSWORD` - Application user password
- `MYSQL_ROOT_PASSWORD` - Root password

## 📝 Features

- User authentication and authorization
- Attendance tracking and management
- RESTful API architecture
- Responsive modern UI with dark mode support
- Database migrations with Flyway
- Health monitoring with Spring Actuator
- Containerized deployment

## 🔒 Security

- Spring Security for authentication
- Password encryption
- CSRF protection
- Role-based access control

## 📦 Building for Production

### Backend
```bash
./mvnw clean package -DskipTests
```
The WAR file will be generated in `target/ams-0.0.1-SNAPSHOT.war`

### Frontend
```bash
cd ams_frontend
npm run build
```
The optimized production files will be in `ams_frontend/dist/`

## 🐛 Troubleshooting

### Backend container fails to start
- Check if the Docker image was built correctly: `docker images | grep ams-backend`
- View backend logs: `docker logs ams-backend-1`
- Ensure MySQL is healthy: `docker ps`

### Database connection issues
- Verify MySQL is running and healthy
- Check connection credentials in `docker-compose.yml` or `application.properties`
- Ensure correct port mapping (3306 for MySQL)

### Frontend not connecting to backend
- Verify backend is running on `http://localhost:8080`
- Check CORS configuration in Spring Boot
- Ensure API endpoints are correctly configured

## 📄 License

[Your License Here]

## 👥 Contributors

[Your Name/Team]

## 📞 Contact

[Your Contact Information]
