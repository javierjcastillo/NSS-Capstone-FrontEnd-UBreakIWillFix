import { useEffect, useState } from "react"
import { CustomerRepair } from "./CustomerRepair"
import "./CustomerRepairs.css"


export const CustomerRepairList = () => {
    const [tickets, setTickets] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/ticketTable`)
                .then(response => response.json())
                .then((ticketArray) => {
                    setTickets(ticketArray)
            
            })
        },
        [] 
    )

    return <>

        <article className="tickets">
            {
                tickets.map(
                    (ticket) => <CustomerRepair key={`ticket--${ticket.id}`}
                    id={ticket.id} 
                    date={ticket.date} 
                    time={ticket.time} 
                    repairStatus={ticket.repairStatus} />)
            }
        </article>
    </>
}