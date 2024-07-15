import express from "express"
import { AuthController } from "../controllers/AuthController.mjs";
import { STAFF_ROLE_MANAGER, STAFF_ROLE_WAIT } from "../models/StaffModel.mjs";
import { BillingController } from "../controllers/BillingController.mjs";

const billingRoutes = express.Router()

billingRoutes.get(
    "/", 
    AuthController.restrictToStaff([STAFF_ROLE_WAIT, STAFF_ROLE_MANAGER]), 
    BillingController.viewBillingPage
);

billingRoutes.get(
    "/bills",
    AuthController.restrictToStaff([STAFF_ROLE_WAIT, STAFF_ROLE_MANAGER]), 
    BillingController.getBillsJSON
)

billingRoutes.get(
    "/bills/:billNumber", 
    BillingController.getBillDetailsPartial    
)

billingRoutes.patch(
    "/bills/:billNumber", 
    AuthController.restrictToStaff([STAFF_ROLE_WAIT, STAFF_ROLE_MANAGER]), 
    BillingController.updateBillStatus
);


export default billingRoutes