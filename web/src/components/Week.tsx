import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import 'reactjs-popup/dist/index.css';
import BookitService from '../utils/api/service/BookItService';
import { RoomContext } from '../utils/global/provider/GlobalProvider';
import { WeekContext } from '../utils/global/provider/WeekProvider';
import { IndividualSlotData, JsonData, OneDayColumnData, OneWeekData } from '../utils/interface/WeekInterface';
import './Week.css';
import { BookingHandling } from './Week/BookingHandling';
import RemoveBooking from './Week/bookings/RemoveBooking';
import ColumnRow from './Week/ColumnRow';
import { ColumnTimeLeft, ColumnTimeRight } from './Week/ColumnTime';


let week_days: Array<string> = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday'
];

export const Week = () => {
	const [data, setData] = useState<OneWeekData | undefined>(undefined);
	const [week, setWeek] = useContext(WeekContext);
	const [room, setRoom] = useContext(RoomContext);
	
	
	const fetchDataFromApi = () => {
		BookitService.getWeekForRoom(week, room)
			.then(response => {
				setData(buildDataAllInOne(response.data));
			})
			.catch(error => console.log(error));
	};
	
	
	useEffect(() => {
		fetchDataFromApi();
	}, [week, room]);
	
	function buildDataAllInOne(responseData: [JsonData]) {
		let weekData: OneWeekData = {
			oneWeek: []
		};
		
		let oneDay: OneDayColumnData = {
			weekday: '',
			date: '',
			slotDatas: []
		};
		
		let timeNow = moment();
		let dateNow = timeNow.dayOfYear();
		let hourNow = timeNow.hour();
		
		const SLOT_DAYS = 5;
		const SLOTS_PER_DAY = 9;
		let index = 0;
		for (let j = 0; j < SLOT_DAYS; j++) {
			oneDay.weekday = week_days[j];
			oneDay.date = moment(responseData[j * 9].starting_time)
				.format('YYYY-MM-DD');
			for (let i = 0; i < SLOTS_PER_DAY; i++) {
				let timeInSlot = moment(responseData[index].starting_time);
				let dateInSlot = timeInSlot.dayOfYear();
				let hourInSlot = timeInSlot.hour();
				
				let tempPassedTimeSlot: boolean = false;
				let tempEmptySlot: boolean = false;
				let tempId: number = responseData[index]._id;
				let tempCompany: string = responseData[index].company;
				let tempBooker: string = responseData[index].booker;
				let tempStartTime: moment.Moment = responseData[index].starting_time;
				
				if (dateNow > dateInSlot) {
					tempPassedTimeSlot = true;
				} else if (dateNow === dateInSlot && hourNow > hourInSlot) {
					tempPassedTimeSlot = true;
				}
				
				if (tempCompany === '' && tempBooker === '') {
					tempEmptySlot = true;
				}
				
				let temp: IndividualSlotData = {
					passed_time_slot: tempPassedTimeSlot,
					empty_slot: tempEmptySlot,
					id: tempId,
					company: tempCompany,
					booker: tempBooker,
					start_time: tempStartTime
				};
				oneDay.slotDatas.push(temp);
				index += 1;
			}
			weekData.oneWeek.push(oneDay);
			oneDay = {
				weekday: '',
				date: '',
				slotDatas: []
			};
		}
		return weekData;
	}
	
	return (
		<div className="tc">
			<div className="week-column">
				<ColumnTimeLeft/>
				{
					data?.oneWeek.map((ds, i) => {
						return (
							<ColumnRow
								key={ i }
								weekday={ data?.oneWeek[i].weekday }
								date={ data?.oneWeek[i].date }
								slotDatas={ data?.oneWeek[i].slotDatas }
							/>
						);
					})
				}
				<ColumnTimeRight/>
			</div>
			<BookingHandling/>
			<RemoveBooking/>
		</div>
	);
};
