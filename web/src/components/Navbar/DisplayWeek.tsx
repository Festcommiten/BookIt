import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RoutingPath from '../../routes/RoutingPath';
import { WeekContext } from '../../utils/global/provider/GlobalProvider';

export const DisplayWeek = () => {
	const [week, setWeek] = useContext(WeekContext);
	return (
		<h1 className="tc mt0 mb0">v.{ week }</h1>
	)
}
