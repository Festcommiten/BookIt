import axios from 'axios';
import { bookers } from '../mock/MockData';

const url = 'http://127.0.0.1:80/';
const currentVersion = 'v1.0/';

const urlVersion = url + currentVersion;

function hello_world() {
	axios.get(urlVersion)
		.then(response => console.log(response.data))
		.catch(error => console.log(error));
}

function getWeekForRoom(week: number, room: string) {
	axios.get(urlVersion + `bookings/${ week }/${ room }`)
		.then(response => console.log(response.data))
		.catch(error => console.log(error));
}

interface NewBooking {
	_id: number
	company: string
	booker: string
}

function newBooking(id: number, company: string, booker: string) {
	let newBooking: NewBooking = {
		_id: id,
		company: company,
		booker: booker
	};
	
	axios.put(urlVersion + `new_booking/${ id }`, newBooking)
		.then(response => console.log(response.data))
		.catch(error => console.log(error));
}

function removeBooking(id: number) {
	axios.put(urlVersion + `remove/${ id }`)
		.then(response => console.log(response.data))
		.catch(error => console.log(error));
}

export {
	hello_world,
	getWeekForRoom,
	newBooking,
	removeBooking
};
