export class BillingController {
    static {
        this.renderBillList("unpaid", null)
        
        document.getElementById("billing-search")
            .addEventListener("input", () => this.renderFilteredBillList())

        document.getElementById("billing-show-all")
            .addEventListener("input", () => this.renderFilteredBillList())
    }
    
    static renderFilteredBillList() {
        const searchText = document.getElementById("billing-search").value
        const showAll = document.getElementById("billing-show-all").checked

        const statusFilter = showAll ? "" : "unpaid"
        
        this.renderBillList(statusFilter, searchText)
    }

    static renderBillList(statusFilter = null, search = null) {
        let queryString = new URLSearchParams()

        if (search) {
            queryString.append("search", search)
        }

        if (statusFilter) {
            queryString.append("statusFilter", statusFilter)
        }

        fetch("/billing/bills?" + queryString.toString())
            .then(response => response.json())
            .then(bills => {
                const billList = document.getElementById("bill-list")

                billList.innerHTML = bills.map(bill => `
                    <article class="card">
                        <span>Table: ${bill.tableNumber}</span>
                        <span>${bill.status}</span>
                        <input 
                            type="button" 
                            value="view" 
                            onclick="renderBillDetails('${bill.billNumber}')" 
                        >
                    </article>
                `).join("")
            })
    }
    
    static renderBillDetails(billNumber) {
        fetch("/billing/bills/" + billNumber)
            .then(response => response.text())
            .then(productPartial => {
                document.getElementById("bill-details")
                    .innerHTML = productPartial
            })
    }
}

window.renderBillDetails = (billNumber) => BillingController.renderBillDetails(billNumber)