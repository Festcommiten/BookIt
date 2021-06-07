import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React, { useContext } from 'react';
import { ChoseCompanyContext } from '../../utils/global/provider/ChoseCompanyProvider';
import { ChosenDataSlotContext, DataSlotHeightContext } from '../../utils/global/provider/GlobalProvider';
import { RemoveBookingContext } from '../../utils/global/provider/RemoveBookingProvider';
import useWindowDimensions from '../../utils/global/provider/WindowDimensionsProvider';
import { BookingInfo, IndividualSlotData, WeekDate } from '../../utils/interface/WeekInterface';
import './ColumnRowItem.css';

export function RenderTitle(weekDate: WeekDate) {
	let {weekday, date} = weekDate;
	return (
		<div className="pa2 ma0 item-week-day">
			<p className="primary_text">{ weekday }</p>
			<p className="secondary_text">{ date }</p>
		</div>
	);
}

function CompanyAndBooker(data: BookingInfo) {
	const [height, setHeight] = useContext(DataSlotHeightContext);
	console.log('height: ', height);
	if (height < 50) {
		return (
			<>
				<h3 className="primary_text pt2 ma1">{ data.company }</h3>
			</>
		);
	} else {
		return (
			<>
				<h3 className="primary_text pt3">{ data.company }</h3>
				<p className="secondary_text">{ data.booker }</p>
			</>
		);
	}
}

export const RenderFreeSlotPassed = () => {
	const [height, setHeight] = useContext(DataSlotHeightContext);
	console.log('useWindowDimensions().height: ', useWindowDimensions().height);
	return (
		<div style={ {height: height} }
			 className="item-time-passed">
		
		</div>
	);
};

export const RenderBookedSlotPassed: React.FC<IndividualSlotDataProps> = ({slotData}: IndividualSlotDataProps) => {
		const [height, setHeight] = useContext(DataSlotHeightContext);
		return (
			<div style={ {height: height} }
				 className="item-time-passed">
				<CompanyAndBooker company={ slotData.company } booker={ slotData.booker }/>
			</div>
		);
	}
;

export const RenderFreeSlotCurrentTime: React.FC<IndividualSlotDataProps> = ({slotData}: IndividualSlotDataProps) => {
	const [isChosenCompany, setChosenCompany] = useContext(ChoseCompanyContext);
	const [chosenDataSlot, setChosenDataSlot] = useContext(ChosenDataSlotContext);
	const [height, setHeight] = useContext(DataSlotHeightContext);
	
	if (height < 50) {
		return (
			<div onClick={ () => {
				setChosenDataSlot(slotData.id);
				setChosenCompany(!isChosenCompany);
			} }>
				<div style={ {height: height} }
					 className="item-time-current grow shadow-1">
					<AddCircleOutlineIcon className="pt2 mt1"/>
				</div>
			</div>
		);
	} else {
		return (
			<div onClick={ () => {
				setChosenDataSlot(slotData.id);
				setChosenCompany(!isChosenCompany);
			} }>
				<div style={ {height: height} }
					 className="item-time-current grow shadow-1">
					<AddCircleOutlineIcon fontSize="large" className="pt3 mt1"/>
				</div>
			</div>
		);
	}
	
};

export const RenderBookedSlotCurrentTime: React.FC<IndividualSlotDataProps> = ({slotData}: IndividualSlotDataProps) => {
	const [chosenDataSlot, setChosenDataSlot] = useContext(ChosenDataSlotContext);
	const [removeCompany, setRemoveCompany] = useContext(RemoveBookingContext);
	const [height, setHeight] = useContext(DataSlotHeightContext);
	return (
		<div style={ {height: height} }
			 className="item-time-current grow shadow-1"
			 onClick={ () => {
				 setChosenDataSlot(slotData.id);
				 setRemoveCompany(!removeCompany);
			 }
			 }>
			<CompanyAndBooker company={ slotData.company } booker={ slotData.booker }/>
		</div>
	);
};

interface IndividualSlotDataProps {
	slotData: IndividualSlotData
}

export const RenderFreeSlotFuture: React.FC<IndividualSlotDataProps> = ({slotData}: IndividualSlotDataProps) => {
	const [isChosenCompany, setChosenCompany] = useContext(ChoseCompanyContext);
	const [chosenDataSlot, setChosenDataSlot] = useContext(ChosenDataSlotContext);
	const [height, setHeight] = useContext(DataSlotHeightContext);
	
	if (height < 50) {
		return (
			<div onClick={ () => {
				setChosenDataSlot(slotData.id);
				setChosenCompany(!isChosenCompany);
			} }>
				<div style={ {height: height} }
					 className="item-time-future-free grow shadow-1">
					<AddCircleOutlineIcon className="pt2 mt1"/>
				</div>
			</div>
		);
	} else {
		return (
			<div onClick={ () => {
				setChosenDataSlot(slotData.id);
				setChosenCompany(!isChosenCompany);
			} }>
				<div style={ {height: height} }
					 className="item-time-future-free grow shadow-1">
					<AddCircleOutlineIcon fontSize="large" className="pt3 mt1"/>
				</div>
			</div>
		);
	}
	
	
};

export const RenderBookedSlotFuture: React.FC<IndividualSlotDataProps> = ({slotData}: IndividualSlotDataProps) => {
	const [chosenDataSlot, setChosenDataSlot] = useContext(ChosenDataSlotContext);
	const [removeCompany, setRemoveCompany] = useContext(RemoveBookingContext);
	const [height, setHeight] = useContext(DataSlotHeightContext);
	return (
		<div style={ {height: height} }
			 className="item-time-future-booked grow shadow-1"
			 onClick={ () => {
				 setChosenDataSlot(slotData.id);
				 setRemoveCompany(!removeCompany);
			 }
			 }>
			<CompanyAndBooker company={ slotData.company } booker={ slotData.booker }/>
		</div>
	);
};
