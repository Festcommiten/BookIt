import React, { useContext, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import BookItService from '../../utils/api/service/BookItService';
import { RoomContext } from '../../utils/global/provider/GlobalProvider';
import './DisplayRoom.css';

export const DisplayRoom = () => {
	const [room, setRoom] = useContext(RoomContext);
	const [rooms, setRooms] = useState([]);
	const [open, setOpen] = useState(false);
	const closeModal = () => setOpen(false);
	
	useEffect(() => {
		BookItService.getRooms()
			.then(response => {
				setRooms(response.data.rooms)
			})
			.catch(error => console.log(error));
	}, []);
	
	function roomName(index: number) {
		setRoom(rooms[index]);
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
							rooms?.map((ds, i) => {
								return (
									<div key={ i } className="display-room-container-item"
										 onClick={ () => roomName(i) }>
										<h1>{ rooms[i] }</h1>
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
