import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"

export const ApplicationViews = () => {

    const localUbreakUser = localStorage.getItem("ubreak_user")
    const ubreakUserObject = JSON.parse(localUbreakUser)

    if (ubreakUserObject.tech) {

        return <EmployeeViews />

    } else {

        return <CustomerViews />
    }

}

