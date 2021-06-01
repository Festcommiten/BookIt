import React, { useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import { PopUpContext } from '../../utils/global/provider/PopUpProvider';

export const ControlledPopup = () => {
	const [popup, setPopup] = useContext(PopUpContext);
	const [open, setOpen] = useState(false);
	const closeModal = () => setPopup(false);
	return (
		<div>
			<Popup open={popup} closeOnDocumentClick onClose={closeModal}>
				<div className="modal">
					<a className="close" onClick={closeModal}>
						&times;
					</a>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
					omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
					ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
					doloribus. Odit, aut.
				</div>
			</Popup>
		</div>
	);
};
