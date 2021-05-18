import React from 'react';
import './Footer.css'
import logo from'../utils/images/Codic-logo.b73b7b04.svg'

export default function Footer() {
	return (
		<footer className='pa3'>
			<img src={logo} alt="Codic Education logo" className='fl'/>
			<h2 className='fr mt2'>FestCommitén</h2>
		</footer>
	)
}
