import { createContext, useState } from "react";

export const RemoveBookingContext = createContext();

export const RemoveBookingProvider = (props) => {
    const [removeBooking, setRemoveBooking] = useState(false)

    return (
        <RemoveBookingContext.Provider value={ [removeBooking, setRemoveBooking] }>
            { props.children }
        </RemoveBookingContext.Provider>
    )
}
