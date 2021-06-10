import React, { useContext } from 'react';
import Popup from 'reactjs-popup';
import BookItService from '../../../utils/api/service/BookItService';
import { ChosenDataSlotContext } from '../../../utils/global/provider/GlobalProvider';
import { RemoveBookingContext } from '../../../utils/global/provider/RemoveBookingProvider';
import './RemoveBooking.css';

export default function RemoveBooking(props: { loading?: any, setLoading?: any }) {
	const [chosenDataSlot, setChosenDataSlot] = useContext(ChosenDataSlotContext);
	const [removeCompany, setRemoveCompany] = useContext(RemoveBookingContext);
	const closeModalRemoveBooking = () => setRemoveCompany(false);
	
	function sendToApi() {
		props.setLoading(true);
		BookItService.removeBooking(chosenDataSlot)
			.then(response => {
				props.setLoading(false);
			})
			.catch(error => console.log(error));
		setRemoveCompany(false);
		setChosenDataSlot(0);
	}
	
	return (
		<Popup open={ removeCompany } closeOnDocumentClick onClose={ closeModalRemoveBooking }>
			<div className="modal">
				<div className="popup-background">
					<h1 className="tc">RemoveBooking</h1>
					
					<button className="fl ml5 mb4 cancel-button general-button-style"
							onClick={ () => setRemoveCompany(false) }>Cancel
					</button>
					
					<button className="fr mr5 mb4 bg-red general-button-style"
							onClick={ () => sendToApi() }>Remove
					</button>
				</div>
			</div>
		</Popup>
	);
};
