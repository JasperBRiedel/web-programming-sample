import express from "express"
import { AuthController } from "../controllers/AuthController.mjs";
import { KitchenController } from "../controllers/KitchenController.mjs";
import { STAFF_ROLE_MANAGER, STAFF_ROLE_WAIT } from "../models/StaffModel.mjs";

const billingRoutes = express.Router()

billingRoutes.get(
    "/", 
    AuthController.restrictToStaff([STAFF_ROLE_WAIT, STAFF_ROLE_MANAGER]), 
    KitchenController.viewBillingPage
);

export default billingRoutes