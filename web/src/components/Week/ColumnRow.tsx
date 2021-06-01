import moment from 'moment';
import React from 'react';
import './ColumnRow.css';
// import { NewBooking } from '../../utils/global/handlers/NewBooking';
import { IndividualSlotData, OneDayColumnData } from '../../utils/interface/WeekInterface';
import {
	RenderFreeSlotFuture,
	RenderFreeSlotCurrentTime,
	RenderFreeSlotPassed,
	RenderBookedSlotFuture,
	RenderBookedSlotPassed,
	RenderTitle, RenderBookedSlotCurrentTime
} from './ColumnRowItem';
import { NewBooking, RemoveBooking } from '../../utils/global/handlers/HandleBookings';

// Render greyed out slot with or without data
function timeSlotPassed(slotData: IndividualSlotData) {
	if (slotData.empty_slot) {
		return (
			<RenderFreeSlotPassed
				key={ slotData.id }/>
		);
	} else {
		return (
			<RenderBookedSlotPassed
				key={ slotData.id }
				company={ slotData.company }
				booker={ slotData.booker }/>
		);
	}
}

// Render all other slots with or without data
function timeSlotFuture(slotData: IndividualSlotData) {
	// if empty slot
	if (slotData.empty_slot) {
		return (
			<div onClick={ () => NewBooking(slotData) }
				 key={ slotData.id }>
				<RenderFreeSlotFuture/>
			</div>
		);
	} else {
		return (
			<div onClick={ () => alert('Remove Booking') }
				 key={ slotData.id }>
				<RenderBookedSlotFuture
					company={ slotData.company }
					booker={ slotData.booker }/>
			</div>
		);
	}
}

// Render nutid
function timeSlotCurrent(slotData: IndividualSlotData) {
	// if empty slot
	if (slotData.empty_slot) {
		return (
			<div onClick={ () => alert('New Booking') }
				 key={ slotData.id }>
				<RenderFreeSlotCurrentTime/>
			</div>
		);
	} else {
		return (
			<div onClick={ () => alert('Remove Booking') }
				 key={ slotData.id }>
				<RenderBookedSlotCurrentTime
					company={ slotData.company }
					booker={ slotData.booker }/>
			</div>
		);
	}
}

const hardCodedTodayDay: moment.Moment = moment('2021-05-19', 'YYYY-MM-DD');

function renderDayColumn(oneDayData: OneDayColumnData) {
	let slotArray = oneDayData.slotDatas;
	let dataArray: Array<any> = [];
	
	const today: moment.Moment = moment();
	const hourNow: number = today.hour();
	
	for (let i = 0; i < slotArray.length; i++) {
		let slotStartTime: moment.Moment = moment(slotArray[i].start_time);
		let slotStartHour: number = slotStartTime.hour();
		
		if (slotArray[i].passed_time_slot) {
			dataArray.push(timeSlotPassed(slotArray[i]));
		} else if (hourNow === slotStartHour &&
			slotStartTime.dayOfYear() === hardCodedTodayDay.dayOfYear()) {
			dataArray.push(timeSlotCurrent(slotArray[i]));
		} else {
			dataArray.push(timeSlotFuture(slotArray[i]));
		}
	}
	return dataArray;
}

export default function ColumnRow(oneDayData: OneDayColumnData) {
	let {weekday, date} = oneDayData;
	return <div className="week-column_rows">
		<RenderTitle weekday={ weekday } date={ date }/>
		{ renderDayColumn(oneDayData) }
	</div>;
}
;
