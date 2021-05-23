import React from 'react';
import './ColumnRowItem.css';

interface WeekDate {
	weekday: string
	date: string
}

export function RenderTitle(weekDate: WeekDate) {
	
	let {weekday, date} = weekDate;
	
	return (
		<div className="pa2 ma0 item-week-day">
			<p className="primary_text">{ weekday }</p>
			<p className="secondary_text">{ date }</p>
		</div>
	);
}

export function RenderFreeSlotPassed() {
	return (
		<div className="pa2 ma0 item-grey-out"></div>
	);
}

export function RenderFreeSlotFuture() {
	return (
		<div className="pa2 ma0 item grow shadow-1"></div>
	);
}

export function RenderFreeSlotCurrentTime() {
	return (
		<div className="pa2 ma0 item-blue grow shadow-1"></div>
	);
}

interface BookingInfo {
	company: string
	booker: string
}

export function RenderBookedSlotFuture(bookingInfo: BookingInfo) {
	let {company, booker} = bookingInfo;
	return (
		<div className="pa2 ma0 item-red grow shadow-1">
			<h3 className="primary_text">{ company }</h3>
			<p className="secondary_text">{ booker }</p>
		</div>
	);
}

export function RenderBookedSlotCurrentTime(bookingInfo: BookingInfo) {
	let {company, booker} = bookingInfo;
	return (
		<div className="pa2 ma0 item-blue grow shadow-1">
			<h3 className="primary_text">{ company }</h3>
			<p className="secondary_text">{ booker }</p>
		</div>
	);
}

export function RenderBookedSlotPassed(bookingInfo: BookingInfo) {
	let {company, booker} = bookingInfo;
	return (
		<div className="pa2 ma0 item-grey-out">
			<h3 className="primary_text">{ company }</h3>
			<p className="secondary_text">{ booker }</p>
		</div>
	);
}
