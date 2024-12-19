# React and Node.js App

A full-stack application built with React (frontend) and Node.js (backend) to manage tasks.

## Features

### Task Management (To-Do List)

- **Task Creation**: Add new tasks to the to-do list with details like description and timestamp.
- **Task Filtering**: Filter tasks by their status (e.g., All, Completed, Incomplete).
- **Task Completion**: Toggle the completion status of tasks.
- **Task Deletion**: Remove tasks from the list.

## Application Structure

### Backend (Node.js)

- **Framework**: Express.js
- **Database ORM**: Sequelize
- **Routes**:
  - `/api/tasks`: CRUD endpoints for managing tasks.
- **Controllers**:
  - `TaskController.js`: Handles logic for task management.
- **Models**:
  - `Task.js`: Defines the schema for tasks.

### Frontend (React)

- **State Management**: React hooks
- **UI Library**: Material-UI (MUI)
- **Components**:
  - `TaskInput`: Input form for adding new tasks.
  - `TaskItem`: Individual task component with toggle and delete functionality.
  - `AppNavbar`, `SideMenu`, `Header`: Reusable layout components.

## API Endpoints

### Task Endpoints (Node.js)

- **`GET /api/tasks`**: Retrieve all tasks.
- **`POST /api/tasks`**: Create a new task.
- **`GET /api/tasks/:id`**: Retrieve a specific task by ID.
- **`PUT /api/tasks/:id`**: Update a task by ID.
- **`DELETE /api/tasks/:id`**: Delete a task by ID.

## Screenshots

![Screenshot 1](screenshots/tasks.png)

## Future Enhancements

- **User Authentication**: Add user login and registration.
- **Testing**: Add unit and integration tests.
