import axios from 'axios';


const PRODUCT_LIST_URL='https://staging.healthandglow.com/api/catalog/product/v6/search/999?app=web&version=3.0.2&tag=loreal-paris&page=0:20';
const PRODUCT_LIST_FILTERED_URL=(parameters)=>`${PRODUCT_LIST_URL}${parameters}`;


// actions

const _getProductList = ()=>{
	return axios.get(PRODUCT_LIST_URL);
}

const _getProductListFiltered=(parameters)=>{
	return axios.get(PRODUCT_LIST_FILTERED_URL(parameters))
}
// action creators


export const getProductList =() =>{
	console.log("fetching productList");
	return dispatch =>{
		dispatch({
			type:'FETCH_PRODUCT_LIST',
			payload: _getProductList()
		})
	}
}

export const getProductListFiltered =(parameter) =>{
	console.log("fetching productListFiltered");
	return dispatch =>{
		dispatch({
			type:'FETCH_PRODUCT_LIST_FILTERED',
			payload: _getProductListFiltered(parameter)
		})
	}
}
