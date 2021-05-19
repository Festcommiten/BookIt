import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';

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
		<div key={ i } className="pa2 ma0 item-time"><p>{ time_slot[i] }</p></div>
	);
});

export default function ColumnTime() {
	return (
		<div className="week-column_rows">
			<div className="mt1 tc shadow-1 br4">
				<ArrowBackIosIcon className="mt3 ml2 light-brilliant-orange"/>
			</div>
			{ render_time_slots }
		</div>
	);
}
