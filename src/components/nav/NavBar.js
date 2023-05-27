import { Link, useNavigate } from "react-router-dom"
import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {

    const localUbreakUser = localStorage.getItem("ubreak_user")
    const ubreakUserObject = JSON.parse(localUbreakUser)

    if (ubreakUserObject.tech) {
        // Return employee views
        return <EmployeeNav />
    } else {
        //Return customer views
        return <CustomerNav />
    }
    
}


