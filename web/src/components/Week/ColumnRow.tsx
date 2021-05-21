import moment from 'moment';
import React from 'react';
import './ColumnRow.css';
import {
	RenderFreeSlot,
	RenderGreenSlot,
	RenderGrey_out_slot,
	RenderRedSlot,
	RenderRedSlotPassed,
	RenderTitle
} from './ColumnRowItem';

interface DataSource {
	passed_time_slot: boolean
	id: number
	company: string
	booker: string
	start_time: moment.Moment
}

interface OneDayData {
	weekday: string
	date: string
	datasource: Array<DataSource>
}

function render_day_slot_column(ds: DataSource) {
	
	
	return (
		<>
			<RenderGrey_out_slot/>
			<RenderRedSlotPassed company={ ds.company } booker={ ds.booker }/>
			<RenderGreenSlot/>
			<RenderFreeSlot/>
			<RenderFreeSlot/>
			<RenderFreeSlot/>
			<RenderRedSlot company={ ds.company } booker={ ds.booker }/>
			<RenderFreeSlot/>
			<RenderFreeSlot/>
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
	
	return (
		<div className="week-column_rows">
			<RenderTitle weekday={ weekday } date={ date }/>
			{ render_day_slot_column(oneDayData.datasource[0]) }
		</div>
	);
};
