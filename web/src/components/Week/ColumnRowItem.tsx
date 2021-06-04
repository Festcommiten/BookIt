import React, { useContext } from 'react';
import './ColumnRowItem.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { NewBooking } from '../../utils/global/handlers/HandleBookings';
import { ChoseCompanyContext } from '../../utils/global/provider/ChoseCompanyProvider';
import { ChosenDataSlotContext } from '../../utils/global/provider/GlobalProvider';
import { RemoveBookingContext } from '../../utils/global/provider/RemoveBookingProvider';
import { BookingInfo, IndividualSlotData, WeekDate } from '../../utils/interface/WeekInterface';

export function RenderTitle(weekDate: WeekDate) {
	
	let {weekday, date} = weekDate;
	
	return (
		<div className="pa2 ma0 item-week-day">
			<p className="primary_text">{ weekday }</p>
			<p className="secondary_text">{ date }</p>
		</div>
	);
}

export const RenderFreeSlotPassed: React.FC<IndividualSlotDataProps> = ({slotData}: IndividualSlotDataProps) => {
	return (
		<div className="pa2 ma0 item-time-passed"></div>
	);
}

export const RenderBookedSlotPassed: React.FC<IndividualSlotDataProps> = ({slotData}: IndividualSlotDataProps) => {
	return (
		<div className="pa2 ma0 item-time-passed">
			<h3 className="item-text-passed-h3">{ slotData.company }</h3>
			<p className="item-text-passed-p">{ slotData.booker }</p>
		</div>
	);
}

export const RenderFreeSlotCurrentTime: React.FC<IndividualSlotDataProps> = ({slotData}: IndividualSlotDataProps) => {
	const [isChosenCompany, setChosenCompany] = useContext(ChoseCompanyContext);
	const [chosenDataSlot, setChosenDataSlot] = useContext(ChosenDataSlotContext);
	return (
		<div onClick={ () => {
			setChosenDataSlot(slotData.id);
			setChosenCompany(!isChosenCompany);
		} }>
			<div className="pa2 ma0 item-time-current grow shadow-1">
				<AddCircleOutlineIcon className="mt2 pt1"/>
			</div>
		</div>
	);
};

export const RenderBookedSlotCurrentTime: React.FC<IndividualSlotDataProps> = ({slotData}: IndividualSlotDataProps) => {
	const [chosenDataSlot, setChosenDataSlot] = useContext(ChosenDataSlotContext);
	const [removeCompany, setRemoveCompany] = useContext(RemoveBookingContext);
	return (
		<div className="pa2 ma0 item-time-current grow shadow-1"
			 onClick={ () => {
				 setChosenDataSlot(slotData.id);
				 setRemoveCompany(!removeCompany);
			 }
			 }>
			<h3 className="primary_text">{ slotData.company }</h3>
			<p className="secondary_text">{ slotData.booker }</p>
		</div>
	);
}

interface IndividualSlotDataProps {
	slotData: IndividualSlotData
}

export const RenderFreeSlotFuture: React.FC<IndividualSlotDataProps> = ({slotData}: IndividualSlotDataProps) => {
	const [isChosenCompany, setChosenCompany] = useContext(ChoseCompanyContext);
	const [chosenDataSlot, setChosenDataSlot] = useContext(ChosenDataSlotContext);
	return (
		<div onClick={ () => {
			setChosenDataSlot(slotData.id);
			setChosenCompany(!isChosenCompany);
		} }>
			<div className="pa2 ma0 item-time-future grow shadow-1">
				<AddCircleOutlineIcon className="mt2 pt1"/>
			</div>
		</div>
	);
};

export const RenderBookedSlotFuture: React.FC<IndividualSlotDataProps> = ({slotData}: IndividualSlotDataProps) => {
	const [chosenDataSlot, setChosenDataSlot] = useContext(ChosenDataSlotContext);
	const [removeCompany, setRemoveCompany] = useContext(RemoveBookingContext);
	return (
		<div className="pa2 ma0 item-red grow shadow-1"
			 onClick={ () => {
				 setChosenDataSlot(slotData.id);
				 setRemoveCompany(!removeCompany);
			 }
			 }>
			<h3 className="primary_text">{ slotData.company }</h3>
			<p className="secondary_text">{ slotData.booker }</p>
		</div>
	);
};
