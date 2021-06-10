import React, { useContext } from 'react';
import { IndividualSlotData } from '../../interface/WeekInterface';
import { ChoseCompanyContext } from '../provider/ChoseCompanyProvider';

export const NewBooking = (slotData: IndividualSlotData) => {
	const [popup, setPopup] = useContext(ChoseCompanyContext);
	alert('New Booking')
	console.log('NewBooking', slotData)
	console.log('popup', popup)
	setPopup(true)
	console.log('popup', popup)
}

function RemoveBooking() {
	alert('Remove Booking')
}

export {
	RemoveBooking
}
