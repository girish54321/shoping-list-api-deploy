require('dotenv').config();
import express = require('express');
import { sequelize } from '../models';
import morgan = require('morgan');
import createError = require('http-errors');
import authRoute from './route/authRoute';
import shopRoute from './route/shopListRoute';
import { verifyAccessToken } from './helper/jwthelper';
const app = express()
//* Let Server Image
app.use('/todoimages', express.static('todoimages'))
app.use('/file', express.static('file'))
app.use('/profileimage', express.static('profileimage'))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 2000
//* Routs
app.use("/api/v1/auth", authRoute)
//* Create User Shop List
app.use("/api/v1/shoplist", verifyAccessToken, shopRoute)
app.use((req, res, next) => {
    next(createError.BadRequest())
})
app.use(async (req, res, next) => {
    next(createError.NotFound())
})

app.use(async (error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        error: {
            status: error.status || 500,
            message: error.message
        }
    });
    next(); // Call next to pass control to the next middleware
});

const start = async () => {
    try {
        await sequelize.authenticate()
        app.listen(PORT, () => {
            console.log(`Server Stated at: ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()
// yarn sequelize-cli model:generate --name CommonItem --attributes itemName:string,description:string,quantity:integer,price:integer