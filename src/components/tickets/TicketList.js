import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Ticket } from "./Ticket"
import "./Tickets.css"


export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const navigate = useNavigate()

    const localUbreakUser = localStorage.getItem("ubreak_user")
    const ubreakUserObject = JSON.parse(localUbreakUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/tickets?_expand=device`)
                .then(response => response.json())
                .then((ticketArray) => {
                    setTickets(ticketArray)
            
            })
        },
        [] 
    )

        const getTickets = () => {
            return fetch(`http://localhost:8088/tickets?_expand=device`)
            .then(response => response.json())
            .then((ticketArray) => {
                setTickets(ticketArray)
            
            })
        }

    useEffect(
        () => {
            if (ubreakUserObject.tech) {
                setFiltered(tickets)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === ubreakUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )

    return <>
        {
            ubreakUserObject.tech
            ? ""
            : <h1 className="RQTitle">My Tickets</h1>
            
        }

        <article className="tickets">
        
            {
                filteredTickets.map(
                    (ticket) => <Ticket key={`ticket--${ticket.id}`}
                    id={ticket.id} 
                    deviceBrand={ticket.device.deviceBrands}
                    deviceModel={ticket.device.deviceModels}
                    description={ticket.description} 
                    ubreakUserObject = {ubreakUserObject}
                    getTickets = {getTickets}
                    repairCost={ticket.repairCost}/>)
            }
        </article>

        {
            ubreakUserObject.tech
            ? ""
            : <>
            <br></br>
            <button className="myButton"
                onClick={() => navigate("/ticket/create")}>Create Repair</button>
            </>
        }
    </>
}