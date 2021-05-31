import React, { useContext } from 'react';
import { WeekContext } from '../../utils/global/provider/WeekProvider';

export const DisplayWeek = () => {
	const [week, setWeek] = useContext(WeekContext);
	return (
		<h1 className="tc mt0 mb0">v.{ week }</h1>
	)
}
