import { DataModel } from "./DataModel.mjs";

export class ProductModel extends DataModel {
    name; // key - must be unique
    description;
    price;
    rating;
    icon;
    
    constructor(name, description, price, rating, icon) {
        super();
        this.name = name;
        this.description = description;
        this.price = price;
        this.rating = rating;
        this.icon = icon;
    }
}

// Load static sample data. In the future we will use a database instead.
ProductModel.data = [
    new ProductModel("Sushi", 
        "Sushi is a Japanese dish of prepared vinegared rice, usually with some sugar and salt, plus a variety of ingredients, such as vegetables, and any meat, but most commonly seafood.",
    10, 8/10, "🍣"),
    new ProductModel("Pizza", 
        "Pizza is a savoury dish of Italian origin consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients, which is then baked at a high temperature, traditionally in a wood-fired oven.",
    15, 9/10, "🍕"),
    new ProductModel("Burger", 
        "A burger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun. The patty may be pan fried, grilled, smoked or flame broiled.",
    12, 7/10, "🍔"),
    new ProductModel("Tacos", 
        "Tacos are a traditional Mexican dish consisting of a small hand-sized corn or wheat tortilla topped with a filling. The tortilla is then folded around the filling and eaten by hand.",
    8, 8/10, "🌮"),
    new ProductModel("Pasta", 
        "Pasta is a type of Italian food typically made from an unleavened dough of wheat flour mixed with water or eggs, and formed into sheets or other shapes, then cooked by boiling or baking.",
    11, 8.5/10, "🍝"),
    new ProductModel("Forbidden Snack", 
        "Not for human consumption!",
    100, 2.5/10, "🍄")
]