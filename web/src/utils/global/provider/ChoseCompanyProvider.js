import { createContext, useState } from "react";

export const ChoseCompanyContext = createContext();

export const ChoseCompanyProvider = (props) => {
    const [isChosenCompany, setChosenCompany] = useState(false)

    return (
        <ChoseCompanyContext.Provider value={ [isChosenCompany, setChosenCompany] }>
            { props.children }
        </ChoseCompanyContext.Provider>
    )
}
