export class BillController {
    static finaliseBill(tableNumber, billNumber) {
        const filter = bill => 
            bill.tableNumber == tableNumber && bill.billNumber == billNumber

        const results = BillModel.select(filter);
        
        if (results.length > 0) {
            const bill = results[0];
            bill.status = BILL_STATUS_UNPAID;
            BillModel.update(filter, bill);
        }
    }
}