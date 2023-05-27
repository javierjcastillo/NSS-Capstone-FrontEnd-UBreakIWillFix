import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"


export const TicketEdit = () => {
    const { ticketId } = useParams()

    const [ticket, update] = useState({
        description: "",
        repairCost: 0

    })
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/tickets/${ticketId}`)
                .then(response => response.json())
                .then((copy) => {
                    update(copy)
                })
        },
        [ticketId]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const ticketToSendToAPI = {
            userId: ticket.userId,
            description: ticket.description,
            deviceId: ticket.deviceId,
            repairCost: parseFloat(ticket.repairCost)
        }

        fetch(`http://localhost:8088/tickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets")
            })
    }

    return <form>

        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Issue:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder={ticket.description}
                    value={ticket.date}
                    onChange={
                        (event) => {
                            const copy = { ...ticket }
                            copy.description = event.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Repair Cost:</label>
                <input
                    required autoFocus
                    type="number"
                    className="form-control"
                    placeholder="Type the cost for this Repair"
                    value={ticket.date}
                    onChange={
                        (event) => {
                            const copy = { ...ticket }
                            copy.repairCost = event.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <br></br>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="myButton">
            Submit Changes
        </button>
    </form>
}
