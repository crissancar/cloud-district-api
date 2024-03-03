.PHONY = build deps migrations migrations_tests seeds seeds_tests start start_infrastructure

# Build project
build:
	npm run build

# Install dependencies
deps:
	npm install

# Run TypeOrm migrations
migrations:
	npm run typeorm:migration:run

# Run TypeOrm migrations for tests
migrations_tests:
	npm run typeorm:migration:test:run

# Run TypeOrm seeds
seeds:
	npm run typeorm:seed:run

# Start app in dev environment
start:
	npm run start:dev:swc

# Build and start infrastructure
start_infrastructure:
	npm run docker:build

# Prepare database tables and data
prepare_database:
	npm run database:build

# Run tests
tests:
	npm run test

# Run sync tests
tests_sync:
	npm run test:sync

# Run acceptance tests
tests_acceptance:
	npm run test:acceptance

# Run sync acceptance tests
tests_acceptance_sync:
	npm run test:acceptance:sync

# Run unit tests
tests_unit:
	npm run test:unit

# Run sync unit tests
tests_unit_sync:
	npm run test:unit:sync

# Run integration tests
tests_integration:
	npm run test:integration

# Run sync integration tests
tests_integration_sync:
	npm run test:integration:sync

# Clean containers
clean:
	npm run docker:clean
