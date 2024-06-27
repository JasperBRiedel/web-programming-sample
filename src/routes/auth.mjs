import express from "express"
import { AuthController } from "../controllers/AuthController.mjs"

const authenticationRoutes = express.Router()

authenticationRoutes.get("/login", AuthController.viewLoginPage)
authenticationRoutes.post("/login", AuthController.loginUser)
authenticationRoutes.post("/logout", AuthController.hasSession, AuthController.logoutUser)

export default authenticationRoutes