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


// Render greyed out slot with or without data
function timeSlotPassed(dataSource: DataSource) {
	if (dataSource.empty_slot) {
		return (
			<RenderFreeSlotPassed/>
		);
	} else {
		return (
			<RenderBookedSlotPassed
				company={ dataSource.company }
				booker={ dataSource.booker }/>
		);
	}
}

// Render all other slots with or without data
function timeSlotFuture(dataSource: DataSource) {
	// if empty slot
	if (dataSource.empty_slot) {
		// TODO: Add green slot if current time
		return (
			<RenderFreeSlotFuture/>
		);
	} else {
		return (
			<RenderBookedSlotFuture
				company={ dataSource.company }
				booker={ dataSource.booker }/>
		);
	}
}

// Render nutid
function timeSlotCurrent(dataSource: DataSource) {
	// if empty slot
	if (dataSource.empty_slot) {
		return (
			<RenderFreeSlotCurrentTime/>
		);
	} else {
		return (
			<RenderBookedSlotCurrentTime
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
	const hourNow: number = today.hour() - 10;
	
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


function render_day_slot_column(dataSource: DataSource) {
	
	return (
		<>
			<RenderFreeSlotPassed/>
			<RenderBookedSlotPassed
				company={ dataSource.company }
				booker={ dataSource.booker }/>
			<RenderFreeSlotCurrentTime/>
			<RenderFreeSlotFuture/>
			<RenderFreeSlotFuture/>
			<RenderBookedSlotCurrentTime
				company={ dataSource.company }
				booker={ dataSource.booker }/>
			<RenderFreeSlotFuture/>
			<RenderBookedSlotFuture
				company={ dataSource.company }
				booker={ dataSource.booker }/>
			<RenderFreeSlotFuture/>
			<RenderFreeSlotFuture/>
		</>
	);
}

function unpackData(oneDayData: OneDayData) {
	let day0: DataSource = oneDayData.datasource[0];
	let day1: DataSource = oneDayData.datasource[1];
	let day2: DataSource = oneDayData.datasource[2];
	let day3: DataSource = oneDayData.datasource[3];
	let day4: DataSource = oneDayData.datasource[4];
	
}

export default function ColumnRow(oneDayData: OneDayData) {
	
	let {weekday, date} = oneDayData;
	
	return <div className="week-column_rows">
		<RenderTitle weekday={ weekday } date={ date }/>
		{/*{ render_day_slot_column(oneDayData.datasource[0]) }*/ }
		{ renderDayColumn(oneDayData) }
	</div>;
};
