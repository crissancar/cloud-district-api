<div align="center">
  <h1>Cloud District API</h1>

  <p>
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
    <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white">
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
    <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white">
    <img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white">
  </p>
</div>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Technologies and skills](#technologies-and-skills)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Infrastructure](#infrastructure)
    * [Environment](#environment)
    * [Database](#database)
    * [Running the app](#running-the-app)
    * [Running the tests (async)](#running-the-tests-async)
    * [Running the tests (sync)](#running-the-tests-sync)
* [Documentation](#documentation)

<!-- Technologies -->
## Technologies and skills
As **technologies and tools**, this API uses:
- **NestJS** as development framework
- **PostgreSQL** as database
- **Jest** as testing tool
- **Swagger** as API documentation tool
- **Sendgrid** as mailer

As **skills and best practices**, this API uses:
- **Clean Code**
- **SOLID**
- **Design Patterns**
- **Testing strategy** with acceptance, unit and integration tests
- **Modular monolith**
- **Hexagonal architecture**

<!-- GETTING STARTED -->
## Getting Started

This is an instructions on setting up the project locally.

### Prerequisites
Have **node** and **nvm** installed. Use minimum version **16**.
```bash
$ nvm use 20.11.1
```
Install **make** (optional)
```bash
$ apt-get update
```
```bash
$ apt-get install make
```
_or_
```bash
$ apt-get install --reinstall make
```

### Installation

1. Clone repository
```bash
$ git clone https://github.com/crissancar/cloud-district-api
```
2. Install dependencies
```bash
$ make deps
```
_or_
```bash
$ npm install
```

### Infrastructure
This command builds and starts the project infrastructure with **Docker**.

```bash
$ make start_infrastructure
```
_or_
```bash
$ npm run docker:build
```

### Environment
Copy the ```.env``` and ```.env.test``` files into the root directory.

### Database
This command creates databases, tables and inserts records.
```bash
$ make prepare_database
```
_or_
```bash
$ npm run database:build
```

### Running the app
```bash
$ make start
```
_or_
```bash
$ npm run start:dev
```

### Running the tests (async)
#### All tests
```bash
$ make tests
```
_or_
```bash
$ npm run test
```
#### Acceptance tests
```bash
$ make tests_acceptance
```
_or_
```bash
$ npm run test:acceptance
```
#### Unit tests
```bash
$ make tests_unit
```
_or_
```bash
$ npm run test:unit
```
#### Integration tests
```bash
$ make tests_integration
```
_or_
```bash
$ npm run test:integration
```

### Running the tests (sync)
#### All tests
```bash
$ make tests_sync
```
_or_
```bash
$ npm run test:sync
```
#### Acceptance tests
```bash
$ make tests_acceptance_sync
```
_or_
```bash
$ npm run test:acceptance:sync
```
#### Unit tests
```bash
$ make tests_unit_sync
```
_or_
```bash
$ npm run test:unit:sync
```
#### Integration tests
```bash
$ make tests_integration_sync
```
_or_
```bash
$ npm run test:integration:sync
```

<!-- DOCUMENTATION -->
## Documentation
-  [NestJS](https://docs.nestjs.com/)
