import React from 'react';
import { render, screen } from '@testing-library/react';
import { ButtonPrimary, NavigationButtonPrimary, ButtonLightGrey, ButtonDarkGrey } from './Buttons';

test('render PrimaryButton', () => {
	render(<ButtonPrimary button_name="ButtonPrimary"/>);
	const buttonElement = screen.getByText(/ButtonPrimary/i);
	expect(buttonElement).toBeInTheDocument();
});

test('render NavigationButtonPrimary', () => {
	render(<NavigationButtonPrimary button_name="NavigationButtonPrimary" routing_path={ '/home' }/>);
	const buttonElement = screen.getByText(/NavigationButtonPrimary/i);
	expect(buttonElement).toBeInTheDocument();
});


test('render ButtonLightGrey', () => {
	render(<ButtonLightGrey button_name="ButtonLightGrey"/>);
	const buttonElement = screen.getByText(/ButtonLightGrey/i);
	expect(buttonElement).toBeInTheDocument();
});


test('render ButtonDarkGrey', () => {
	render(<ButtonDarkGrey button_name="ButtonDarkGrey"/>);
	const buttonElement = screen.getByText(/ButtonDarkGrey/i);
	expect(buttonElement).toBeInTheDocument();
});
