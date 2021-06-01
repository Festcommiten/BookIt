import '@material-ui/icons';
import React from 'react';
import 'tachyons';
import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar';
import Routing from './routes/Routing';
import './utils/global/Global.css';
import { RoomProvider, WeekDataProvider } from './utils/global/provider/GlobalProvider';
import { PopUpProvider } from './utils/global/provider/PopUpProvider';
import { UserProvider } from './utils/global/provider/UserProvider';
import { WeekProvider } from './utils/global/provider/WeekProvider';


function App() {
	return (
		<UserProvider>
			<WeekProvider>
				<RoomProvider>
					<WeekDataProvider>
						<PopUpProvider>
							<Routing>
								<Navbar/>
							</Routing>
							<Footer/>
						</PopUpProvider>
					</WeekDataProvider>
				</RoomProvider>
			</WeekProvider>
		</UserProvider>
	);
}

export default App;
