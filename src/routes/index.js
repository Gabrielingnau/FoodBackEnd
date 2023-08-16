const {Router} = require("express")

const routes = Router()

const usersRoutes = require("./users.routes")
const productsRoutes = require("./products.routes")
const ingredientsRoutes = require("./ingredients.routes")
const sessionsRoutes = require("./sessions.routes")

routes.use("/users", usersRoutes)
routes.use("/products", productsRoutes)
routes.use("/ingredients", ingredientsRoutes)
routes.use("/sessions", sessionsRoutes)

module.exports = routes