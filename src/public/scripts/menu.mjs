export class MenuController {
    static searchTerm = "";
    static sortOption = "highest rating";
    static menuItems = [];
    
    static {
        fetch("/menu/items")
            .then(response => response.json())
            .then(receivedMenuItems => {
                this.menuItems = receivedMenuItems;
                this.renderResults();
            })
        
        document.getElementById("menu-item-search")
            .addEventListener("input", (event) => {
                this.searchTerm = event.target.value;
                this.renderResults();
            })

        document.getElementById("menu-item-sort")
            .addEventListener("input", (event) => {
                this.sortOption = event.target.value;
                this.renderResults();
            })
    }
    
    static onViewItem(itemName) {
        console.log("View " + itemName)
        this.renderItem(itemName)
    }
    
    static renderItem(itemName) {
        fetch("/menu/items/" + itemName)
            .then(response => response.text())
            .then(itemPage => {
                document.getElementById("product-details")
                    .innerHTML = itemPage
            })
    }
    
    static renderResults() {
        // Filter and sort results
        let resultingMenuItems = this.menuItems
            .filter(item => 
                this.searchTerm === ""
                || item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) 
                || item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                if (this.sortOption == "highest rating") {
                    return b.rating - a.rating;
                } else if (this.sortOption == "lowest rating") {
                    return a.rating - b.rating;
                } else if (this.sortOption == "highest price") {
                    return b.price - a.price;
                } else if (this.sortOption == "lowest price") {
                    return a.price - b.price;
                }
            })
        
        // Fill HTML template and show on page
        const menuItemList = document.getElementById("menu-item-list");
        menuItemList.innerHTML = resultingMenuItems.map(item => `
            <article class="card">
                <span>${item.icon}</span>
                <span>${item.name}</span>
                <span>$ ${item.price}</span>
                <meter 
                    min="0" 
                    max="10" 
                    low="4"
                    high="8"
                    optimum="9"
                    value="${item.rating * 10}">
                </meter>
                <input 
                    type="button" 
                    value="view" 
                    onclick="onViewItem('${item.name}')" 
                >
            </article>
        `).join("");
    }
}

// This is a little hack to allow calling onViewItem from the onclick attribute.
window.onViewItem = (name) => MenuController.onViewItem(name);