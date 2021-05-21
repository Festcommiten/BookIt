import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginView from '../view/LoginView';
import HomeView from '../view/HomeView';

export const AppSwitch = () => {
	return (
		<Switch>
			<Route exact path="/home" component={ HomeView }/>
			<Route component={ LoginView }/>
		</Switch>
	);
};
