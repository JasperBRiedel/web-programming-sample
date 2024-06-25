import { Model } from "./model.mjs";

export const STAFF_ROLE_KITCHEN = "kitchen"
export const STAFF_ROLE_WAIT = "wait"

export class Staff extends Model {

    name; // key - must be unique
    role;
    password;
    
    constructor(name, role, password) {
        super();
        this.name = name;
        this.role = role;
        this.password = password;
    }
}

Staff.data = [
    new Staff("John", STAFF_ROLE_WAIT, "abc123"),
    new Staff("Jane", STAFF_ROLE_KITCHEN, "abc123")
]