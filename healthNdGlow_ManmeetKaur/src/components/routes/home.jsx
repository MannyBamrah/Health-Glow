import React from "react";
import { Route } from 'react-router-dom';
import HomePage from '../../pages/home/homePage';


const Home = ({...props}) => {
	return (
		 <React.Fragment>
	            <Route component={HomePage} />
    	 </React.Fragment>
	)
}

export default Home;


