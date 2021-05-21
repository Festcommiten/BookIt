import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeView from '../view/HomeView';
import LoginView from '../view/LoginView';
import { AppSwitch } from './AppSwitch';
import RoutingPath from './RoutingPath';

export default function Routing(props: any) {
	return (
		<Router>
			{ props.children }
			<AppSwitch />
		</Router>
	);
}
