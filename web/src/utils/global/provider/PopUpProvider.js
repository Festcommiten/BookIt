import { createContext, useState } from "react";

export const PopUpContext = createContext();

export const PopUpProvider = (props) => {
    const [popup, setPopup] = useState(false)

    return (
        <PopUpContext.Provider value={ [popup, setPopup] }>
            { props.children }
        </PopUpContext.Provider>
    )
}
