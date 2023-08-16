const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { compare } = require("bcryptjs")
const authConfigs = require("../configs/auth")
const {sign} = require("JsonWebToken")

class SessiosControllers {
    async create(request, response) {
        const {email, password} = request.body

        const user = await knex("users").where({ email }).first()
        
        if(!user ){
            throw new AppError("Email e/ou senha incorreta, por favor tente novamente", 401)
        }
        
        const passworMatched = await compare(password, user.password)

        if(!passworMatched ){
            throw new AppError("Email e/ou senha incorreta, por favor tente novamente", 401)
        }

        const { secret, expiresIn } = authConfigs.jwt
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return response.json({user, token})
    }
}

module.exports = SessiosControllers