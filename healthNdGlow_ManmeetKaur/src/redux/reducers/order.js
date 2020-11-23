import { combineReducers } from 'redux';
import {
	FETCH_PRODUCT_LIST_PENDING,FETCH_PRODUCT_LIST_FULFILLED,FETCH_PRODUCT_LIST_REJECTED,
	FETCH_PRODUCT_LIST_FILTERED_PENDING,FETCH_PRODUCT_LIST_FILTERED_FULFILLED,FETCH_PRODUCT_LIST_FILTERED_REJECTED
	}  
	from '../action-types/order';

const initialMetaState = {
	FETCH_PRODUCT_LIST_STATUS:'DEFAULT',
	FETCH_PRODUCT_LIST_FILTERED_STATUS:'DEFAULT'

}



const initialDataState = {
	
	productList:{
		message:'',
		data:{
			totalCount:'',
			products:[],
			title:'',
			searchQuery:'',
			landingImage:'',
			campaign:'',
			aggregations:[],
			sorts:[]
		}
	}
}


function metaReducer(state = initialMetaState, action) {
	switch (action.type) {
		case FETCH_PRODUCT_LIST_PENDING:
				return{ ...state, FETCH_PRODUCT_LIST_STATUS:'PENDING'}
		case FETCH_PRODUCT_LIST_FULFILLED:
				return{ ...state, FETCH_PRODUCT_LIST_STATUS:'SUCCESS'}
		case FETCH_PRODUCT_LIST_REJECTED:
				return{ ...state, FETCH_PRODUCT_LIST_STATUS:'FAILED'}
		case FETCH_PRODUCT_LIST_FILTERED_PENDING:
				return{ ...state, FETCH_PRODUCT_LIST_FILTERED_STATUS:'PENDING'}
		case FETCH_PRODUCT_LIST_FILTERED_FULFILLED:
				return{ ...state, FETCH_PRODUCT_LIST_FILTERED_STATUS:'SUCCESS'}
		case FETCH_PRODUCT_LIST_FILTERED_REJECTED:
				return{ ...state, FETCH_PRODUCT_LIST_FILTERED_STATUS:'FAILED'}
		
		
		default:
			return state;
	}
}

function dataReducer(state=initialDataState, action){
	let res={};
	switch (action.type) {
		
		case FETCH_PRODUCT_LIST_FULFILLED:
		console.log("productList:"+action.payload.data);
			return{...state,
						productList: action.payload.data}
		case FETCH_PRODUCT_LIST_FILTERED_FULFILLED:
				console.log("productListFiltered:"+action.payload.data);
			return{...state,
						productList: action.payload.data,
					todos:action.payload.data.products}

		default:
			return state;
	}
}

export default combineReducers({
	meta: metaReducer,
	data: dataReducer
});
