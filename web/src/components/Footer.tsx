import moment from 'moment';
import React from 'react';
import './Footer.css';
import logo from '../utils/images/Codic-logo.b73b7b04.svg';

export default function Footer() {
	
	let week_number = moment().week() - 1;
	
	return (
		<footer className="pa3 grid-footer">
			<div>
				<img src={ logo } alt="Codic Education logo"/>
			</div>
			<div>
				<h1 className=" ma0 tc">v.{ week_number }</h1>
			</div>
			<div className="tr">
				<h2 className="mt2">FestCommitén</h2>
			</div>
		</footer>
	);
}
