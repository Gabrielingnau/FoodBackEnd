const {Router} = require("express")
const IngredientsControllers = require("../controllers/IngredientsController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const ingredientsRoutes = Router()
const ingredientsControllers = new IngredientsControllers()

ingredientsRoutes.get("/",ensureAuthenticated, ingredientsControllers.index)

module.exports = ingredientsRoutes

