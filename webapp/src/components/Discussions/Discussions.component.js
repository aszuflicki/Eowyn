import React, { Component, Fragment } from 'react';
import Navbar from '../Navbar.component'
import { CardPanel, Row, Col, Card, CardTitle, Button, Autocomplete, Tabs, Tab, Badge, Icon } from 'react-materialize'
import history from '../../routers/history';

class Discussions extends Component {

    render() {

        return (
            <Fragment>
                <Navbar />

                <Row />
                <Row />

                <div className="container">
                    <Row>
                        <Col s={3} style={{ paddingRight: "15px" }}>
                            <Row />
                            <a class="btn"
                                onClick={() => history.push('/discussions/new')}
                            >New discussion</a>
                            <Row />
                            <Row />
                            <Row> <Col>Tags</Col></Row>
                            <Row>

                                <Col><span class="new badge tag-menu" data-badge-caption="General Discussion"></span>       </Col>
                                <Col><span class="new badge tag-menu" data-badge-caption="Stocks / Bonds"></span>       </Col>
                                <Col><span class="new badge tag-menu" data-badge-caption="Investment Ideas"></span></Col>
                                <Col><span class="new badge tag-menu" data-badge-caption="Cryptocurrencies"></span>       </Col>



                                <Col><span class="new badge tag-menu" data-badge-caption="Commodities"></span>       </Col>

                                <Col><span class="new badge tag-menu" data-badge-caption="Short / CFDs"></span>       </Col>
                            </Row>


                        </Col>
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
                    </Row>


                </div>

            </Fragment>
        )
    }
}

export default Discussions