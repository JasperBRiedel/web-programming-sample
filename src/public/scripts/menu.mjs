export class MenuController {
    static searchTerm = "";
    static sortOption = "highest rating";
    static products = [];
    
    static {
        fetch("/menu/products")
            .then(response => response.json())
            .then(receivedProducts => {
                this.products = receivedProducts;
                this.renderProductList();
            })
        
        document.getElementById("menu-product-search")
            .addEventListener("input", (event) => {
                this.searchTerm = event.target.value;
                this.renderProductList();
            })

        document.getElementById("menu-product-sort")
            .addEventListener("input", (event) => {
                this.sortOption = event.target.value;
                this.renderProductList();
            })
    }
    
    static renderProductDetails(productName) {
        fetch("/menu/products/" + productName)
            .then(response => response.text())
            .then(productPartial => {
                document.getElementById("product-details")
                    .innerHTML = productPartial
            })
    }
    
    static renderProductList() {
        let filteredAndSortedProducts = this.products
            .filter(product => 
                this.searchTerm === ""
                || product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) 
                || product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
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
        const menuItemList = document.getElementById("menu-product-list");
        menuItemList.innerHTML = filteredAndSortedProducts.map(product => `
            <article class="card">
                <span>${product.icon}</span>
                <span>${product.name}</span>
                <span>$ ${product.price}</span>
                <meter 
                    min="0" 
                    max="10" 
                    low="4"
                    high="8"
                    optimum="9"
                    value="${product.rating * 10}">
                </meter>
                <input 
                    type="button" 
                    value="view" 
                    onclick="renderProductDetails('${product.name}')" 
                >
            </article>
        `).join("");
    }
}

// This is a little hack to allow calling onViewItem from the onclick attribute.
window.renderProductDetails = (name) => MenuController.renderProductDetails(name);