import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment';
import React, { useContext } from 'react';
import './ColumnTime.css';
import { WeekContext } from '../../utils/global/provider/WeekProvider';


const weekNow: number = parseInt(moment().format('W'));
const weekMin = weekNow - 1;
const weekMax = weekNow + 4;


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
	const [week, setWeek] = useContext(WeekContext);
	function goToPastWeek() {
		if (week > weekMin) {
			setWeek(week - 1);
		}
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
	const [week, setWeek] = useContext(WeekContext);
	function goToNextWeek() {
		if (week < weekMax) {
			setWeek(week + 1)
		}
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
