# Task Manager
This is a not so simple task manager API built with NestJS, Prisma and SQLite.

## Installation
```bash
$ npm install
```

## Running the app
```bash
# development
$ npm run start
# watch mode
$ npm run start:dev
# production mode
$ npm run start:prod
```

## Test
```bash
# unit tests
$ npm run test
# e2e tests
$ npm run test:e2e
# test coverage
$ npm run test:cov
```

# Entity Relationship Diagram
```plantuml
@startuml
class Task {
  * id: number
  * title: string
  description: string
  status: TaskStatus
  user: User
}
class Goal {
  * id: number
  * title: string
  description: string
  tasks: Task[]
}
class User {
  * id: number
  * name: string
  avatar: string
  tasks: Task[]
}


Task }|--o{ User
Goal }|--|{ User
Goal }|--o{ Task