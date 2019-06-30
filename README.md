# REST API with Node and Express

Simple REST API to store projects and tasks.

To start the server at `http://localhost:3000` run the following command:

```
yarn runserver
```

## Routes

- `POST - /projects/`

  - Add a new project
  - Inputs: `id`, `title`
  - Output: `{ id: "1", title: 'Project Title', tasks: [] }`

- `GET - /projects/`

  - List all the projects and tasks

- `PUT /projects/:id/`:

  - Update the title of the project `id`

- `DELETE /projects/:id/`:

  - Delete the project `id`

- `POST /projects/:id/tasks/`:
  - Stores a new task title in the project `id`
  - Inputs: `title`
