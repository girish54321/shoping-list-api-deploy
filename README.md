# 🛒 Shopping List API Backend

A backend service built with **Node.js**, **Express**, and **Sequelize** to manage shopping lists and tasks efficiently. It provides RESTful APIs for CRUD operations and integrates seamlessly with frontend applications.

## 📸 Screenshots

![App Screenshot](./assets/screenshot.png) <!-- Replace with actual screenshot path -->

## 🚀 Features

- User registration and authentication
- Create, read, update, and delete shopping list items
- Image upload support for tasks and profiles
- PostgreSQL database integration
- Sequelize ORM with migration support
- Environment-based configuration

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/girish54321/shoping-list-api-deploy.git
   cd shoping-list-api-deploy
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Configure the database**

   - Ensure PostgreSQL is installed and running.
   - Update the `development` object in `config/config.json` with your database credentials.

4. **Run migrations**

   ```bash
   yarn sequelize-cli db:migrate
   ```

5. **Start the development server**

   ```bash
   yarn dev
   ```

## 📂 Project Structure

```
├── config/             # Database configurations
├── migrations/         # Sequelize migration files
├── models/             # Sequelize models
├── src/                # Source code (routes, controllers)
├── profileimage/       # Uploaded profile images
├── todoimages/         # Uploaded task images
├── .env                # Environment variables
├── package.json        # Project metadata and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## 📡 API Endpoints

| Method | Endpoint            | Description                  |
|--------|---------------------|------------------------------|
| POST   | `/api/register`     | Register a new user          |
| POST   | `/api/login`        | Authenticate a user          |
| GET    | `/api/tasks`        | Retrieve all tasks           |
| POST   | `/api/tasks`        | Create a new task            |
| PUT    | `/api/tasks/:id`    | Update an existing task      |
| DELETE | `/api/tasks/:id`    | Delete a task                |
| POST   | `/api/upload`       | Upload an image              |

> **Note:** Ensure to include authentication headers where required.

## 🧪 Testing

You can use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test the API endpoints.

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

## 🙌 Acknowledgements

Thanks to [Girish Parate](https://github.com/girish54321) for developing and maintaining this project.
