import React from 'react';
import './Footer.css'
import logo from'../utils/images/Codic-logo.b73b7b04.svg'

export default function Footer() {
	return (
		<footer>
			<img src={logo} alt="Codic Education logo" className='fl ml1 ml3-ns'/>
			<h2 className='fr ml mr3-ns'>FestCommitén</h2>
		</footer>
	)
}
