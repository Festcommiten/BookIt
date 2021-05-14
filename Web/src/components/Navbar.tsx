import React from 'react';
import { useHistory } from 'react-router-dom';
import './Navbar.css'
import RoutingPath from '../routes/RoutingPath';

export default function Navbar() {
	// Används för navigering på hemsidan mellan HomeView och LoginView
	const history = useHistory();
	
	return (
		<nav>
			<h1 className='fl ml1 ml3-ns'>BooK-IT</h1>
			
			<div className='fr mr1 mt3 mr3-ns'>
				
				<button className='fr primary_button' onClick={
					() => history.push(RoutingPath.loginView)
				}>Login</button>
				
				<button className='fr mr2 mr4-ns primary_button' onClick={
					() => history.push(RoutingPath.homeView)
				}>Home</button>
			</div>
		</nav>
	)
}
