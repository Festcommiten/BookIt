import { createContext, useState } from 'react';
import useWindowDimensions from "./WindowDimensionsProvider";

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

export const ChosenDataSlotContext = createContext();

export const ChosenDataSlotProvider = (props) => {
    const [chosenDataSlot, setChosenDataSlot] = useState()

    return (
        <ChosenDataSlotContext.Provider value={ [chosenDataSlot, setChosenDataSlot] }>
            { props.children }
        </ChosenDataSlotContext.Provider>
    )
}

export const DataSlotHeightContext = createContext();

export const DataSlotHeightProvider = (props) => {

    const navbarAndFooterHeight = 186;
    const ipadProHeightDivider = 10.5;
    const ipadHeightDivider = 11;

    const windowHeight = useWindowDimensions().height

    let currentHeight = (windowHeight - navbarAndFooterHeight) / ipadProHeightDivider;

    if (windowHeight < 750) {
        currentHeight = (windowHeight - navbarAndFooterHeight) / ipadHeightDivider;
    }

    const [height, setHeight] = useState(currentHeight)

    return (
        <DataSlotHeightContext.Provider value={ [height, setHeight] }>
            { props.children }
        </DataSlotHeightContext.Provider>
    )
}
