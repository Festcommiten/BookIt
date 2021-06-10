import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppSwitch } from './AppSwitch';
import { UserContext } from '../utils/global/provider/UserProvider';


export default function Routing(props: any) {
	const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);
	
	const checkIfUserIsAuthenticated = () => {
		setAuthenticatedUser(localStorage.getItem('username'));
	};
	
	useEffect(() => {
		checkIfUserIsAuthenticated();
	}, []);
	
	return (
		<Router>
			{ props.children }
			<AppSwitch/>
		</Router>
	);
}
