import React, { createContext, useState } from 'react';
import moment from "moment";

export const WeekContext = createContext();

export const WeekProvider = (props) => {
    const [week, setWeek] = useState(parseInt(moment().format('W')))

    return (
        <WeekContext.Provider value={ [week, setWeek] }>
            { props.children }
        </WeekContext.Provider>
    )
}
