import { DataModel } from "./DataModel.mjs";

export const QUEUE_STATUS_PENDING = "pending";
export const QUEUE_STATUS_COOKING = "cooking";
export const QUEUE_STATUS_READY = "ready";
export const QUEUE_STATUS_SERVED = "served";

let nextQueueNumber = 1;

export class QueueModel extends DataModel {
    queueNumber; // Key - auto increment
    billNumber;
    tableNumber;
    productName;
    quantity;
    status;
    
    constructor(billNumber, tableNumber, productName, quantity, status) {
        super();
        this.queueNumber = nextQueueNumber++;
        this.billNumber = billNumber;
        this.tableNumber = tableNumber;
        this.productName = productName;
        this.quantity = quantity;
        this.status = status;
    }
}

QueueModel.setDataSource([]);