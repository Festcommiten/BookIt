import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RoutingPath from '../../routes/RoutingPath';
import { UserContext } from '../../utils/global/provider/UserProvider';
import { NavigationButtonPrimary } from '../Buttons';
import { DisplayRoom } from './DisplayRoom';
import { DisplayWeek } from './DisplayWeek';
import './Navbar.css';

export default function Navbar() {
	const history = useHistory();
	const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);
	
	const logout = () => {
		localStorage.removeItem('username');
		setAuthenticatedUser(false);
		history.push(RoutingPath.loginView);
	};
	
	const displayWeekIfLoggedIn = () => {
		return (authenticatedUser)
			? <DisplayWeek/>
			: <></>;
	};
	
	const displayRoomIfLoggedIn = () => {
		return (authenticatedUser)
			? <DisplayRoom/>
			: <></>;
	};
	
	return (
		<nav className="pa3">
			<div className="fl w-third">
				<h1 className="mt0 mb0" onClick={ logout }>BooK-IT</h1>
			</div>
			
			<div className="fl w-third">
				{ displayWeekIfLoggedIn() }
			</div>
			<div className="fl w-third mt1">
				{ displayRoomIfLoggedIn() }
			</div>
		</nav>
	);
}
