const {Router} = require("express")
const SessiosControllers = require("../controllers/SessiosControllers")

const sessionsRoutes = Router()
const sessionsControllers = new SessiosControllers()

sessionsRoutes.post("/", sessionsControllers.create)


module.exports = sessionsRoutes

