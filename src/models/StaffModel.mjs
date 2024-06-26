import { DataModel } from "./DataModel.mjs";

export const STAFF_ROLE_KITCHEN = "kitchen"
export const STAFF_ROLE_WAIT = "wait"

export class StaffModel extends DataModel {

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

StaffModel.data = [
    new StaffModel("John", STAFF_ROLE_WAIT, "abc123"),
    new StaffModel("Jane", STAFF_ROLE_KITCHEN, "abc123")
]