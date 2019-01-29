import React, { Component, Fragment } from 'react'
import Navbar from '../Navbar.component'
import { connect } from 'react-redux';

import { CardPanel, Row, Col, Card, CardTitle, Button, Autocomplete, Tabs, Tab, Badge, Input } from 'react-materialize'

class NewDiscussion extends Component {
    render() {
        return (
            <Fragment>
                <Navbar />
                <div className="container" style={{ marginTop: "60px" }}>
                    <Row>
                        <Col s={3} />
                        <Col s={6} >
                            <h4>Add new discussion</h4>
                            <h5>Choose tag</h5>
                            <Row s={6}>
                                <a class="btn choose-tag" >General Discussion</a>
                                <a class="btn choose-tag">Stocks / Bonds</a>
                                <a class="btn choose-tag">Investment Ideas</a>
                                <a class="btn choose-tag">Cryptocurrencies</a>
                                <a class="btn choose-tag">Commodities</a>
                                <a class="btn choose-tag">Short / CFDs</a>
                            </Row>
                        </Col>

                    </Row>
                    <Row>
                        <Col s={3} />
                        <Input placeholder="Topic" s={6} label="Discussion title" />
                    </Row>
                    <Row>
                        <Col s={3} />
                        <Input type='textarea' s={6} label="Description" />
                    </Row>
                    <Row>
                        <Col s={6} />

                        <Col s={3}>
                            <a class="btn right indigo darken-3" >Add</a>
                            <a class="btn right indigo lighten-2" >Cancel</a>
                        </Col>

                        <Col s={3} />
                    </Row>
                </div>
            </Fragment>

        )
    }
}
function mapStateToProps(state) {
    return {
        ...state.dashboard,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // toggleAddModal: (isActive) => dispatch(toggleAddModal(isActive)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDiscussion);