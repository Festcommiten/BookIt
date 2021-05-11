import React from 'react';
import { useHistory } from 'react-router-dom';
import './Navbar.css'
import RoutingPath from '../routes/RoutingPath';

export default function Navbar() {
	const history = useHistory();
	
	return (
		<nav>
			<h1 className='fl w-70'>BooK-IT</h1>
			<button className='fr w-15 primary_button' onClick={
				() => history.push(RoutingPath.loginView)
			}>Login</button>
			<button className='fr w-15 primary_button' onClick={
				() => history.push(RoutingPath.homeView)
			}>Home</button>
		</nav>
	)
}
