import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment';
import React, { useContext } from 'react';
import { DataSlotHeightContext } from '../../utils/global/provider/GlobalProvider';
import { WeekContext } from '../../utils/global/provider/WeekProvider';
import './ColumnTime.css';


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

let useHeight = 0;

const render_time_slots = (height: number) => {
	if (height < 50) {
		return time_slot.map((slot, i) => {
			return (
				<div style={ {height: height} }
					 key={ i }
					 className="item-time">
					<p>{ time_slot[i] }</p>
				</div>
			);
		});
	} else {
		return time_slot.map((slot, i) => {
			return (
				<div style={ {height: height} }
					 key={ i }
					 className="item-time pt2 f4">
					<p>{ time_slot[i] }</p>
				</div>
			);
		});
	}
};

export function ColumnTimeLeft() {
	const [week, setWeek] = useContext(WeekContext);
	const [height, setHeight] = useContext(DataSlotHeightContext);
	useHeight = height
	
	function goToPastWeek() {
		if (week > weekMin) {
			setWeek(week - 1);
		}
	}
	
	return (
		<div className="week-column-rows">
			<div onClick={ goToPastWeek }>
				<ArrowBackIosIcon
					fontSize="large"
					className="navigation-arrows mt3 ml3"/>
			</div>
			{ render_time_slots(height) }
		</div>
	);
}

export function ColumnTimeRight() {
	const [week, setWeek] = useContext(WeekContext);
	const [height, setHeight] = useContext(DataSlotHeightContext);
	useHeight = height
	
	function goToNextWeek() {
		if (week < weekMax) {
			setWeek(week + 1);
		}
	}
	
	return (
		<div className="week-column-rows">
			<div onClick={ goToNextWeek }>
				<ArrowForwardIosIcon
					fontSize="large"
					className="navigation-arrows mt3 mr2"/>
			</div>
			{ render_time_slots(height) }
		</div>
	);
}
