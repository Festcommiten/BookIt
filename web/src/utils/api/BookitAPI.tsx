import Axios from 'axios'

const hostUrl = 'http://127.0.0.1';
const port = 8080;
const currentVersion = 'v1.0/';

export const url = hostUrl + ':' + port + '/' + currentVersion + '/';

const BookitAPI = Axios.create({
	baseURL: url
})

export default BookitAPI;
