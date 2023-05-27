import { Outlet, Route, Routes } from "react-router-dom"
import { TicketDetails } from "../tickets/TicketDetails"
import { TicketEdit } from "../tickets/TicketEdit"
import { TicketList } from "../tickets/TicketList"
import "./Views.css"

export const EmployeeViews = () => {

	return (
        <Routes>
            <Route path="/" element={
                <>
                <a href="/tickets"><img className="Logo" src="https://i.imgur.com/eQ8nFgA.png" title="source: imgur.com" /></a>

                    <h1 className="RQTitle">Repair Queue</h1>
                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketList /> } />
                <Route path="tickets/:ticketId" element={ <TicketDetails /> } />
                <Route path="tickets/edit/:ticketId" element={ <TicketEdit /> } />

            </Route>
        </Routes>
    )
}

