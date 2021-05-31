import moment from 'moment';

// Data structure for one slot
export interface IndividualSlotData {
	passed_time_slot: boolean
	empty_slot: boolean
	id: number
	company: string
	booker: string
	start_time: moment.Moment
}

// Data structure for one day
export interface OneDayColumnData {
	weekday: string
	date: string
	slotDatas: Array<IndividualSlotData>
}

// Data structure from API
export interface OneWeekData {
	oneWeek: Array<OneDayColumnData>
}


export interface BookingInfo {
	company: string
	booker: string
}

export interface WeekDate {
	weekday: string
	date: string
}

export interface JsonData {
	_id: number
	booker: string
	company: string
	end_time: moment.Moment
	room: string
	starting_time: moment.Moment
	week: number
}
