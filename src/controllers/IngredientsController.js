
const knex = require("../database/knex")

class IngredientsController {
    async index(request, response) {
        const  user_id  = request.user.id

        const ingredients = await knex("ingredients").where( {user_id} )

        return response.json(ingredients)
    }
    async delete(request, response) {
        const { id } = request.params

       const ingredients = await knex("ingredients").where({ id }).delete()

       if(!ingredients) {
        throw new AppError("Não foi encontrado o ingrediente!");
       }

        return response.json()
    }
}

module.exports = IngredientsController