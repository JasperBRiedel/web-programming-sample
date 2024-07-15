import express from "express"
import { OrderController } from "../controllers/OrderController.mjs"
import { AuthController } from "../controllers/AuthController.mjs"
import { STAFF_ROLE_KITCHEN, STAFF_ROLE_MANAGER, STAFF_ROLE_WAIT } from "../models/StaffModel.mjs";

const orderRoutes = express.Router()

orderRoutes.use(AuthController.hasSession);

orderRoutes.post("/", OrderController.addToOrder)

orderRoutes.patch(
    "/kitchen/queue/:queueNumber", 
    AuthController.restrictToStaff([STAFF_ROLE_KITCHEN, STAFF_ROLE_MANAGER]), 
    OrderController.setNextQueueItemStatus
);

orderRoutes.get(
    "/kitchen/queue", 
    AuthController.restrictToStaff([STAFF_ROLE_KITCHEN, STAFF_ROLE_MANAGER]), 
    OrderController.getKitchenQueue
);

orderRoutes.get(
    "/kitchen", 
    AuthController.restrictToStaff([STAFF_ROLE_KITCHEN, STAFF_ROLE_MANAGER]), 
    OrderController.viewKitchenPage
);

orderRoutes.get(
    "/bill", 
    AuthController.restrictToStaff([STAFF_ROLE_WAIT, STAFF_ROLE_MANAGER]), 
    OrderController.viewBillingPage
);

export default orderRoutes