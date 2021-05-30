import axios from 'axios';

const hostUrl = 'http://127.0.0.1';
const port = 8080;
const currentVersion = 'v1.0/';

export const url = hostUrl + ':' + port + '/' + currentVersion;

function hello_world() {
	axios.get(url)
		.then(response => console.log(response.data))
		.catch(error => console.log(error));
}

async function getWeekForRoom(week: number, room: string) {
	axios.get(url + `bookings/${ week }/${ room }`)
		.then(response => {
			return response.data;
		})
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
	
	axios.put(url + `new_booking/${ id }`, newBooking)
		.then(response => console.log(response.data))
		.catch(error => console.log(error));
}

function removeBooking(id: number) {
	axios.put(url + `remove/${ id }`)
		.then(response => console.log(response.data))
		.catch(error => console.log(error));
}

export {
	hello_world,
	getWeekForRoom,
	newBooking,
	removeBooking
};
