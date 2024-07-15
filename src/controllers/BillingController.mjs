import { BILL_STATUS_UNPAID, BillModel } from "../models/BillModel.mjs";
import { ProductModel } from "../models/ProductModel.mjs";
import { QUEUE_STATUS_SERVED, QueueModel } from "../models/QueueModel.mjs";

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
    
    static getBillDetailsPartial(req, res) {
        const billNumber = req.params.billNumber

        const results = BillModel.select(bill => bill.billNumber == billNumber)

        if (results.length > 0) {
            const bill = results[0]
            
            // Find all the items ordered for this bill.
            const orderLines = QueueModel.select(line => 
                line.billNumber == bill.billNumber
            )
            

            // Calculate total of all served items
            const total = orderLines
                .filter(orderLine => orderLine.status == QUEUE_STATUS_SERVED)
                .reduce((sum, orderLine) => 
                    sum + orderLine.quantity * ProductModel.getProductPrice(orderLine.productName)
                , 0)
            
            // Render partial with bill details and list of product ordered
            res.render("partials/billDetails.ejs", { bill, orderLines, total })
        } else {
            res.status(404).render("status.ejs", {message: "Bill not found."})
        }
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