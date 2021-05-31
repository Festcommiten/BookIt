import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RoutingPath from '../routes/RoutingPath';
import { UserContext } from '../utils/global/provider/UserProvider';

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
			alert('Wrong Credentials')
		}
		
	};
	
	return (
		<main>
			<h1>SignInView</h1>
			<h2>{ username }</h2>
			
			<span>Username: </span><
			input type="text"
				  onChange={ event => setUsername(event.target.value) }/>
			<br/>
			
			<span>Password: </span>
			<input type="password"
				   onChange={ event => setPassword(event.target.value) }/>
			<br/>
			<button onClick={ () => login() }>Sign in</button>
		</main>
	);
}
