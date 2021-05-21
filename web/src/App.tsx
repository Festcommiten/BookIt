import React from 'react';
import 'tachyons';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Routing from './routes/Routing';
import './utils/global/Global.css';
import '@material-ui/icons'

// import axios from 'axios';
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
