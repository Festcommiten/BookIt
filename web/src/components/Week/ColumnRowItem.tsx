import React from 'react';
import './ColumnRowItem.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { BookingInfo, WeekDate } from '../../utils/interface/WeekInterface';

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
		<div className="pa2 ma0 item-time-passed"></div>
	);
}

export function RenderBookedSlotPassed(bookingInfo: BookingInfo) {
	let {company, booker} = bookingInfo;
	return (
		<div className="pa2 ma0 item-time-passed">
			<h3 className="item-text-passed-h3">{ company }</h3>
			<p className="item-text-passed-p">{ booker }</p>
		</div>
	);
}

export function RenderFreeSlotCurrentTime() {
	return (
		<div className="pa2 ma0 item-time-current grow shadow-1">
			<AddCircleOutlineIcon className='mt2 pt1'/>
		</div>
	);
}

export function RenderBookedSlotCurrentTime(bookingInfo: BookingInfo) {
	let {company, booker} = bookingInfo;
	return (
		<div className="pa2 ma0 item-time-current grow shadow-1">
			<h3 className="item-text-current-h3">{ company }</h3>
			<p className="item-text-current-p">{ booker }</p>
		</div>
	);
}

export function RenderFreeSlotFuture() {
	return (
		<div className="pa2 ma0 item-time-future grow shadow-1">
			<AddCircleOutlineIcon className='mt2 pt1'/>
		</div>
	);
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
