import moment from 'moment';

export interface DataSource {
	passed_time_slot: boolean
	empty_slot: boolean
	id: number
	company: string
	booker: string
	start_time: moment.Moment
}

export interface OneDayData {
	weekday: string
	date: string
	datasource: Array<DataSource>
}
