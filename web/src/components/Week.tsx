import moment from 'moment';
import React from 'react';
import { IndividualSlotData, OneDayColumnData, OneWeekData } from '../utils/interface/WeekInterface';
import { bookers, companies, dates, ids, start_slot, start_times, week_days } from '../utils/mock/MockData';
import './Week.css';
import ColumnRow from './Week/ColumnRow';
import { ColumnTimeLeft, ColumnTimeRight } from './Week/ColumnTime';

export default function Week() {
	// axios.get('data.json')
	// 	.then(response => console.log(response.data))
	// 	.catch(error => console.log(error))
	
	// interface SlotData {
	// 	company: string
	// 	booker: string
	// 	start_time: moment.Moment
	// 	end_time: moment.Moment
	// }
	// interface SlotDataStartTime {
	// 	company: string
	// 	booker: string
	// 	start_time: number
	// }
	// interface JsonData {
	// 	room: string
	// 	week: number
	// 	booking_company: string
	// 	booker: string
	// 	start_time: moment.Moment
	// 	end_time: moment.Moment
	// }
	// console.log(data);
	// const today = moment();
	// console.log(today.format());
	// console.log(today.dayOfYear());
	// console.log(today.hour());
	// let room: string = 'kakashi';
	// let week_number = today.week() - 1;
	// let time_slots = [
	// 	true,
	// 	true,
	// 	true,
	// 	false,
	// 	false,
	// 	false,
	// 	false
	// ];
	// let monday_data: Array<SlotData> = [];
	
	// function check_for_monday_data() {
	// 	for (let i = 0; i < data.length; i++) {
	// 		if (data[i].room === room && data[i].week === week_number) {
	// 			let slot_data: SlotData = {
	// 				company: data[i].booking_company,
	// 				booker: data[i].booker,
	// 				start_time: moment(data[i].start_time),
	// 				end_time: moment(data[i].end_time),
	// 			};
	//
	// 			monday_data.push(slot_data);
	// 		}
	// 	}
	// 	// console.log(monday_data);
	// }
	// check_for_monday_data();
	// let hours: Array<number> = [];
	// let hours_info: Array<SlotDataStartTime> = [];
	// function get_hours() {
	// 	for (let i = 0; i < monday_data.length; i++) {
	// 		let day = moment(dates[0]);
	// 		if (day.dayOfYear() === monday_data[i].start_time.dayOfYear()) {
	// 			hours.push(monday_data[i].start_time.hour());
	// 			let temp: SlotDataStartTime = {
	// 				company: monday_data[i].company,
	// 				booker: monday_data[i].booker,
	// 				start_time: monday_data[i].start_time.hour()
	// 			};
	// 			hours_info.push(temp);
	// 		}
	// 	}
	// }
	// let controller: Array<boolean> = [];
	// function compare_time_slots() {
	// 	let index: number = 0;
	// 	for (let i = 0; i < start_slot.length; i++) {
	// 		if (start_slot[i] === hours[index]) {
	// 			controller.push(true);
	// 			index += 1;
	// 		} else {
	// 			controller.push(false);
	// 		}
	// 	}
	// }
	// function render_monday() {
	// 	hours = [];
	// 	controller = [];
	// 	// get_hours();
	// 	hours.sort(function (a, b) {
	// 		return a - b;
	// 	});
	// 	console.log(hours);
	// 	// compare_time_slots();
	// 	console.log(controller);
	// 	console.log(hours_info);
	// 	return (
	// 		<>
	//
	// 		</>
	// 	);
	// }
	
	function getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}
	
	let passedSlots: number = 21;
	let currentSlot: number = 0;
	
	function generateOneDayData(day_index: number) {
		let oneDayData: OneDayColumnData = {
			weekday: week_days[day_index],
			date: dates[day_index],
			slotDatas: []
		};
		
		for (let i = 0; i < start_slot.length; i++) {
			let timeIsPassed = true;
			if (currentSlot > passedSlots) {
				timeIsPassed = false;
			}
			currentSlot += 1;
			
			let temp: IndividualSlotData = {
				passed_time_slot: timeIsPassed,
				empty_slot: Boolean(getRandomInt(2)),
				id: ids[i],
				company: companies[getRandomInt(companies.length)],
				booker: bookers[getRandomInt(bookers.length)],
				start_time: moment(start_times[day_index][i])
			};
			oneDayData.slotDatas.push(temp);
			
		}
		return oneDayData;
	}
	
	function generateOneWeekData() {
		let data: OneWeekData = {
			week: 21,
			room: 'Kakashi',
			oneWeek: []
		};
		for (let i = 0; i < 5; i++) {
			data.oneWeek.push(generateOneDayData(i));
		}
		
		return data;
	}
	
	let data: OneWeekData = generateOneWeekData();
	
	return (
		<div className="tc">
			<div className="week-column">
				<ColumnTimeLeft/>
				{
					data.oneWeek.map((ds, i) => {
						return (
							<ColumnRow
								key={ i }
								weekday={ data.oneWeek[i].weekday }
								date={ data.oneWeek[i].date }
								slotDatas={ data.oneWeek[i].slotDatas }
							/>
						);
					})
				}
				<ColumnTimeRight/>
			</div>
		</div>
	);
}
