import React, { Component } from 'react';
import { getProductList, getProductListFiltered } from '../../redux/actions/order';
import { connect } from 'react-redux';
import { HeaderBar } from '../../components/common/header';
import { ProductDet } from '../../components/product_details/product';
import {
	Header, Grid, Container, Menu, Segment, Sticky, Sidebar,
	Responsive, Image, Button
} from 'semantic-ui-react';
import { ThemeProvider } from 'styled-components';
import Filter from './Filter';
import Sort from './sort';


class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: props.products,
			totalCount: 0,
			currentPage: 1,
			todosPerPage: 10,
			lastPage: null,
			indexOfLastTodo: null,
			indexOfFirstTodo: null,
			currentTodos: null,
			pageNumbers: [],
			firstIndexCurrentPage: 1,
			lastIndexCurrentPage: 1,
			showDimmer: false,
			showFilter: false,
			filters1: props.filterList,
			filtersApplied: '',
			discountApplied: '',
			filterParameter: '',
			showSort:false

		}
		this.filter = React.createRef();
	}

	componentDidMount() {
		this.props.getProductList();

	}

	componentWillReceiveProps(nextProps) {
		console.log('here' + this.props.FETCH_PRODUCT_LIST_FILTERED_STATUS);
		if (this.props.FETCH_PRODUCT_LIST_FILTERED_STATUS != 'SUCCESS' && nextProps.FETCH_PRODUCT_LIST_FILTERED_STATUS == 'SUCCESS') {
			console.log('got new props');
			this.setState({
				todos: nextProps.products,
			});
		}
	}

	shouldComponentUpdate() {
		return true;
	}
	handleClose=()=>{
		this.setState({showFilter:false,
			showSort:false});
	}
	openFilter() {

		console.log('openFilter');
		this.filter.show();
	}

	openSort() {
		console.log('openFilter');
	}
	discApplied = (sortApp) => {
		if (sortApp != '' && sortApp != undefined) {
			var parameters = '';
			parameters = parameters + '&sort=' + sortApp;
			this.setState({ discountApplied: parameters });
			if (this.state.filtersApplied != '' && this.state.filtersApplied != undefined)
				parameters = parameters + this.state.filtersApplied;
			console.log('para' + parameters);

		}
		this.props.getProductListFiltered(parameters);
	}
	filterApplied = (filtersApplied) => {
		if (filtersApplied != '' && filtersApplied != undefined) {
			var filters = filtersApplied.split(',');
			var parameters = '';
			for (let i = 0; i < filters.length - 1; i++) {
				parameters = parameters + '&' + filters[i];
			}
			this.setState({ filterParameter: parameters });
			if (this.state.discountApplied != undefined && this.state.discountApplied != '')
				parameters = parameters + '&' + this.state.discountApplied;
			this.props.getProductListFiltered(parameters);

		}
		console.log('paar' + parameters);



	}
	handleClick(type) {
		let { currentPage, todos, todosPerPage } = this.state;
		if (todos.length > 0) {
			if (type === 'First') {
				currentPage = 1
			}
			else if (type === 'Next' && currentPage < Math.ceil(todos.length / todosPerPage)) {
				currentPage += 1
			}
			else if (type === 'Prev' && currentPage > 1) {
				currentPage -= 1
			}
			else if (type === 'Last') {
				currentPage = Math.ceil(todos.length / todosPerPage);
			}
			this.setState({
				currentPage: Number(currentPage),
				lastPage: Number(Math.ceil(todos.length / todosPerPage)),
				firstIndexCurrentPage: (currentPage * todosPerPage) - todosPerPage + 1,
			});
		}
	}
	render() {
		let {products, filterList} = this.props;
		let {
			todos,
			currentPage,
			todosPerPage,
			indexOfLastTodo,
			indexOfFirstTodo,
			currentTodos,
			firstIndexCurrentPage,
			lastIndexCurrentPage,
			filters1,
			filtersApplied,
			discountApplied
		} = this.state;
		indexOfLastTodo = currentPage * todosPerPage;
		indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
		console.log('Filters:' + filters1);
		return (
			<React.Fragment>

				{/* <div className="container" style={{paddingTop: '6rem'}} >
                <div className="row">
                    <HeaderBar/>
                    <div className="row">   
                        <ProductDet/>

                    </div>
                </div>
            </div>*/}
				<HeaderBar len={todos.length} />
				<Grid >
					<Grid.Row>
						<Grid.Column align='right' width='50%'>
							<Button onClick={this.openSort}onClick={() => { this.setState({ showSort: true }) } }>Sort</Button>
						</Grid.Column>
						<Grid.Column align='left' width='50%'>
							<Button style={{ bg: '#ffffff' }} onClick={() => { this.setState({ showFilter: true }) } }>Filter</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>

				<Grid>
					<Grid.Row style={{ paddingBottom: 0, paddingLeft: 0, paddingTop: 50 }}>
						<Grid.Column width='8' style={{ paddingLeft: 0 }}>
							<label>Displaying {(todos.length === 0) && (0)}{(todos.length > 0) && (firstIndexCurrentPage)}-{(firstIndexCurrentPage - 1) + currentTodos.length} / {todos.length}</label>
						</Grid.Column>
						<Grid.Column width='8' textAlign='right' style={{ paddingRight: 0 }}>
							<label onClick={() => this.handleClick('First')} style={{ padding: 3 }} className='pointer'>First</label>
							<label onClick={() => this.handleClick('Prev')} style={{ padding: 3 }} className='pointer'>Prev</label>
							<label onClick={() => this.handleClick('Next')} style={{ padding: 3 }} className='pointer'>Next</label>
							<label onClick={() => this.handleClick('Last')} style={{ padding: 3 }} className='pointer'>Last</label>
							<label onClick={() => this.handleClick('Last')} >({(todos.length === 0) && (0)} {(todos.length > 0) && (currentPage)} of {Math.ceil(todos.length / todosPerPage)})</label>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						{currentTodos != null && currentTodos != undefined && currentTodos.map((line, key) => {
							return (
								<ProductDet key={key} line={line} />
							)
						})}
					</Grid.Row>

				</Grid>
				{<Filter closeModal={() => this.handleClose()} showFilter={this.state.showFilter} filterPaased={this.state.filters1} onApply={(filtersApplied) => this.filterApplied(filtersApplied)} />
				}
				{<Sort closeModal={() => this.handleClose()} showFilter={this.state.showSort} filterPaased={this.state.filters1} applyDisc={(discountApplied) => this.discApplied(discountApplied)} />
				}
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = {
	getProductList,
	getProductListFiltered
}
const mapStateToProps = (state) => {
	return {
		productList: state.order.data.productList,
		products: state.order.data.productList.data.products,
		totalCount: state.order.data.productList.data.totalCount,
		filterList: state.order.data.productList.data.aggregations,
		FETCH_PRODUCT_LIST_FILTERED_STATUS: state.order.meta.FETCH_PRODUCT_LIST_FILTERED_STATUS
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
