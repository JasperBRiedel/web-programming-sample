export class KitchenController {
    
    static {
        this.renderQueueList();
        
        // Set up click event on refresh button
        document.getElementById("kitchen-queue-refresh")
            .addEventListener("click", (event) => {
                this.renderQueueList();
            })
    }
    
    static renderProductDetails(productName) {
        // Ask the server for the product details partial
        // and display it in the product details element.
        fetch("/menu/products/" + productName)
            .then(response => response.text())
            .then(productPartial => {
                document.getElementById("product-details")
                    .innerHTML = productPartial
            })
    }
    
    static progressQueueStatus(queueNumber, status) {
        // Ask the server to progress the queue item to the next status.
        fetch("/kitchen/queue/"+queueNumber, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({status})
        }).then(response => {
            if (response.status != 200) {
                response.text().then(errorMessage => {
                    alert(`Error: ${errorMessage} - refreshing queue.`);
                })
            } 
            this.renderQueueList();
        })
    }
    
    static renderQueueList() {
        // Load latest queue from the backend
        fetch("/kitchen/queue")
            .then(response => response.json())
            .then(kitchenQueue => {

                // Fill HTML template and show on page
                const kitchenQueueList = document.getElementById("kitchen-queue");
                kitchenQueueList.innerHTML = 
                `
                    <span>Table</span>
                    <span>Name</span>
                    <span>Qty</span>
                    <span>Status</span>
                    <span></span>
                `
                + kitchenQueue.map(queueItem => `
                        <span>${queueItem.tableNumber}</span>
                        <span>${queueItem.productName}</span>
                        <span>${queueItem.quantity}</span>
                        <span>${queueItem.status}</span>
                        <div>
                            <input 
                                type="button" 
                                value="next" 
                                onclick="progressQueueStatus(${queueItem.queueNumber}, '${queueItem.status}')" 
                                ${queueItem.status == "served" ? "disabled" : ""}
                            >
                            <input 
                                type="button"
                                value="view"
                                onclick="renderProductDetails('${queueItem.productName}')" 
                            >
                        </div>
                `).join("");
            })
    }
}

// This is a little hack to allow calling controller functions 
// from the onclick attribute in the templated HTML above.
window.renderProductDetails = (name) => 
    KitchenController.renderProductDetails(name);

window.progressQueueStatus = (queueNumber, status) => 
    KitchenController.progressQueueStatus(queueNumber, status);