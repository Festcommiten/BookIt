import moment from 'moment';
import React from 'react';
import data from '../utils/api/data.json';
import './Week.css';
import ColumnRow from './Week/ColumnRow';
import ColumnTime, { ColumnTimeLeft, ColumnTimeRight } from './Week/ColumnTime';
import WeekHeaderRow from './Week/WeekHeaderRow';

export default function Week() {
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
	
	let week_days: Array<string> = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday'
	];
	let dates: Array<string> = [
		'2021-05-17',
		'2021-05-18',
		'2021-05-19',
		'2021-05-20',
		'2021-05-21'
	];
	let passed_time_slot: Array<boolean> = [
		true,
		true,
		true,
		false,
		false,
		false,
		false
	];
	let ids: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	let companies: Array<string> = [
		'SoftwareSkills',
		'Codic Consulting',
		'Codic Education',
		'Futureskill',
		'MeAnalytics',
		'GoMoGrp',
		'VipeTech'
	];
	let bookers: Array<string> = [
		'Robin Kamo',
		'Leo Backend',
		'Niklas på Ópsss',
	];
	let start_times: Array<string> =[
		"2021-05-18T8:00:00+02:00",
		"2021-05-18T9:00:00+02:00",
		"2021-05-18T10:00:00+02:00",
		"2021-05-18T11:00:00+02:00",
		"2021-05-18T12:00:00+02:00",
		"2021-05-18T13:00:00+02:00",
		"2021-05-18T14:00:00+02:00",
		"2021-05-18T15:00:00+02:00",
		"2021-05-18T16:00:00+02:00",
	]
	// let oneDayData: OneDayData;
	
	
	let start_slot = [8, 9, 10, 11, 12, 13, 14, 15, 16];
	
	function fillOneDayData(day_index:number) {
		let oneDayData: OneDayData = {
			weekday: week_days[day_index],
			date: dates[day_index],
			datasource: []
		};
		
		for (let i = 0; i < start_slot.length; i++) {
			let temp: DataSource = {
				passed_time_slot: passed_time_slot[i],
				id: ids[i],
				company: companies[0],
				booker: bookers[0],
				start_time: moment(start_times[i])
			};
			oneDayData.datasource.push(temp);
		}
		return oneDayData;
	}
	
	let wholeWeekData:Array<OneDayData> = []
	
	function makaWholeWeekData() {
		for (let i = 0; i < 5; i++) {
			wholeWeekData.push(fillOneDayData(i))
		}
	}
	makaWholeWeekData()
	
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
	let time_slots = [
		true,
		true,
		true,
		false,
		false,
		false,
		false
	];
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
	// check_for_monday_data();
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
				{/*<ColumnTime/>*/}
				<ColumnTimeLeft/>
				{
					wholeWeekData.map((data, i) => {
						return (
							<ColumnRow
								key={ i }
								weekday={ wholeWeekData[i].weekday }
								date={ wholeWeekData[i].date }
								datasource={ wholeWeekData[i].datasource }
							/>
						)
					})
				}
				<ColumnTimeRight/>
				{/*<ColumnTime/>*/}
			</div>
		</div>
	);
}
