import Axios from 'axios'

// const hostUrl = 'http://127.0.0.1';
const hostUrl = 'http://51.116.187.202';
// const port = 8080;
const port = 80;

const currentVersion = 'v1.0/';

export const url = hostUrl + ':' + port + '/' + currentVersion + '/';

const BookitAPI = Axios.create({
	baseURL: url
})

export default BookitAPI;
