const {Router} = require("express")
const ProductsControllers = require("../controllers/ProductsControllers")
const ProductAvatarController = require('../controllers/ProductAvatarController')
const ensureAuthenticated = require("../middleware/ensureAuthenticated")
const uploadConfig = require("../configs/upload")
const multer = require("multer")

const productsRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const productsControllers = new ProductsControllers()
const productAvatarController = new ProductAvatarController()

productsRoutes.use(ensureAuthenticated)

productsRoutes.get("/", productsControllers.index)
productsRoutes.post("/", upload.single("avatar"), productsControllers.create)
productsRoutes.get("/:id", productsControllers.show)
productsRoutes.delete("/:id",  productsControllers.delete)
productsRoutes.put("/:id", productsControllers.update)
productsRoutes.patch("/:id", upload.single("avatar"), productAvatarController.update)


module.exports = productsRoutes

