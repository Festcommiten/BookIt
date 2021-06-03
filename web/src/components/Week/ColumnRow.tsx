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

// Render greyed out slot with or without data
function timeSlotPassed(slotData: IndividualSlotData) {
	if (slotData.empty_slot) {
		return (
			<RenderFreeSlotPassed
				key={ slotData.id }
				slotData={ slotData }/>
		);
	} else {
		return (
			<RenderBookedSlotPassed
				key={ slotData.id }
				slotData={ slotData }/>
		);
	}
}

// Render all other slots with or without data
function timeSlotFuture(slotData: IndividualSlotData) {
	// if empty slot
	if (slotData.empty_slot) {
		return (
			<RenderFreeSlotFuture
				key={ slotData.id }
				slotData={ slotData }/>
		);
	} else {
		return (
			<RenderBookedSlotFuture
				key={ slotData.id }
				slotData={ slotData }/>
		);
	}
}

// Render nutid
function timeSlotCurrent(slotData: IndividualSlotData) {
	// if empty slot
	if (slotData.empty_slot) {
		return (
			<RenderFreeSlotCurrentTime
				key={ slotData.id }
				slotData={ slotData }/>
		);
	} else {
		return (
			<RenderBookedSlotCurrentTime
				key={ slotData.id }
				slotData={ slotData }/>
		);
	}
}

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
			slotStartTime.dayOfYear() === today.dayOfYear()) {
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
