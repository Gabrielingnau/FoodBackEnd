const AppError = require("../utils/AppError");
const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")

class ProductsControllers {
    async create(request, response) {
        const {title, category, description, ingredients, value } = request.body 

        const user_id = request.user.id

        const diskStorage = new DiskStorage()

        const avatar = await diskStorage.saveFile(request.file.filename)

        if(!title) {
            throw new AppError("Voçe precisa colocar um titulo para o produto!");
        }
        if(!category) {
            throw new AppError("Voçe precisa colocar uma categoria para o produto!");
        }
        if(!description) {
            throw new AppError("Voçe precisa colocar uma descrição para o produto!");
        }
        if(!value) {
            throw new AppError("Voçe precisa colocar um valor para o produto!");
        }
        if(!ingredients) {
            throw new AppError("Voçe precisa adicionar um indiente para o produto!");
        }
        if(avatar == null) {
            throw new AppError("Voçe precisa adicionar uma imagem para o produto!");
        }
        
        const [product_id] =  await knex("products").insert({
            avatar,
            title,
            description,
            value,
            category,
            user_id
        })
 

        const OneIngredient = typeof(ingredients) === "string";

        let ingredientsInsert
        
        if (OneIngredient) {
          ingredientsInsert = {
            name: ingredients,
            product_id,
            user_id
          }
    
        } else if (ingredients.length > 1) {
          ingredientsInsert = ingredients.map(ingredient => 
            ({
              name : ingredient,
              product_id,
              user_id
            })
          );
    
        } else {
          return 
        }

        await knex("ingredients").insert(ingredientsInsert)
          

        return response.status(201).json()
    }

    async show(request, response) {
        const { id } = request.params

        const product = await knex("products").where({ id }).first()
        const ingredients = await knex("ingredients").where({ product_id: id }).orderBy("name");

        return response.json({
            ...product,
            ingredients
        })
    }

    async delete(request, response) {
        const { id } = request.params

       const products = await knex("products").where({ id }).delete()

       if(!products) {
        throw new AppError("Não foi encontrado o produto o produto!");
       }

        return response.json()
    }

   async index(request, response){
        const { title, ingredients } = request.query
        
        let producte

        if(ingredients){
            const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim())

            producte = await knex("ingredients")
            .select([
                "products.id",
                "products.title",
            ])
            .whereLike("products.title", `%${title}%`)
            .whereIn("name", filterIngredients)
            .innerJoin("products", "products.id", "ingredients.product_id")
            .orderBy("products.title")

        }else{
            producte = await knex("products")
            .whereLike("title", `%${title}%`)
            .orderBy("title")
        }
        
        const userIngredients = await knex("ingredients")
        const productsWithIngredients = producte.map(product => {
            const productIngredients = userIngredients.filter( ingredient => ingredient.product_id === product.id)
           

            return {
                ...product,
                ingredients: productIngredients
            }
        })
       
        return response.json(productsWithIngredients)
    } 

   async update(request, response){
        const { title, description, value, category, ingredients } = request.body;
        const { id } = request.params
     
        // Adicionando na constante products o primeiro dado encontrado par ao id      passado como params
        const products = await knex("products").where({ id }).first();
        
        if(!products){
            throw new AppError("O prato que você está tentando atualizar não existe")
        }
        

     
        products.title = title ?? products.title;
        products.description = description ?? products.description;
        products.value = value ?? products.value;
        products.category = category ?? products.category;

        const ingredientsInsert = await ingredients.map(ingredient => ({
            name: ingredient,
            product_id: products.id
        }))
     
        await knex("products").where({ id }).update(products)
        await knex("products").where({ id }).update("updated_at", knex.fn.now());
        await knex("ingredients").where({product_id: id }).delete();
        await knex("ingredients").where({ product_id: id }).insert(ingredientsInsert)
      
        return response.status(202).json('Prato atualizado com sucesso')
    }
}

module.exports = ProductsControllers