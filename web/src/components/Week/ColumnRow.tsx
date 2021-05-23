import moment from 'moment';
import React from 'react';
import './ColumnRow.css';
import { DataSource, OneDayData } from '../../utils/interface/WeekInterface';
import {
	RenderFreeSlotFuture,
	RenderFreeSlotCurrentTime,
	RenderFreeSlotPassed,
	RenderBookedSlotFuture,
	RenderBookedSlotPassed,
	RenderTitle, RenderBookedSlotCurrentTime
} from './ColumnRowItem';

let key = 200;

// Render greyed out slot with or without data
function timeSlotPassed(dataSource: DataSource) {
	key += key;
	if (dataSource.empty_slot) {
		return (
			<RenderFreeSlotPassed
				key={ key }/>
		);
	} else {
		return (
			<RenderBookedSlotPassed
				key={ key }
				company={ dataSource.company }
				booker={ dataSource.booker }/>
		);
	}
}

// Render all other slots with or without data
function timeSlotFuture(dataSource: DataSource) {
	key += key;
	// if empty slot
	if (dataSource.empty_slot) {
		// TODO: Add green slot if current time
		return (
			<RenderFreeSlotFuture
				key={ key }/>
		);
	} else {
		return (
			<RenderBookedSlotFuture
				key={ key }
				company={ dataSource.company }
				booker={ dataSource.booker }/>
		);
	}
}

// Render nutid
function timeSlotCurrent(dataSource: DataSource) {
	key += key;
	// if empty slot
	if (dataSource.empty_slot) {
		return (
			<RenderFreeSlotCurrentTime
				key={ key }/>
		);
	} else {
		return (
			<RenderBookedSlotCurrentTime
				key={ key }
				company={ dataSource.company }
				booker={ dataSource.booker }/>
		);
	}
}

const hardCodedTodayDay: moment.Moment = moment('2021-05-19', 'YYYY-MM-DD');

function renderDayColumn(oneDayData: OneDayData) {
	let oneDaySlotArray = oneDayData.datasource;
	let dataArray: Array<any> = [];
	
	const today: moment.Moment = moment();
	const hourNow: number = today.hour();
	
	for (let i = 0; i < oneDaySlotArray.length; i++) {
		let slotStartTime: moment.Moment = moment(oneDaySlotArray[i].start_time);
		let slotStartHour: number = slotStartTime.hour();
		
		if (oneDaySlotArray[i].passed_time_slot) {
			dataArray.push(timeSlotPassed(oneDaySlotArray[i]));
		} else if (hourNow === slotStartHour &&
			slotStartTime.dayOfYear() === hardCodedTodayDay.dayOfYear()) {
			dataArray.push(timeSlotCurrent(oneDaySlotArray[i]));
		} else {
			dataArray.push(timeSlotFuture(oneDaySlotArray[i]));
		}
	}
	return dataArray;
}

export default function ColumnRow(oneDayData: OneDayData) {
	let {weekday, date} = oneDayData;
	
	return <div className="week-column_rows">
		<RenderTitle weekday={ weekday } date={ date }/>
		{ renderDayColumn(oneDayData) }
	</div>;
};
