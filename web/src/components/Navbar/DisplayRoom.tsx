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
						{
							ROOM_NAMES_LIST?.map((ds, i) => {
								return (
									<div key={ i } className="display-room-container-item"
										 onClick={ () => roomName(i) }>
										<h1>{ ROOM_NAMES_LIST[i] }</h1>
									</div>
								);
							})
						}
					</div>
				</div>
			</Popup>
		</>
	);
};
