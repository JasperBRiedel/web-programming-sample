export const BILL_STATUS_UNPAID = "unpaid";
export const BILL_STATUS_PAID = "PAID";

export class Bill extends Model {
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