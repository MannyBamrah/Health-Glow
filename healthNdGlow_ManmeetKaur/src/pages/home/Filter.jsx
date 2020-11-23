import React, { Component } from "react";
import { Modal, Header, Segment, Icon, Grid, Message, Menu, Checkbox, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: undefined,
            filtersReceived: {},
            filterApplied: '',
            activeCategory: '',
            openIt: this.props.showFilter

        }
        console.log('openIt' + this.props.showFilter)
    }


    componentDidMount() {
        this.setState({ filtersReceived: this.props.filterPaased });
        console.log('filter list received:' + this.props.filterPaased);
        console.log('openIt' + this.props.showFilter)

    }

    activeItemCheck(key, name) {
        console.log('activeItem' + key);
        console.log('activeCategory' + name);
        this.setState({
            activeItem: key,
            activeCategory: name
        })
    }
    filterAdded = (selection) => {
        let filter = this.state.filterApplied;
        let activeCategory = this.state.activeCategory;
        var filterAdded = filter + activeCategory + '=' + selection + ',';
        console.log('filter:' + filterAdded);

        this.setState({ filterApplied: filterAdded });
    }


    checked(activeItem, key, isSelected) {
        let flterApplied = this.state.filterApplied;
        let filter = this.state.filtersReceived;
        var c = false;
        if (isSelected)
            c = true;
        else {
            var filterTobeChecked = filter[activeItem].name + ':' + filter[activeItem].buckets[key].key + ',';
            if (flterApplied != undefined && flterApplied != '' && flterApplied.contains(filterTobeChecked))
                c = true;
        }
        return c;

    }

    show() {
        console.log('inside Filters');
        this.setState({ openIt: true })
    }

    applyFilter = () => {
        console.log('filter applied:' + this.state.filterApplied);
        this.setState({ openIt: false });
        this.props.onApply(this.state.filterApplied);
        this.props.closeModal();

    }
    render() {
        const { activeItem, filtersReceived} = this.state
        console.log('FiltersLength:' + { filtersReceived })
        console.log('activeItem no:' + activeItem)
        console.log('showFilter:'+this.props.showFilter)
        //console.log('bucket:'+this.props.filterPaased[0].buckets[0].text)
        return (

            <Modal
                centered={true}
                open={this.props.showFilter}
                onClose={() => { this.props.closeModal} }
                closeOnEscape={true} style={{ marginTop: 0 }}
                >
                <Modal.Header style={{ justifyContent: 'center', background: '#FFA500', textAlign: 'center' }}>
                    Filter
     </Modal.Header>
                <Modal.Content>
                    <div class="scrolling content">
                        <Grid>
                            <Grid.Column width={3} /*style={{border:'2px solid #293895'}}*/>
                                {this.props.filterPaased.map((line, key) => {
                                    let categoryName = line.text.toLowerCase().replace(" ", "-");
                                    return (

                                        <Grid.Row style={{
                                            border: '1px solid #D3D3D3',
                                            justifyContent: 'space-between',
                                            background: '#ffffff',
                                            textAlign: 'center'
                                        }} onClick={() => this.activeItemCheck(key, categoryName)}>
                                            {line.text}
                                        </Grid.Row>

                                    );
                                })}
                            </Grid.Column>
                            <Grid.Column width={11} style={{/*border:'2px solid #293895', */maxHeight: 400 }}>

                                {activeItem != undefined && this.state.filtersReceived[activeItem] != undefined && this.state.filtersReceived[activeItem].buckets.map((line, key) => {
                                    let name = line.text.toLowerCase().replace(" ", "-");
                                    return (

                                        <Grid.Row onClick={() => this.filterAdded(name)}>
                                            <input type="checkbox" value={line.isSelected} id={line.text} />
                                            <label style={{ fontSize: 13 }}>{line.text}</label>
                                        </Grid.Row>

                                    );
                                })}

                            </Grid.Column>
                        </Grid>
                    </div>
                </Modal.Content>
                <Modal.Actions style={{ justifyContent: 'center', background: '#FFA500', textAlign: 'center' }} >
                    <Button style={{ background: '#FFA500' }} onClick={this.applyFilter}> Apply </Button>
                </Modal.Actions >
            </Modal>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        productList: state.order.data.productList,
        products: state.order.data.productList.data.products,
        totalCount: state.order.data.productList.data.totalCount,
        filterList: state.order.data.productList.data.aggregations
    }
}
export default connect(mapStateToProps, null)(Filter)
