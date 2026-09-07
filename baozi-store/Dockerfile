FROM maven:3.9.11-eclipse-temurin-21-alpine AS build

WORKDIR /workspace

COPY pom.xml ./
RUN mvn -B -DskipTests dependency:go-offline

COPY src ./src
RUN mvn -B -DskipTests package \
    && cp target/baozi-store-*.jar app.jar

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

RUN addgroup -S baozi \
    && adduser -S baozi -G baozi

COPY --from=build --chown=baozi:baozi /workspace/app.jar app.jar

USER baozi

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
