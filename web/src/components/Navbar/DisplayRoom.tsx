import React, { useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import { RoomContext } from '../../utils/global/provider/GlobalProvider';
import './DisplayRoom.css';

export const DisplayRoom = () => {
	const [room, setRoom] = useContext(RoomContext);
	const [open, setOpen] = useState(false);
	const closeModal = () => setOpen(false);
	const ROOM_NAMES_LIST = ['Ada', 'Douglas', 'Katniss', 'Kakashi', 'Obito', 'Rust'];
	
	function roomName(index: number) {
		setRoom(ROOM_NAMES_LIST[index]);
		setOpen(false);
	}
	
	return (
		<>
			<h1 className="tr mt0 mb0"
				onClick={ () => setOpen(o => !o) }>
				{ room }
			</h1>
			<Popup open={ open } closeOnDocumentClick onClose={ closeModal }>
				<div className="modal">
					<div className="display-room-container">
						<div className="display-room-container-item"
							 onClick={ () => roomName(0) }>
							<h1>{ ROOM_NAMES_LIST[0] }</h1>
						</div>
						<div className="display-room-container-item"
							 onClick={ () => roomName(1) }>
							<h1>{ ROOM_NAMES_LIST[1] }</h1>
						</div>
						<div className="display-room-container-item"
							 onClick={ () => roomName(2) }>
							<h1>{ ROOM_NAMES_LIST[2] }</h1>
						</div>
						<div className="display-room-container-item"
							 onClick={ () => roomName(3) }>
							<h1>{ ROOM_NAMES_LIST[3] }</h1>
						</div>
						<div className="display-room-container-item"
							 onClick={ () => roomName(4) }>
							<h1>{ ROOM_NAMES_LIST[4] }</h1>
						</div>
						<div className="display-room-container-item"
							 onClick={ () => roomName(5) }>
							<h1>{ ROOM_NAMES_LIST[5] }</h1>
						</div>
					</div>
				</div>
			</Popup>
		
		</>
	);
};
