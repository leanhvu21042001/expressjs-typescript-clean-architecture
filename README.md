# Express Server with Prisma ORM and TypeScript, Clean Architecture and SOLID principles

## Prerequisites

- Node.js version 20.x or higher

## Run project

> For Production: Copy `.env.example` to `.env` and fill in the necessary environment variables.
> For Development: Copy `.env.example` to `.env.development` and fill in the necessary environment variables.

```
# install packages
npm install

# push sqlite db
npx prisma db push

# prisma studio check
npx prisma studio

# run project in development
npm run dev
```

## Project Structure

```
├───.vscode
├───api-test
├───db
├───prisma
└───src
    ├───application
    │   └───usecases
    │       ├───create-product
    │       ├───create-user
    │       └───list-product
    ├───domain
    │   ├───address
    │   │   ├───entity
    │   │   └───gateway
    │   ├───product
    │   │   ├───entity
    │   │   └───gateway
    │   └───user
    │       ├───entity
    │       └───gateway
    └───infrastructure
        ├───api
        │   ├───express
        │   │   └───routes
        │   │       └───product
        │   └───fastify
        │       └───routes
        │           └───product
        ├───database
        │   ├───knex
        │   └───prisma
        └───repositories
            └───product
```
