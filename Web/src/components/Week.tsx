import moment from 'moment';
import React from 'react';
import data from '../utils/api/data.json';
import './Week.css';
import ColumnRow from './Week/ColumnRow';
import ColumnTime from './Week/ColumnTime';
import WeekHeaderRow from './Week/WeekHeaderRow';

export default function Week() {
	
	// axios.get('data.json')
	// 	.then(response => console.log(response.data))
	// 	.catch(error => console.log(error))
	
	interface SlotData {
		company: string
		booker: string
		start_time: moment.Moment
		end_time: moment.Moment
	}
	
	interface SlotDataStartTime {
		company: string
		booker: string
		start_time: number
	}
	
	interface JsonData {
		room: string
		week: number
		booking_company: string
		booker: string
		start_time: moment.Moment
		end_time: moment.Moment
	}
	
	// console.log(data);
	const today = moment();
	// console.log(today.format());
	// console.log(today.dayOfYear());
	// console.log(today.hour());
	
	let room: string = 'kakashi';
	let week_number = today.week() - 1;
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
	let start_slot = [8, 9, 10, 11, 12, 13, 14, 15, 16];
	let week_days = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday'
	];
	let dates = [
		'2021-05-17',
		'2021-05-18',
		'2021-05-19',
		'2021-05-20',
		'2021-05-21'
	];
	let companies: Array<string> = [
		'SoftwareSkills',
		'Codic Consulting',
		'Codic Education',
		'Futureskill',
		'MeAnalytics',
		'GoMoGrp',
		'VipeTech'
	];
	
	const render_time_slots = time_slot.map((slot, i) => {
		return (
			<div key={ i } className="pa2 ma0 item-time"><p>{ time_slot[i] }</p></div>
		);
	});
	
	let monday_data: Array<SlotData> = [];
	
	function check_for_monday_data() {
		for (let i = 0; i < data.length; i++) {
			if (data[i].room == room && data[i].week == week_number) {
				let slot_data: SlotData = {
					company: data[i].booking_company,
					booker: data[i].booker,
					start_time: moment(data[i].start_time),
					end_time: moment(data[i].end_time),
				};
				
				monday_data.push(slot_data);
			}
		}
		// console.log(monday_data);
	}
	
	check_for_monday_data();
	let hours: Array<number> = [];
	
	let hours_info: Array<SlotDataStartTime> = [];
	
	function get_hours() {
		for (let i = 0; i < monday_data.length; i++) {
			let day = moment(dates[0]);
			if (day.dayOfYear() == monday_data[i].start_time.dayOfYear()) {
				hours.push(monday_data[i].start_time.hour());
				let temp: SlotDataStartTime = {
					company: monday_data[i].company,
					booker: monday_data[i].booker,
					start_time: monday_data[i].start_time.hour()
				};
				hours_info.push(temp);
			}
		}
	}
	
	let controller: Array<boolean> = [];
	
	function compare_time_slots() {
		let index: number = 0;
		for (let i = 0; i < start_slot.length; i++) {
			if (start_slot[i] == hours[index]) {
				controller.push(true);
				index += 1;
			} else {
				controller.push(false);
			}
		}
	}
	
	function render_monday() {
		hours = [];
		controller = [];
		// get_hours();
		hours.sort(function (a, b) {
			return a - b;
		});
		console.log(hours);
		// compare_time_slots();
		console.log(controller);
		console.log(hours_info);
		return (
			<>
			
			</>
		);
	}
	
	return (
		<div className="tc">
			{/*<WeekHeaderRow week_number={ week_number }/>*/ }
			
			<div className="week-column">
				<ColumnTime/>
				{/*<div className="week-column_rows">
					<div className="pa2 ma0 item">
						<p className="primary_text">{ week_days[0] }</p>
						<p className="secondary_text">{ dates[0] }</p>
					</div>
					<div className="pa2 ma0 item">0</div>
					<div className="pa2 ma0 item">1</div>
					<div className="pa2 ma0 item">2</div>
					<div className="pa2 ma0 item">3</div>
					<div className="pa2 ma0 item-red">
						<h3 className="primary_text">Codic Education</h3>
						<p className="secondary_text">Robin Kamo</p></div>
					<div className="pa2 ma0 item">5</div>
					<div className="pa2 ma0 item">6</div>
					<div className="pa2 ma0 item">7</div>
					<div className="pa2 ma0 item">8</div>
				</div>*/ }
				<ColumnRow
					weekday={ week_days[0] }
					date={ dates[0] }
					isTrue={ true }
					company={ companies[0] }
					booker={ 'Robin Kamo' }
					index={ 1 }/>
				<ColumnRow
					weekday={ week_days[1] }
					date={ dates[1] }
					isTrue={ true }
					company={ companies[1] }
					booker={ 'Robin Kamo' }
					index={ 1 }/>
				<ColumnRow
					weekday={ week_days[2] }
					date={ dates[2] }
					isTrue={ true }
					company={ companies[2] }
					booker={ 'Robin Kamo' }
					index={ 1 }/>
				<ColumnRow
					weekday={ week_days[3] }
					date={ dates[3] }
					isTrue={ true }
					company={ companies[3] }
					booker={ 'Robin Kamo' }
					index={ 1 }/>
				<ColumnRow
					weekday={ week_days[4] }
					date={ dates[4] }
					isTrue={ true }
					company={ companies[4] }
					booker={ 'Robin Kamo' }
					index={ 1 }/>
				<ColumnTime/>
			</div>
		</div>
	);
}
