import moment from 'moment';
import React from 'react';
import './ColumnRow.css';
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
			<RenderFreeSlotFuture
				key={ slotData.id }/>
		);
	} else {
		return (
			<RenderBookedSlotFuture
				key={ slotData.id }
				company={ slotData.company }
				booker={ slotData.booker }/>
		);
	}
}

// Render nutid
function timeSlotCurrent(slotData: IndividualSlotData) {
	// if empty slot
	if (slotData.empty_slot) {
		return (
			<RenderFreeSlotCurrentTime
				key={ slotData.id }/>
		);
	} else {
		return (
			<RenderBookedSlotCurrentTime
				key={ slotData.id }
				company={ slotData.company }
				booker={ slotData.booker }/>
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
};
