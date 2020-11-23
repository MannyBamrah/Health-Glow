import React, { Component } from "react";
import { Modal, Header, Segment, Icon, Grid, Message, Menu, Checkbox, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: undefined,
            filtersReceived: {},
            filterApplied: '',
            activeCategory: '',
            openIt: false

        }
        console.log('openIt' + this.props.showFilter)
    }
    closeIt = () =>{
        this.props.closeModal();
    }
    applyDiscount = (disc) => {
        console.log('sorting:' + disc);
        this.setState({ openIt: false });

        this.props.applyDisc(disc);
        this.props.closeModal();
    }
    render() {
        return (
            <Modal centered={true}
                open={this.props.showFilter}
                onClose={() => { this.props.closeModal} }
                closeOnEscape={true} style={{ marginTop: 0 }}>
                <Modal.Content>
                    <Segment>
                        <Grid.Row style={{
                            border: '1px solid #D3D3D3',
                            justifyContent: 'space-between',
                            background: '#ffffff',
                            textAlign: 'center'
                        }} onClick={() => { this.applyDiscount('popularity:asc') } }>
                            Popularity
                    </Grid.Row >
                        <Grid.Row style={{
                            border: '1px solid #D3D3D3',
                            justifyContent: 'space-between',
                            background: '#ffffff',
                            textAlign: 'center'
                        }} onClick={() => { this.applyDiscount('discount:desc') } }>
                            Discount
                    </Grid.Row>
                        <Grid.Row style={{
                            border: '1px solid #D3D3D3',
                            justifyContent: 'space-between',
                            background: '#ffffff',
                            textAlign: 'center'
                        }} onClick={() => { this.applyDiscount('price:desc') } }>
                            High-Low
                    </Grid.Row>
                        <Grid.Row style={{
                            border: '1px solid #D3D3D3',
                            justifyContent: 'space-between',
                            background: '#ffffff',
                            textAlign: 'center'
                        }} onClick={() => { this.applyDiscount('price:asc') } }>
                            Low-High
                    </Grid.Row>
                    </Segment>
                </Modal.Content>
                <Modal.Actions style={{ justifyContent: 'center', background: '#D3D3D3', textAlign: 'center' }}>
                    <Button style={{ background: '#D3D3D3' }} onClick={()=>{this.closeIt()}}> Close</Button>
                </Modal.Actions>
            </Modal>
        )
            ;
    }
}
export default Sort;