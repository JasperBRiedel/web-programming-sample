import { StaffModel } from "../models/StaffModel.mjs"

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
        // TODO: Validate form data
        
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