import React, { useContext, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import BookItService from '../../utils/api/service/BookItService';
import './BookingHandling.css';
import { ChoseCompanyContext } from '../../utils/global/provider/ChoseCompanyProvider';
import { ChosenDataSlotContext } from '../../utils/global/provider/GlobalProvider';
import { CompanyWithItsUsers, User } from '../../utils/interface/CompaniesAndUsers';

export const BookingHandling = () => {
	const [data, setData] = useState<Array<User> | undefined>(undefined);
	let companies: Array<string> = [];
	let allCompaniesWithItsUsers: Array<CompanyWithItsUsers> = [];
	
	const [indexOfBookingCompany, setIndexOfBookingCompany] = useState<number>(0);
	const [bookingCompany, setBookingCompany] = useState<string>('');
	const [bookingUser, setBookingUser] = useState<string>('');
	
	const [chosenDataSlot, setChosenDataSlot] = useContext(ChosenDataSlotContext);
	const [isChosenCompany, setIsChosenCompany] = useContext(ChoseCompanyContext);
	const closeModalCompany = () => setIsChosenCompany(false);
	const [isChosenUser, setChosenUser] = useState<boolean>(false);
	const closeModalUser = () => setChosenUser(false);
	
	const fetchDataFromApi = () => {
		BookItService.getCompaniesAndUsers()
			.then(response => {
				setData(response.data.users);
			})
			.catch(error => console.log(error));
	};
	
	function generateCompanies() {
		if (data) {
			for (let i = 0; i < data.length; i++) {
				if (companies.indexOf(data[i].company) === -1) {
					companies.push(data[i].company);
				}
			}
		}
		companies.sort();
	}
	
	function generateUsers() {
		if (data) {
			for (let i = 0; i < companies.length; i++) {
				let users: Array<string> = [];
				for (let j = 0; j < data.length; j++) {
					if (companies[i] === data[j].company) {
						users.push(data[j].first_name + ' ' + data[j].last_name);
					}
				}
				users.sort();
				
				let companyWithItsUsers: CompanyWithItsUsers = {
					company: companies[i],
					users: users
				};
				allCompaniesWithItsUsers.push(companyWithItsUsers);
			}
		}
		companies.sort();
	}
	
	if (data) {
		generateCompanies();
		generateUsers();
	}
	
	useEffect(() => {
		fetchDataFromApi();
	}, []);
	
	function setChosenCompanyNameIndex(element: string, index: number) {
		setIndexOfBookingCompany(index);
		setBookingCompany(element);
		setIsChosenCompany(false);
		setChosenUser(true);
	}
	
	function setChosenUsername(element: string) {
		setBookingUser(element);
		setChosenUser(false);
		sendToApi(element)
	}
	
	function sendToApi(element: string) {
		console.log('sendToApi:')
		console.log('chosenDataSlot', chosenDataSlot)
		console.log('bookingCompany: ', bookingCompany);
		console.log('bookingUser: ', element);
		BookItService.newBooking(Number(chosenDataSlot), bookingCompany, element)
			.then(response => {
				console.log('response', response)
			})
			.catch(error => console.log(error));
		// newBooking(chosenDataSlot, bookingCompany, element)
	}
	
	return (
		<>
			<Popup open={ isChosenCompany } closeOnDocumentClick onClose={ closeModalCompany }>
				<div className="modal">
					<div className="booking-handling-container-companies">
						{
							companies?.map((element, i) => {
								return (
									<div className="booking-handling-container-item tc"
										 key={ i }
										 onMouseDown={ () => setChosenCompanyNameIndex(element, i) }>
										<h2>{ companies[i] }</h2>
									</div>
								);
							})
						}
					</div>
				</div>
			</Popup>
			<Popup open={ isChosenUser } closeOnDocumentClick onClose={ closeModalUser }>
				<div className="modal">
					<div className="booking-handling-container-companies">
						{
							allCompaniesWithItsUsers[indexOfBookingCompany]?.users.map((element, i) => {
								return (
									<div className="booking-handling-container-item tc"
										 key={ i }
										 onClick={ () => setChosenUsername(element) }>
										<h2>{ allCompaniesWithItsUsers[indexOfBookingCompany].users[i] }</h2>
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
