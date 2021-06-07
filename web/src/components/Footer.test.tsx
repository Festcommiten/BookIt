import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('render FestCommitén in Footer', () => {
	render(<Footer/>);
	const footerElement = screen.getByText(/FestCommitén/i);
	expect(footerElement).toBeInTheDocument();
	expect(footerElement).toHaveClass('mt2');
});

test('render logo in Footer', () => {
	render(<Footer/>);
	const footerElement = screen.getByAltText(/Codic Education logo/i);
	expect(footerElement).toBeInTheDocument();
});
