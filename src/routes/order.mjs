import express from "express"
import { OrderController } from "../controllers/OrderController.mjs"
import { AuthController } from "../controllers/AuthController.mjs"

const orderRoutes = express.Router()

orderRoutes.use(AuthController.hasSession);

orderRoutes.post("/", OrderController.addToOrder)
orderRoutes.patch("/kitchen/queue/:queueNumber", OrderController.setNextQueueItemStatus);
orderRoutes.get("/kitchen/queue", OrderController.getKitchenQueue);
orderRoutes.get("/kitchen", OrderController.viewKitchenPage);
orderRoutes.get("/bill", OrderController.viewBillingPage);

export default orderRoutes