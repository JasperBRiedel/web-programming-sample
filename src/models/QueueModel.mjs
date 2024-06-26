import { DataModel } from "./DataModel.mjs";

export const QUEUE_STATUS_WAITING = "waiting";
export const QUEUE_STATUS_COOKING = "cooking";
export const QUEUE_STATUS_READY = "ready";

export class QueueModel extends DataModel {
    billNumber;
    productName;
    quantity;
    status;
    
    constructor(billNumber, productName, quantity, status) {
        super();
        this.billNumber = billNumber;
        this.productName = productName;
        this.quantity = quantity;
        this.status = status;
    }
}