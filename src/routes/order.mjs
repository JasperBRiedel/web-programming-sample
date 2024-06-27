import express from "express"
import { OrderController } from "../controllers/OrderController.mjs"

const orderRoutes = express.Router()

orderRoutes.post("/", OrderController.addToOrder)
orderRoutes.patch("/kitchen/queue/:queueNumber", OrderController.setNextQueueItemStatus);
orderRoutes.get("/kitchen/queue", OrderController.getKitchenQueue);
orderRoutes.get("/kitchen", OrderController.viewKitchenPage);
orderRoutes.get("/bill", OrderController.viewBillingPage);

export default orderRoutes