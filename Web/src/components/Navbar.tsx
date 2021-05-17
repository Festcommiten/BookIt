import React from 'react';
import RoutingPath from '../routes/RoutingPath';
import { NavigationButtonPrimary } from './Buttons';
import './Navbar.css';

export default function Navbar() {
	
	return (
		<nav>
			<h1 className='fl ml1 ml3-ns'>BooK-IT</h1>
			
			<div className='fr mr1 mt3 mr3-ns'>
				
				<div className='fr'>
					<NavigationButtonPrimary
						button_name='Login'
						routing_path={RoutingPath.loginView} />
				</div>
				
				<div className='fr mr2 mr4-ns'>
					<NavigationButtonPrimary
						button_name='Home'
						routing_path={RoutingPath.homeView}/>
				</div>
			</div>
		</nav>
	)
}
