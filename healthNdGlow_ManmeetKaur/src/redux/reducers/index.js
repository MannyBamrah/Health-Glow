import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import orderReducer from './order';

export default combineReducers({
	router: routerReducer,
	order: orderReducer
});

