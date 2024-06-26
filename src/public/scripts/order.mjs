import { MenuModel } from "./menu.mjs";

export class OrderModel {
    static products = []; // Contains objects like {name: "", quantity: 1}
    static selectedProduct = null;
    
    static setProductWithQuantity(productName, productQuantity) {
        // If the quantity is zero then remove the product name from the list
        if (productQuantity <= 0) {
            this.products = this.products.filter(
                product => product.name !== productName
            );
            // Early return to skip remaining statements.
            return;
        }

        // Try and find the product by name and update quantity.
        for (const product of this.products) {
            if (product.name === productName) {
                product.quantity = productQuantity;
                // Early return to skip remaining statements.
                return;
            }
        }
        
        // If we made it here it means the product wasn't removed
        // and couldn't be found (but it should have a non-zero)
        // quantity, so we add it!
        this.products.push(
            {name: productName, quantity: productQuantity}
        );
    }
    
    static getProductQuantity(productName) {
        for (const product of this.products) {
            if (product.name === productName) {
                return product.quantity;
            }
        }
        
        return 0;
    }
    
    /**
     * 
     * @returns {Array<{name, quantity}>}
     */
    static getAllProductsWithQuantities() {
        return this.products;
    }

    static clear() {
        this.products = [];
    }

    static setSelectedProduct(product) {
        this.selectedProduct = product;
    }
    
    static getSelectedProduct() {
        return this.selectedProduct;
    }
}

export class OrderController {
    static {
        document.getElementById("order-product-update")
            .addEventListener("click", (event) => {
                const quantityElement = document.getElementById("order-product-quantity");
                this.updateSelectedProductQuantity(quantityElement.value);
            });
        
        document.getElementById("order-product-quantity")
            .addEventListener("input", (event) => {
                this.renderProductDetailsForOrder();
            })

        document.getElementById("order-send")
            .addEventListener("click", (event) => {
                this.sendOrder();
                
                // Rerender the details to the screen (since we cleared the
                // order they could now be out of sync).
                this.renderProductDetailsForOrder();
                this.renderOrderDetails();
            })
    }
    
    static sendOrder() {
        console.log(OrderModel.getAllProductsWithQuantities());
        OrderModel.clear();
    }

    static updateSelectedProductQuantity(quantity) {
        const selectedProduct = OrderModel.getSelectedProduct();
        if (selectedProduct) {
            OrderModel.setProductWithQuantity(selectedProduct.name, quantity);

            this.renderProductDetailsForOrder();
            this.renderOrderDetails();
        }
    }
    
    static setSelectedProductByName(productName) {
        const selectedProduct = MenuModel.getProductByName(productName);
        OrderModel.setSelectedProduct(selectedProduct);
        
        // Update the quantity input based on the order quantities.
        if (selectedProduct) {
            const quantityElement = document.getElementById("order-product-quantity");
            const quantity = OrderModel.getProductQuantity(selectedProduct.name);
            quantityElement.value = quantity;
        }
        
        this.renderProductDetailsForOrder();
    }
    
    static renderProductDetailsForOrder() {
        const quantityElement = document.getElementById("order-product-quantity");
        const totalElement = document.getElementById("order-product-total");

        const selectedProduct = OrderModel.getSelectedProduct();
        if (selectedProduct) {
            const total = quantityElement.value * selectedProduct.price;
            totalElement.innerText = "$"+total;
        } else {
            quantityElement.value = 0;
            totalElement.innerText = "$0.00";
        }
    }
    
    static renderOrderDetails() {
        const sendButton = document.getElementById("order-send");
        
        const orderProductsWithQuantities = OrderModel.getAllProductsWithQuantities()
        
        let total = 0;
        
        for (const orderProductWithQuantity of orderProductsWithQuantities) {
            // Look up the product so we can access the price.
            const product = MenuModel.getProductByName(orderProductWithQuantity.name);
            
            total += product.price * orderProductWithQuantity.quantity;
        }
        
        sendButton.value = "Send order to kitchen - $" + total;
    }
}