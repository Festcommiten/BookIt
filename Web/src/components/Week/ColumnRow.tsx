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
	weekday: string
	date: string
	isTrue: boolean
	company: string
	booker: string
	index: number
}

function render_day_slot_column(company: string, booker: string) {
	return (
		<>
			<RenderGrey_out_slot/>
			<RenderRedSlotPassed company={ company } booker={ booker }/>
			<RenderGreenSlot/>
			<RenderFreeSlot/>
			<RenderFreeSlot/>
			<RenderFreeSlot/>
			<RenderRedSlot company={ company } booker={ booker }/>
			<RenderFreeSlot/>
			<RenderFreeSlot/>
		</>
	);
}

export default function ColumnRow(dataSource: DataSource) {
	
	let {weekday, date, company, booker} = dataSource;
	
	return (
		<div className="week-column_rows">
			<RenderTitle weekday={ weekday } date={ date }/>
			{ render_day_slot_column(company, booker) }
		</div>
	);
};
