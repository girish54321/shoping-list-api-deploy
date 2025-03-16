import JWT = require('jsonwebtoken')
import createError = require('http-errors')
import bcrypt = require('bcrypt')

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(8)
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    } catch (error) {
        console.log("hashPassword Error", error);
        return null
    }
}

export const isValidPassword = async function (dbPassword, password) {
    try {
        return await bcrypt.compare(password, dbPassword)
    } catch (error) {
        console.log("isValidPassword Error", error);
        return null
    }
}

export const signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payLoad = {
            aud: userId
            // name: "Your name",
            // iss: "one.com"
        }
        const secret = process.env.ACCESS_TOKEN_SECRET
        const options = {
            expiresIn: "1h",
            issuer: "girish.com",
            // audience: userId
        }
        JWT.sign(payLoad, secret, options, (error, token) => {
            console.log("signAccessToken error", error);
            if (error) {
                return reject(createError.InternalServerError())
            }
            resolve(token)
        })
    })
}

export const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return next(createError.Unauthorized())
    }
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return next(createError.Unauthorized())
            } else {
                return next(createError.Unauthorized(err.message))
            }
        }
        req.payLoad = payload
        next()
    })
}

export const signRefreshToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payLoad = {}
        const secret = process.env.REFRESH_TOKEN_SECRET
        const options = {
            expiresIn: "1h",
            issuer: "girish.com",
            audience: userId
        }
        JWT.sign(payLoad, secret, options, (error, token) => {
            if (error) {
                return reject(createError.InternalServerError())
            }
            resolve(token)
        })
    })
}

export const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        const secret = process.env.REFRESH_TOKEN_SECRET
        JWT.verify(refreshToken, secret, (err, payload) => {
            if (err) return reject(createError.Unauthorized())
            const userId = payload.aud
            resolve(userId)
        })
    })
}
