import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';
import './ColumnTime.css';

let time_slot = [
	'8-9',
	'9-10',
	'10-11',
	'11-12',
	'12-13',
	'13-14',
	'14-15',
	'15-16',
	'16-17'
];

const render_time_slots = time_slot.map((slot, i) => {
	return (
		<div key={ i } className="pa2 ma0 item-time">
			<p>{ time_slot[i] }</p>
		</div>
	);
});

export function ColumnTimeLeft() {
	function goToPastWeek() {
		alert('Past week');
	}
	
	return (
		<div className="week-column_rows">
			<div onClick={ goToPastWeek }>
				<ArrowBackIosIcon
					fontSize="large"
					className="navigation-arrows mt3 ml3"/>
			</div>
			{ render_time_slots }
		</div>
	);
}

export function ColumnTimeRight() {
	function goToNextWeek() {
		alert('Next week');
	}
	
	return (
		<div className="week-column_rows">
			<div onClick={ goToNextWeek }>
				<ArrowForwardIosIcon
					fontSize="large"
					className="navigation-arrows mt3 mr2"/>
			</div>
			{ render_time_slots }
		</div>
	);
}
