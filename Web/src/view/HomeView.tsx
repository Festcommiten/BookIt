import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class HomeView extends Component {
	state = {
		events: [
			{
				start: moment().toDate(),
				end: moment()
					.add(1, 'days')
					.toDate(),
				title: 'Some title'
			}
		]
	};
	
	render() {
		return (
		<main>
			<h1>
				HomeView
			</h1>
			<Calendar
				localizer={localizer}
				defaultDate={new Date()}
				defaultView="week"
				events={this.state.events}
				style={{ height: "100vh" }}
			/>
		</main>
		);
	};
}

export default HomeView;
