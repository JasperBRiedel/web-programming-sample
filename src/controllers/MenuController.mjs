import { ProductModel } from "../models/ProductModel.mjs"

export class MenuController {
    static viewMenuPage(req, res) {
        res.render("menu.ejs")       
    }
    
    static getProductsJSON(req, res) {
        const menuItems = ProductModel.select();
        res.status(200).json(menuItems)
    }
    
    static viewProductDetailsPartial(req, res) {
        const itemName = req.params.name
        
        const queryResult = ProductModel.select(product => product.name == itemName)
        
        if (queryResult.length > 0) {
            const item = queryResult[0]
            res.render("partials/productDetails.ejs", { item })
        } else {
            res.render("status.ejs", {message: "Item not found."})
        }
    }
}