import express from "express"
import { AuthenticationController } from "../controllers/auth.mjs"

const authenticationRoutes = express.Router()

authenticationRoutes.get("/login", AuthenticationController.viewLogin)
authenticationRoutes.post("/login", AuthenticationController.loginUser)
authenticationRoutes.post("/logout", AuthenticationController.logoutUser)

export default authenticationRoutes