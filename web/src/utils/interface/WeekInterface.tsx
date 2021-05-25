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
	week: number
	room: string
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
