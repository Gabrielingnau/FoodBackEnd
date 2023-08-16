const {verify} = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfigs = require("../configs/auth")

function ensureAuthenticated(request, response, next) {

    const authHeader = request.headers.authorization

    if(!authHeader) {
        throw new AppError("JWT esquecido, reinicie o site", 401)
    }

    const [, token] = authHeader.split(" ")

    try{
        const {sub: user_id} = verify(token, authConfigs.jwt.secret)

        request.user = {
            id: Number(user_id)
        }

        return next()
    }catch{
        if(!authHeader) {
            throw new AppError("JWT invalido", 401)
        }
    }
}

module.exports = ensureAuthenticated