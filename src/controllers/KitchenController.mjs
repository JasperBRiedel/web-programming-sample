import { BILL_STATUS_UNPAID, BillModel } from "../models/BillModel.mjs";
import { QUEUE_STATUS_COOKING, QUEUE_STATUS_PENDING, QUEUE_STATUS_READY, QUEUE_STATUS_SERVED, QueueModel } from "../models/QueueModel.mjs";

export class KitchenController {
    static viewKitchenPage(req, res) {
        res.render("kitchen.ejs");
    }
    
    static getKitchenQueue(req, res) {
        const queueItems = QueueModel.select();
        res.json(queueItems);
    }
    
    static progressItemStatus(req, res) {
        const queueNumber = req.params.queueNumber;
        const currentStatus = req.body.status;
        
        const results = QueueModel.select(item => item.queueNumber == queueNumber);
        
        if (results.length == 1) {
            const queueItem = results[0];
            if (queueItem.status != currentStatus) {
                res.status(400).send("Status out of date")
                return;
            }

            if (queueItem.status == QUEUE_STATUS_PENDING) {
                queueItem.status = QUEUE_STATUS_COOKING;
            } else if (queueItem.status == QUEUE_STATUS_COOKING) {
                queueItem.status = QUEUE_STATUS_READY;
            } else if (queueItem.status == QUEUE_STATUS_READY) {
                queueItem.status = QUEUE_STATUS_SERVED;
            } else if (queueItem.status == QUEUE_STATUS_SERVED) {
                res.status(400).send("Item already served")
                return;
            } else {
                res.status(500).send("Invalid queue status");
                return;
            }

            // Save the updated item back to the model.
            QueueModel.update(item => item.queueNumber == queueNumber, queueItem)
            res.status(200).send();
        } else {
            res.status(400).send("Queue item not found");
            return;
        }
    }
    
    static addToQueue(req, res) {
        
        // TODO: Check session
        const { tableNumber, billNumber } = req.session.customer;
        
        // TODO: Validation of body
        const order = req.body

        for (const productWithQuantity of order) {
            const queueItem = new QueueModel(
                billNumber, 
                tableNumber,
                productWithQuantity.name,
                productWithQuantity.quantity,
                QUEUE_STATUS_PENDING
            )

            QueueModel.insert(queueItem);
        }
        
        res.status(200).send();
    }
}