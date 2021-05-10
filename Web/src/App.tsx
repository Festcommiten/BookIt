import React from 'react';
import './App.css';
import Footer from './components/Footer';
import './utils/global/Global.css';
import HomeView from './view/HomeView';
// import {
// 	BrowserRouter as Router,
// 	Switch,
// 	Route,
// 	Link
// } from "react-router-dom";
// import axios from 'axios';
// import Button from '@material-ui/core/Button';
// import { Calendar, momentLocalizer } from 'react-big-calendar'

function App() {
	return (
		<>
			<HomeView/>
			<Footer/>
		</>
	);
}

export default App;
