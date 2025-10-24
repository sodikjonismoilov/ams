# ===== BUILD STAGE =====
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml ./
RUN mvn -q -e -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -e -DskipTests package

# ===== RUNTIME STAGE =====
FROM eclipse-temurin:21-jre
WORKDIR /app
ENV JAVA_OPTS=""
# we'll override DB URL via env in compose later
ENV SPRING_DATASOURCE_URL=""
ENV SPRING_DATASOURCE_USERNAME=""
ENV SPRING_DATASOURCE_PASSWORD=""
COPY --from=build /app/target/*.war app.war
EXPOSE 8080
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar app.war"]
