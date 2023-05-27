import { useNavigate } from "react-router-dom"

export const Ticket = ({ id, deviceModel, description, deviceBrand, ubreakUserObject, getTickets, repairCost }) => {

    const navigate = useNavigate()

    const handleDelete = () => {
        return fetch(`http://localhost:8088/tickets/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                getTickets()
                navigate("/tickets")
            })
    }

    const deleteButton = () => {
        if (!ubreakUserObject.tech) {
            return <button onClick={() => { handleDelete() }} className="ticket_finish">Delete</button>
        } else {
            return ""
        }
    }

    const editButton = () => {
        if (ubreakUserObject.tech) {
            return <button onClick={() => {navigate(`/tickets/edit/${id}`)}} className="ticket_finish">Edit</button>
        } else {
            return ""
        }
    }
    return <section className="ticket" key={`${id}`} >

        <header>Brand: {deviceBrand}</header>
        <header>Device: {deviceModel}</header>
        <header>Issue: {description}</header>
        {
            repairCost > 0
                ? <header>Cost: {repairCost}</header>
                : <></>
        }
        {deleteButton()}
        {editButton()}
    </section>




}   