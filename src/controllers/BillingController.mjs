import { BILL_STATUS_UNPAID, BillModel } from "../models/BillModel.mjs";

export class BillingController {
    static viewBillingPage(req, res) {
        res.render("billing.ejs")
    }
    
    static getBillsJSON(req, res) {
        const statusFilter = req.query.statusFilter
        const search = req.query.search

        // Filter by status and search (bill or table number). Do not 
        // filter if not provided (i.e., return true if null)
        const bills = BillModel.select(
            bill => 
                (statusFilter ? bill.status == statusFilter : true)
                && 
                (search ? (
                    bill.billNumber == search 
                    || bill.tableNumber == search
                ) : true)
        );

        res.json(bills);
    }

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