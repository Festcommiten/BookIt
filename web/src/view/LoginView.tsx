import React from 'react';
import { ButtonDarkGrey, ButtonLightGrey, ButtonPrimary, NavigationButtonPrimary } from '../components/Buttons';
import RoutingPath from '../routes/RoutingPath';
import { NavigationButtonData } from '../utils/interface/NavigationButtonData';

export default function LoginView() {
	let primaryButton: NavigationButtonData = {
		button_name: 'Login',
		routing_path: RoutingPath.homeView
	};
	return (
		<main>
			<h1>LoginView</h1>
			<NavigationButtonPrimary
				button_name={primaryButton.button_name}
				routing_path={primaryButton.routing_path}/>
			<ButtonPrimary
				button_name="Logging in"/>
			<ButtonDarkGrey
				button_name="Logout"/>
			<ButtonLightGrey
				button_name="Logoff"/>
		</main>
	);
}
