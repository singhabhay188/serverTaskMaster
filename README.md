# Task Management GraphQL API

A GraphQL-based API for managing tasks with CRUD operations.

## Schema

### Types

```graphql
enum Status {
  PENDING
  IN_PROGRESS
  COMPLETED
}

type Task {
  id: ID!
  title: String!
  description: String
  status: Status
  dueDate: String
}
```

## Queries

### Get All Tasks

```graphql
query {
  tasks {
    id
    title
    description
    status
    dueDate
  }
}
```

### Get Task by ID

```graphql
query {
  taskById(id: "task_id") {
    id
    title
    description
    status
    dueDate
  }
}
```

## Mutations

### Create Task

```graphql
mutation {
  createTask(
    title: "Task Title"
    description: "Task Description"
    dueDate: "2024-01-01"
  ) {
    id
    title
    description
    status
    dueDate
  }
}
```

### Update Task

```graphql
mutation {
  updateTask(
    id: "task_id"
    title: "Updated Title"
    description: "Updated Description"
    status: "IN_PROGRESS"
    dueDate: "2024-01-02"
  ) {
    id
    title
    description
    status
    dueDate
  }
}
```

### Delete Task

```graphql
mutation {
  deleteTask(id: "task_id")
}
```

## API Features

- **Task Management**: Complete CRUD operations for tasks
- **Status Tracking**: Tasks can be marked as PENDING, IN_PROGRESS, or COMPLETED
- **Due Date Handling**: Optional due dates with validation
- **Error Handling**: Comprehensive error messages for invalid operations

## Technical Details

- Built with TypeScript and GraphQL
- Uses Prisma as ORM
- Includes input validation and error handling
- ISO string format for dates
