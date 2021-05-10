import React from 'react';
import 'tachyons';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Routing from './routes/Routing';
import './utils/global/Global.css';

// import axios from 'axios';
// import Button from '@material-ui/core/Button';
// import { Calendar, momentLocalizer } from 'react-big-calendar'

function App() {
	return (
		<>
			<Routing>
				<Navbar/>
			</Routing>
			<Footer/>
		</>
	);
}

export default App;
