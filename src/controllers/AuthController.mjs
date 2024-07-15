import { BILL_STATUS_OPEN, BillModel } from "../models/BillModel.mjs";
import { STAFF_ROLE_KITCHEN, STAFF_ROLE_MANAGER, STAFF_ROLE_WAIT, StaffModel } from "../models/StaffModel.mjs";
import { KitchenController } from "./KitchenController.mjs";

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
            const bill = new BillModel(Date.now(), formData.tableNumber, BILL_STATUS_OPEN);
            BillModel.insert(bill);

            // Save the bill and table numbers in the session for later.
            req.session.customer = {
                tableNumber: bill.tableNumber,
                billNumber: bill.billNumber,
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
                    res.redirect("/billing");
                } else if (matchingStaffMember.role == STAFF_ROLE_MANAGER) {
                    res.redirect("/staff");
                } else {
                    res.render("status.ejs", { message: "Invalid staff role." });
                }
            } else {
                res.render("status.ejs", { message: "Invalid login credentials." });
            }
        } else {
            res.render("status.ejs", { message: "Invalid login type." });
        }
    }

    static logoutUser(req, res) {
        // If it is a customer logging out, we must let the
        // order controller know so that the bill can be finalised
        // and sent to the wait staff so the customer can pay.
        if (req.session.customer) {
            KitchenController.finaliseOrder(
                req.session.customer.tableNumber,
                req.session.customer.billNumber
            );
        }

        req.session.destroy();
        res.redirect("/");
    }

    static hasSession(req, res, next) {
        if (req.session.customer || req.session.staff) {
            next();
        } else {
            res.status(400).render("status.ejs", { message: "Invalid session - please login." });
        }
    }

    static restrictToStaff(allowedStaffRoles) {
        return function (req, res, next) {
            if (req.session.staff != null) {
                if (allowedStaffRoles.includes(req.session.staff.role)) {
                    next();
                } else {
                    res.status(403).render("status.ejs", {
                        message: "Your role does not permit viewing this page."
                    });
                }
            } else {
                res.status(401).render("status.ejs", {
                    message: "You must be logged in as a staff member to access this page."
                });
            }
        };
    }
}