import { Outlet, Route, Routes } from "react-router-dom"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"
import "./Views.css"

export const CustomerViews = () => {

	return (
        <Routes>
            <Route path="/" element={
                <>
                <a href="/tickets"><img className="Logo" src="https://i.imgur.com/eQ8nFgA.png" title="source: imgur.com" /></a>
                    
                    

                    <Outlet />
                </>
            }>
                <Route path="tickets" element={ <TicketList /> } />
                <Route path="ticket/create" element={ <TicketForm /> } />


            </Route>
        </Routes>
    )
}