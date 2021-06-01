import { createContext, useState } from 'react';

export const RoomContext = createContext();

export const RoomProvider = (props) => {
    const [room, setRoom] = useState('Kakashi')

    return (
        <RoomContext.Provider value={ [room, setRoom] }>
            { props.children }
        </RoomContext.Provider>
    )
}

export const WeekDataContext = createContext();

export const WeekDataProvider = (props) => {
    const [weekData, setWeekData] = useState()

    return (
        <WeekDataContext.Provider value={ [weekData, setWeekData] }>
            { props.children }
        </WeekDataContext.Provider>
    )
}
