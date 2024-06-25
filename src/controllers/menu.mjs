import { Product } from "../models/product.mjs"

export class MenuController {
    static viewMenu(req, res) {
        res.render("menu.ejs")       
    }
    
    static getMenuItems(req, res) {
        const menuItems = Product.select();
        res.status(200).json(menuItems)
    }
    
    static getMenuItem(req, res) {
        const itemName = req.params.name
        
        const queryResult = Product.select(product => product.name == itemName)
        
        if (queryResult.length > 0) {
            const item = queryResult[0]
            res.render("partials/item.ejs", { item })
        } else {
            res.render("status.ejs", {message: "Item not found."})
        }
    }
}