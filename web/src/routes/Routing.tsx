import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppSwitch } from './AppSwitch';

export default function Routing(props: any) {
	return (
		<Router>
			{ props.children }
			<AppSwitch />
		</Router>
	);
}
