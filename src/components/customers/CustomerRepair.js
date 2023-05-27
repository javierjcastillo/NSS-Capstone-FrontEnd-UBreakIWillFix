import { Link } from "react-router-dom"

export const CustomerRepair = ({ id, date, time, repairStatus }) => {
    
    return <section className="ticket">

        <header>
            <Link to={`/tickets/${id}`}> Date: {date}</Link>
        </header>
        <header>Time: {time}</header>
        <header>Status: {repairStatus}</header>

    </section>

}