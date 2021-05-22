import React from 'react';
import RoutingPath from '../routes/RoutingPath';
import { NavigationButtonPrimary } from './Buttons';
import './Navbar.css';

export default function Navbar() {
	
	return (
		<nav className="pa3">
			<div className="fl w-third">
				<h1 className="mt0 mb0">BooK-IT</h1>
			</div>
			
			<div className="fl w-third">
				<h1 className="tc mt0 mb0">Kakashi</h1>
				{/*<div className='grid-footer-inner'>
					<div className="mt1 tl">
						<ArrowBackIosIcon className="pa2 light-brilliant-orange"/>
					</div>
					<div>
						<h1 className=" ma0 tc">v.19</h1>
					</div>
					<div className="mt1 tr">
						<ArrowForwardIosIcon className="pa2 light-brilliant-orange"/>
					</div>
				</div>*/ }
			</div>
			
			<div className="fl w-third mt1">
				
				<div className="fr mr1">
					<NavigationButtonPrimary
						button_name="Login"
						routing_path={ RoutingPath.loginView }/>
				</div>
				
				<div className="fr mr4-ns">
					<NavigationButtonPrimary
						button_name="Home"
						routing_path={ RoutingPath.homeView }/>
				</div>
			</div>
		</nav>
	);
}
