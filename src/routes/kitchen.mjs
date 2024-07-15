import express from "express"
import { KitchenController } from "../controllers/KitchenController.mjs"
import { AuthController } from "../controllers/AuthController.mjs"
import { STAFF_ROLE_KITCHEN, STAFF_ROLE_MANAGER, STAFF_ROLE_WAIT } from "../models/StaffModel.mjs";

const kitchenRoutes = express.Router()

kitchenRoutes.use(AuthController.hasSession);

kitchenRoutes.get(
    "/", 
    AuthController.restrictToStaff([STAFF_ROLE_KITCHEN, STAFF_ROLE_MANAGER]), 
    KitchenController.viewKitchenPage
);

kitchenRoutes.get(
    "/queue", 
    AuthController.restrictToStaff([STAFF_ROLE_KITCHEN, STAFF_ROLE_MANAGER]), 
    KitchenController.getKitchenQueue
);

kitchenRoutes.post("/queue/add", KitchenController.addToQueue)

kitchenRoutes.patch(
    "/queue/:queueNumber", 
    AuthController.restrictToStaff([STAFF_ROLE_KITCHEN, STAFF_ROLE_MANAGER]), 
    KitchenController.progressItemStatus
);

export default kitchenRoutes