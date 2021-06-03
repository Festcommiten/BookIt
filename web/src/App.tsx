import '@material-ui/icons';
import React from 'react';
import 'tachyons';
import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar';
import Routing from './routes/Routing';
import './utils/global/Global.css';
import { ChosenDataSlotProvider, RoomProvider, WeekDataProvider } from './utils/global/provider/GlobalProvider';
import { ChoseCompanyProvider } from './utils/global/provider/ChoseCompanyProvider';
import { RemoveBookingProvider } from './utils/global/provider/RemoveBookingProvider';
import { UserProvider } from './utils/global/provider/UserProvider';
import { WeekProvider } from './utils/global/provider/WeekProvider';


function App() {
	return (
		<UserProvider>
			<WeekProvider>
				<RoomProvider>
					<ChosenDataSlotProvider>
						<RemoveBookingProvider>
							<WeekDataProvider>
								<ChoseCompanyProvider>
									<Routing>
										<Navbar/>
									</Routing>
									<Footer/>
								</ChoseCompanyProvider>
							</WeekDataProvider>
						</RemoveBookingProvider>
					</ChosenDataSlotProvider>
				</RoomProvider>
			</WeekProvider>
		</UserProvider>
	);
}

export default App;
