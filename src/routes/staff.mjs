import express from "express"
import { StaffController } from "../controllers/StaffController.mjs"
import { AuthController } from "../controllers/AuthController.mjs"
import { STAFF_ROLE_MANAGER } from "../models/StaffModel.mjs"

const staffRoutes = express.Router()

staffRoutes.get(
    ["/", "/:name"], 
    AuthController.restrictToStaff([STAFF_ROLE_MANAGER]), 
    StaffController.viewCRUDPage
)

staffRoutes.post(
    "/", 
    AuthController.restrictToStaff([STAFF_ROLE_MANAGER]), 
    StaffController.handleCRUDAction
)

export default staffRoutes