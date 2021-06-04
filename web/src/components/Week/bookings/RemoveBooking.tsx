import React, { useContext } from 'react';
import Popup from 'reactjs-popup';
import BookItService from '../../../utils/api/service/BookItService';
import { ChosenDataSlotContext } from '../../../utils/global/provider/GlobalProvider';
import { RemoveBookingContext } from '../../../utils/global/provider/RemoveBookingProvider';
import './RemoveBooking.css';

export default function RemoveBooking() {
	const [chosenDataSlot, setChosenDataSlot] = useContext(ChosenDataSlotContext);
	const [removeCompany, setRemoveCompany] = useContext(RemoveBookingContext);
	const closeModalRemoveBooking = () => setRemoveCompany(false);
	
	function sendToApi() {
		console.log('Booking ' + chosenDataSlot + ' removed!');
		BookItService.removeBooking(chosenDataSlot)
			.then(response => {
				console.log('response', response);
			})
			.catch(error => console.log(error));
		setRemoveCompany(false);
	}
	
	return (
		<Popup open={ removeCompany } closeOnDocumentClick onClose={ closeModalRemoveBooking }>
			<div className="modal">
				<div className="popup-background">
					<h1 className="tc">RemoveBooking</h1>
					
					<button className="fl ml2 mb2 cancel-button general-button-style"
							onClick={ () => setRemoveCompany(false) }>Cancel
					</button>
					
					<button className="fr mr2 mb2 bg-red general-button-style"
							onClick={ () => sendToApi() }>Remove
					</button>
				</div>
			</div>
		</Popup>
	);
};
