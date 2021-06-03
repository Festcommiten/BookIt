import http from '../BookitAPI'

const getWeekForRoom = (week: number, room: string) => {
	return http.get(`bookings/${ week }/${ room }`)
}

const getCompaniesAndUsers = () => {
	return http.get(`users`)
}

interface NewBooking {
	_id: number
	company: string
	booker: string
}

const newBooking = (id: number, company: string, booker: string) => {
	let newBooking: NewBooking = {
		_id: id,
		company: company,
		booker: booker
	};
	
	return http.put(`new_booking/${ id }`, newBooking)
}

const removeBooking = (id: number) => {
	return http.put(`remove/${ id }`)
}

export default {
	getWeekForRoom,
	getCompaniesAndUsers,
	newBooking,
	removeBooking
}
