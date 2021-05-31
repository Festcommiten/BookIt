import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from '../utils/global/provider/UserProvider';
import SignInView from '../view/SignInView';
import HomeView from '../view/HomeView';

export const AppSwitch = () => {
	const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);
	
	const blockRouteIfAuthenticated = (navigateToView: any) => {
		return (authenticatedUser)
			? HomeView
			: navigateToView;
	};
	
	const blockRouteIfNotAuthenticated = (navigateToView: any) => {
		return (!authenticatedUser)
			? SignInView
			: navigateToView;
	};
	
	return (
		<Switch>
			<Route exact path="/home" component={ blockRouteIfNotAuthenticated(HomeView) }/>
			<Route component={ blockRouteIfAuthenticated(SignInView) }/>
		</Switch>
	);
};
