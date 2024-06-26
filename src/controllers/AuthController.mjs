import { STAFF_ROLE_KITCHEN, STAFF_ROLE_WAIT, StaffModel } from "../models/StaffModel.mjs";

export class AuthController {
    static viewLoginPage(req, res) {
        res.render("login.ejs");
    }
    
    static loginUser(req, res) {
        const formData = req.body;

        if (formData.loginType == "customer") {
            // TODO: Validate and sanitise inputs
            
            // Below we initialise the billNumber to the current timestamp, this
            // is dangerous as if two customers logged in at the same millisecond
            // they would BOTH have the same bill. We will learn how to fix this
            // in the future.
            req.session.customer = {
                tableNumber: formData.tableNumber,
                billNumber: Date.now(),
            }
            res.redirect("/menu")
        } else if (formData.loginType == "staff") {
            // TODO: Validate and sanitise inputs

            const queryResult = StaffModel.select(staff => staff.name == formData.staffName && staff.password == formData.staffPassword);
            
            if (queryResult.length > 0) {
                const matchingStaffMember = queryResult[0];

                req.session.staff = {
                    name: matchingStaffMember.name,
                    role: matchingStaffMember.role,
                }
                
                if (matchingStaffMember.role == STAFF_ROLE_KITCHEN) {
                    res.redirect("/kitchen");
                } else if (matchingStaffMember.role == STAFF_ROLE_WAIT) {
                    res.redirect("/wait");
                } else {
                    res.render("status.ejs", {message: "Invalid staff role."});
                }
            } else {
                res.render("status.ejs", {message: "Invalid login credentials."});
            }
        } else {
            res.render("status.ejs", {message: "Invalid login type."});
        }
    }
    
    static logoutUser(req, res) {
        req.session.destroy();
        res.redirect("/");
    }
}