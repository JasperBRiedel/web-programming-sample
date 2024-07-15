import { DataModel } from "./DataModel.mjs";

export const BILL_STATUS_OPEN = "open";
export const BILL_STATUS_UNPAID = "unpaid";
export const BILL_STATUS_PAID = "paid";

export class BillModel extends DataModel {
    billNumber; // key - must be unique
    tableNumber;
    status;
    
    constructor(billNumber, tableNumber, status) {
        super();
        this.billNumber = billNumber;
        this.tableNumber = tableNumber;
        this.status = status
    }
}

BillModel.setDataSource([
    new BillModel(1721006726456, 32, BILL_STATUS_UNPAID),
    new BillModel(1721006736456, 12, BILL_STATUS_PAID),
    new BillModel(1721006746456, 21, BILL_STATUS_OPEN),
    new BillModel(1721006756456, 8, BILL_STATUS_OPEN),
]);