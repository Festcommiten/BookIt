import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';
import './WeekHeaderRow.css';

interface Data {
	week_number: number
}

export default function WeekHeaderRow(data: Data) {
	const {week_number} = data;
	return (
		<div className="week-header-row">
			<div className="mt3">
			</div>
			<div className="mt3 tr">
				<ArrowBackIosIcon className="pa2 light-brilliant-orange"/>
			</div>
			<div>
				<h1 className="mt2 mb2 pt1">v.{ week_number }</h1>
			</div>
			<div className="mt3 tl">
				<ArrowForwardIosIcon className="pa2 light-brilliant-orange"/>
			</div>
			<div className="mt3">
			</div>
		</div>
	);
}
