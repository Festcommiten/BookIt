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
					.add(1, 'hours')
					.toDate(),
				title: 'Some title'
			}
		]
	};
	
	render() {
		return (
		<main>
			<Calendar
				localizer={localizer}
				defaultDate={new Date()}
				defaultView="week"
				events={this.state.events}
				style={{ height: "75vh" }}
			/>
		</main>
		);
	};
}

export default HomeView;
