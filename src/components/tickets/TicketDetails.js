import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const TicketDetails = () => {
    
    const {ticketId} = useParams()
    const [ticket, updateTicket] = useState({})
    const [device, updateDevice] = useState({})



    useEffect(
        () => {
            fetch(`http://localhost:8088/ticketTable?_expand=ticket&_expand=user&userId=${ticketId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleTicket = data[0]
                    updateTicket(singleTicket)
            })
            .then(() => {
                fetch(`http://localhost:8088/tickets?_expand=device&userId=${ticketId}`)
                    .then(response => response.json())
                    .then((data) => {
                        const singleDevice = data[0]
                        updateDevice(singleDevice)
                })
            })
        },
        [ticketId]
    )

    return  <section className="ticket">
<h2>Repair Details</h2>
    <header className="text">Name: {ticket?.user?.fullName}</header>
    <header className="text">Email: {ticket?.user?.email}</header>
    <header className="text">Address: {ticket?.user?.address}</header>
    <header className="text">Phone Number: {ticket?.user?.phoneNumber}</header>
    <header className="text">Date: {ticket.date}</header>
    <header className="text">Time: {ticket.time}</header>
    <header className="text">Status: {ticket.repairStatus}</header>
    <header className="text">Device: {device?.device?.deviceBrands}</header>
    <header className="text">Model: {device?.device?.deviceModels}</header>
    <header className="text">Issue: {ticket?.ticket?.description}</header>
    <header className="text">Expected Cost: ${ticket.repairCost}</header>
    

</section>
}