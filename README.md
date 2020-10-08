# hotelbookerfrontend
hotelbookerfrontend is the frontend for Java's hotelbookerbackend

General Info ====
clone the Angular9 project and go to the root folder src:
mvn clean install -Dmaven.test.skip=true
mvn spring-boot:run
The server runs on port 8085, and try the next url: http://localhost:8085/client

There are three Spring Profiles: dev, prod and test

The application profile is set to test, running on an H2 database with some preloaded data

The counterpart of this application is the Angular9 frontend application:

hotelbookerfrontend
