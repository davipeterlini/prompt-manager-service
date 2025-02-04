# NestJS Clean Architecture Example

This project is an example of a backend application built with NestJS, following clean code and clean architecture principles, and using SOLID principles.

## Setup

To set up the application, run the following commands:

```bash
yarn install
```

## Running the application locally

To run the application locally, use the following command:

```bash
yarn start:dev
```

## Running unit tests

To run the unit tests, use the following command:

```bash
yarn test
```

## Building the application

To build the application and generate the executable binary, use the following command:

```bash
yarn build
```

## Project Structure

The project follows a modular structure, with each feature separated into its own module. The main directories and files are as follows:

- `src/`: Contains the source code of the application
  - `modules/`: Contains the feature modules
  - `main.ts`: The entry point of the application
- `test/`: Contains the unit tests
- `Dockerfile`: Docker configuration for building the application container
- `docker-compose.yml`: Docker Compose configuration for running the application in a container
- `.huskyrc`: Husky configuration for commit validation
- `commitlint.config.js`: Commitlint configuration for enforcing commit message conventions
- `.github/workflows/ci.yml`: GitHub Actions workflow for CI pipeline

## Folder and File Structure

- `src/`
  - `modules/`
    - `example/`
      - `example.controller.ts`
      - `example.module.ts`
      - `example.service.ts`
  - `main.ts`
- `test/`
  - `example/`
    - `example.service.spec.ts`
- `Dockerfile`
- `docker-compose.yml`
- `.huskyrc`
- `commitlint.config.js`
- `.github/workflows/ci.yml`

## Logical Mechanisms

The application is built using NestJS, which provides a modular architecture and dependency injection. Each feature is implemented as a separate module, with its own controller, service, and module files. The application uses SOLID principles to ensure maintainability and scalability.

- **Single Responsibility Principle**: Each class and module has a single responsibility.
- **Open/Closed Principle**: Modules are open for extension but closed for modification.
- **Liskov Substitution Principle**: Derived classes can be substituted for their base classes.
- **Interface Segregation Principle**: Interfaces are client-specific and not bloated.
- **Dependency Inversion Principle**: High-level modules do not depend on low-level modules; both depend on abstractions.

## Docker

The application can be run in a Docker container using the provided `Dockerfile` and `docker-compose.yml` files. To build and run the application in a container, use the following commands:

```bash
docker-compose up --build
```