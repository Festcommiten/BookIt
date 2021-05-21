import React from 'react';
import './Buttons.css';
import { useHistory } from 'react-router-dom';
import { ButtonData, NavigationButtonData } from '../utils/interface/NavigationButtonData';

export function ButtonPrimary(data: ButtonData) {
	let {button_name, } = data;
	return (
		<>
			<button
				className="general-button-style button_primary">
				{ button_name }
			</button>
		</>
	);
}



export function ButtonDarkGrey(data: ButtonData) {
	let {button_name} = data;
	return (
		<>
			<button className="general-button-style button_dark_grey">
				{ button_name }
			</button>
		</>
	);
}

export function ButtonLightGrey(data: ButtonData) {
	let {button_name} = data;
	return (
		<>
			<button className="general-button-style button_light_grey">
				{ button_name }
			</button>
		</>
	);
}

// Navigation buttons

export function NavigationButtonPrimary(data: NavigationButtonData) {
	let {button_name, routing_path} = data;
	const history = useHistory();
	return (
		<>
			<button
				className="general-button-style button_primary"
				onClick={
					() => history.push(routing_path)
				}>
				{ button_name }
			</button>
		</>
	);
}
