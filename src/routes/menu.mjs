import express from "express"
import { MenuController } from "../controllers/MenuController.mjs"
import { AuthController } from "../controllers/AuthController.mjs"

const menuRoutes = express.Router()

menuRoutes.get("/", AuthController.hasSession, MenuController.viewMenuPage)
menuRoutes.get("/products", MenuController.getProductsJSON)
menuRoutes.get("/products/:name", MenuController.viewProductPartial)

export default menuRoutes