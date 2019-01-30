import React, { Component, Fragment } from 'react';
import Navbar from '../Navbar.component'
import { CardPanel, Row, Col, Card, CardTitle, Button, Autocomplete, Tabs, Tab, Badge, Icon } from 'react-materialize'
import history from '../../routers/history';
import { connect } from 'react-redux';

import { getDisscussion } from '../../actions/Discussions.actions'

class Discussion extends Component {

    componentDidMount = () => {
        const id = window.location.href.split('/')[4]
        this.props.getDisscussion(id)
    }


    render() {

        return (
            <Fragment>
                <Navbar />

                <Row />
                <Row />

                <div className="container">
                    <Row>
                        <Col s={9}>
                            <ul class="collection">
                                <li class="collection-item avatar">
                                    <img src="images/yuna.jpg" alt="" class="circle" />
                                    <span class="title">Title</span>
                                    <p>First Line <br />
                                        Second Line
                                    </p>

                                    <a href="#!" class="secondary-content">

                                        <Row>
                                            <Col> <span class="new badge" data-badge-caption="Investment"></span>
                                            </Col>
                                            <Col><Badge> <Icon tiny >chat_bubble_outline</Icon>4</Badge>
                                            </Col>
                                        </Row>

                                    </a>
                                </li>

                            </ul>
                        </Col>
                        <Col s={3} style={{ paddingRight: "15px" }}>
                            <Row />
                            <a class="btn"
                                onClick={() => history.push('/discussions/new')}
                            >xD</a>
                        </Col>
                    </Row>


                </div>

            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.discussion,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDisscussion: (...args) => dispatch(getDisscussion(...args)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Discussion);