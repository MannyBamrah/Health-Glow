import React from "react";
import { Route } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import { history } from '../../redux/store/index';
import Home from './home'



const routes = (    
    <Router history={history}>
        <React.Fragment>
            <Route path="/home/loreal" component={Home}/>
        </React.Fragment>
    </Router>
)

export default routes;
