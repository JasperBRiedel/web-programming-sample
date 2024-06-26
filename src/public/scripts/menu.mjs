import { OrderController, OrderModel } from "./order.mjs";

export class MenuModel {
    static searchTerm = "";
    static sortOption = "highest rating";
    static products = [];
    
    static loadProductsFromBackend() {
        // Load the products from the backend
        return fetch("/menu/products")
            .then(response => response.json())
            .then(receivedProducts => {
                this.products = receivedProducts;
            });
    }
    
    /**
     * Find a product by name, returns undefined if not found.
     * @param {string} productName 
     * @returns {ProductModel | undefined}
     */
    static getProductByName(productName) {
        return this.products.find(product => product.name === productName);
    }
    
    static setSearchTerm(searchTerm) {
        this.searchTerm = searchTerm;
    }
    
    static setSortOption(sortOption) {
        this.sortOption = sortOption;
    }
    
    /**
     * Returns sorted products that match the search term.
     * 
     * @returns resulting product data (matching server-side model structure).
     */
    static getSearchResults() {
        return this.products
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
            });
    }
}

export class MenuController {
    
    static {
        // Tell the model to load the product data
        // and wait for it to finish, then show the products.
        MenuModel.loadProductsFromBackend()
            .then(() => this.renderProductList())

        // Setup the input event on the search bar.
        document.getElementById("menu-product-search")
            .addEventListener("input", (event) => {
                MenuModel.setSearchTerm(event.target.value);
                this.renderProductList();
            })

        // Setup the input event on the sort select box.
        document.getElementById("menu-product-sort")
            .addEventListener("input", (event) => {
                MenuModel.setSortOption(event.target.value);
                this.renderProductList();
            })
    }
    
    static renderProductDetails(productName) {
        OrderController.setSelectedProductByName(productName);

        // Ask the server for the product details partial
        // and display it in the product details element.
        fetch("/menu/products/" + productName)
            .then(response => response.text())
            .then(productPartial => {
                document.getElementById("product-details")
                    .innerHTML = productPartial
            })
    }
    
    static renderProductList() {
        let filteredAndSortedProducts =  MenuModel.getSearchResults()
             
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

// This is a little hack to allow calling renderProductDetails 
// from the onclick attribute in the templated HTML above.
window.renderProductDetails = (name) => MenuController.renderProductDetails(name);