# My ToDo App (Backend)

[![GitHub license](https://img.shields.io/github/license/girish54321/My-Wall)](https://github.com/girish54321/My-Wall/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/girish54321/My-Wall)](https://github.com/girish54321/My-Wall/issues)
[![GitHub stars](https://img.shields.io/github/stars/girish54321/My-Wall)](https://github.com/girish54321/My-Wall/stargazers)

About the App

My ToDo App (Backend) is a backend service built with Node.js, Express, and Sequelize. a ToDo app designed to help users manage their tasks efficiently. This backend provides RESTful APIs to handle CRUD operations for tasks and integrates seamlessly with the frontend application.

[Todo App](https://github.com/girish54321/To-Do-React-Native/tree/main)

## Screenshots

<img width="1604"  src="appimage/appbanner.png?raw=true">

## Installation

- Clone the reop
- run `yarn` to install node packages
- Update `development` obj in `config/config.json` according to your local / Server
- Setup this `postgresql` on your system
- This project is using `sequelize` & `sequelize-cli` to help create tables
- run `yarn sequelize-cli db:migrate` for more help check `sequelize-cli` [docs](https://sequelize.org/docs/v7/cli/#running-migrations)
- run `yarn dev` to start the sever

## EndPoints

### Auth

```
http://localhost:5000/api/v1/auth/signup
```

```
http://localhost:5000/api/v1/auth/login
```

### Todo

```
http://localhost:5000/api/v1/todo/addtodo
```

```
http://localhost:5000/api/v1/todo/updatetodo
```

```
http://localhost:5000/api/v1/todo/gettodo
```

```
http://localhost:5000/api/v1/todo/gettodo:id
```

```
http://localhost:5000/api/v1/todo/deletetodo:id
```
