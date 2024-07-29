import { STAFF_ROLE_KITCHEN, STAFF_ROLE_MANAGER, STAFF_ROLE_WAIT, StaffModel } from "../models/StaffModel.mjs"

export class StaffController {
    static viewCRUDPage(req, res) {
        // TODO: Validation

        // Load all staff members
        const staff = StaffModel.select()
        
        // Attempt to load the selected staff member.
        let selected = null
        const selected_name = req.params.name
        if (selected_name) {
            const result = StaffModel.select(s => s.name == selected_name)
            if (result.length > 0) {
                selected = result[0]
            } else {
                res.render("status.ejs", { message: "Staff member not found."})
                return
            }
        } 

        // render the staff CRUD page with the list of staff
        // and the selected staff member.
        res.render("staff.ejs", { staff, selected })
    }

    static handleCRUDAction(req, res) {
        const formData = req.body
        // Validate form data
        if (!/^(clear|update|create|delete)$/.test(formData["action"])) {
            res.status(400).render("status.ejs", { message: "Invalid CRUD operation - must be clear, update, create, or delete." });
            return;
        }

        if (!formData["selected_name"].length > 0) {
            res.status(400).render("status.ejs", { message: "Missing selected staff name." });
            return;
        }

        if (!/^[a-zA-Z0-9]+$/.test(formData["staff_name"])) {
            res.status(400).render("status.ejs", { 
                message: "Invalid staff name - Must be specified and can contain numbers and letters only." 
            });
            return;
        }

        if (![
            STAFF_ROLE_KITCHEN,
            STAFF_ROLE_MANAGER,
            STAFF_ROLE_WAIT
        ].includes(formData["staff_role"])) {
            res.status(400).render("status.ejs", {
                message: "Invalid staff role - Must be: kitchen, wait, or manager."
            });
            return;
        }

        if (!formData["staff_password"].length > 0) {
            res.status(400).render("status.ejs", { message: "Invalid password - Password must be specified." });
            return;
        }
        
        // Extract action and selected name (selected name
        // will match the original name before any edits
        // and allows us to make updates even when the
        // name is changed).
        const action = formData["action"]
        const selected_name = formData["selected_name"]

        // Create a staff model from the form data
        const staffMember = new StaffModel(
            formData["staff_name"],
            formData["staff_role"],
            formData["staff_password"]
        )
        
        if (action == "clear") {
            res.redirect("/staff")
        } else if (action == "update") {
            StaffModel.update(s => s.name == selected_name, staffMember)
            res.redirect("/staff/" + staffMember.name)
        } else if (action == "create") {
            StaffModel.insert(staffMember)
            res.redirect("/staff/" + staffMember.name)
        } else if (action == "delete") {
            StaffModel.delete(s => s.name == selected_name)
            res.redirect("/staff")
        }
    }
}