import '@material-ui/icons';
import React from 'react';
import 'tachyons';
import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar';
import Routing from './routes/Routing';
import './utils/global/Global.css';
import { RoomProvider, WeekDataProvider, WeekProvider } from './utils/global/provider/GlobalProvider';
import { UserProvider } from './utils/global/provider/UserProvider';


function App() {
	return (
		<UserProvider>
			<WeekProvider>
				<RoomProvider>
					<WeekDataProvider>
						<Routing>
							<Navbar/>
						</Routing>
						<Footer/>
					</WeekDataProvider>
				</RoomProvider>
			</WeekProvider>
		</UserProvider>
	);
}

export default App;
