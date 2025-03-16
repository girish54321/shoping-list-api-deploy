import { Router } from 'express'
import { login, createAccount } from '../controller/authController'
const authRoute = Router()

authRoute.post("/signup", createAccount)
authRoute.post("/login", login)

export default authRoute
