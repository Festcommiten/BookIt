import React, { useContext } from 'react';
import { RoomContext } from '../../utils/global/provider/GlobalProvider';

export const DisplayRoom = () => {
	const [room, setRoom] = useContext(RoomContext);
	return (
		<h1 className="tr mt0 mb0">{ room }</h1>
	);
};
