import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RoutingPath from '../routes/RoutingPath';
import { UserContext } from '../utils/global/provider/UserProvider';
import './SignInView.css';
import '../components/Buttons.css';

export default function SignInView() {
	const history = useHistory();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);
	
	const login = () => {
		if (username === 'bookit' && password === 'random') {
			setAuthenticatedUser(username);
			localStorage.setItem('username', username);
			history.push(RoutingPath.homeView);
		} else {
			alert('Wrong Credentials');
		}
		
	};
	
	const handleKeyPress = (event: any) => {
		if (event.key === 'Enter') {
			login();
		}
	};
	
	return (
		<main>
			<div className="login-container">
				<div>
				
				</div>
				<div className="login-container-item tc">
					<h3 className="login-font tc">Username: </h3>
					<input type="text"
						   className="login-font login-field tc"
						   onChange={ event => setUsername(event.target.value) }/>
					<br/>
					
					<h3 className="login-font tc">Password: </h3>
					<input type="password"
						   className="login-font login-field tc"
						   onChange={ event => setPassword(event.target.value) }
						   onKeyPress={ event => handleKeyPress(event) }
					/>
					<br/>
					<br/>
					<button className="button_primary general-button-style login-button"
							onClick={ () => login() }>Sign in
					</button>
				</div>
				<div>
				
				</div>
			</div>
		</main>
	);
}
