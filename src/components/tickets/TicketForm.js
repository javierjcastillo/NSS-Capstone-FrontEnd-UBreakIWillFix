import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {

    const [ticket, update] = useState({
        description: "",
        deviceId: null
        
    })

    const [brand, setBrand] = useState([])
    const [devices, setDevices] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/devices?deviceBrands=${brand}`)
                .then(response => response.json())
                .then((devicesArray) => {
                    setDevices(devicesArray)
                    const copy = {...ticket}
                    copy.deviceId = null
                    update(copy)
                })
        },
        [brand]
    )
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
        const navigate = useNavigate()

        const localUbreakUser = localStorage.getItem("ubreak_user")
        const ubreakUserObject = JSON.parse(localUbreakUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
            // {
            // "deviceId": 1,
            // "userId": 1,
            // "description": "Broken Screen"
        //     }

    const ticketToSendToAPI = {
        userId: ubreakUserObject.id,
        description: ticket.description,
        deviceId: ticket.deviceId,
        repairCost: 0
    }
        // TODO: Perform the fetch() to POST the object to the API
        fetch(`http://localhost:8088/tickets`, {
            method: "POST",
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

    return (
        <form className="ticketForm">
            <h1 className="ticketForm__title">New Repair Ticket</h1>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="devices">Device Brand:</label>
                    <select className="form-control" value={brand} onChange={(event) => {
                        setBrand(event.target.value)  
                    }}>
                       <option value="0">Select an option</option>
                       <option value="Apple">Apple</option>
                       <option value="Samsung">Samsung</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="devices">Device Model:</label>
                    <select className="form-control" onChange={(event) => {
                        const copy = { ...ticket }
                        copy.deviceId = parseInt(event.target.value)
                        update(copy)
                    }}>
                       <option value="0">Select an option</option>
                        {
                            devices.map(device => {
                                return <option
                                key={`device--${device.id}`}
                                    className=""
                                    value={device.id}
                                >{device.deviceModels}
                                </option>
                            } 
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Issue:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief Description of your Issue"
                        value={ticket.date}
                        onChange={
                            (event) => {
                                const copy={...ticket}
                                copy.description = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <br></br>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="myButton">
                Submit Ticket
            </button>
        </form>
    )
}