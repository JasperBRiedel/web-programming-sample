import express from "express"
import { MenuController } from "../controllers/menu.mjs"

const menuRoutes = express.Router()

menuRoutes.get("/", MenuController.viewMenu)
menuRoutes.get("/items", MenuController.getMenuItems)
menuRoutes.get("/items/:name", MenuController.getMenuItem)

export default menuRoutes