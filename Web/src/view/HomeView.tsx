import React, { Component } from 'react';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Week from '../components/Week';

class HomeView extends Component {
	
	
	render() {
		return (
		<main>
			<Week />
		</main>
		);
	};
}

export default HomeView;
