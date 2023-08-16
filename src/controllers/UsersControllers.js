const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const {hash, compare} = require("bcryptjs")

class UsersControllers {
    async create(request, response) {
        const {name, email, password} = request.body 

        const database = await sqliteConnection()
        const hashedPassword = await hash(password, 8)

        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
        

        if(checkUserExists) {
            throw new AppError("Este email ja esta em uso");
        }

        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

        return response.status(201).json()
    }

    async update(request, response) {
        const {name, email, password, oldPassword} = request.body 
        const user_id = request.user.id

        const database = await sqliteConnection()

        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

        if(!user) {
            throw new AppError("Usuario não encontrado");
        }

        const userWidthUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
        console.log(userWidthUpdateEmail.id)
        console.log(user.id)
        if(userWidthUpdateEmail && userWidthUpdateEmail.id !== user.id) {
            throw new AppError("Este email já esta em uso");
        }

        user.name = name ?? user.name,
        user.email = email ?? user.email

        if(password && !oldPassword) {
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha.");
        }

        if(password && oldPassword) {
            const checkOldPassword = await compare(oldPassword, user.password)
            if(!checkOldPassword) {
                throw new AppError("A senha antiga não confere.");
            }

            user.password = await hash(password, 8)
        }

        await database.run(`
        UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now')
        WHERE id = ?`,
        [user.name, user.email, user.password, user_id]
        )

        return response.status(201).json()
    }
}

module.exports = UsersControllers