import React, { Component, Fragment } from 'react';
import Navbar from '../Navbar.component'
import { CardPanel, Row, Col, Card, CardTitle, Button, Autocomplete, Tabs, Tab, Badge, Icon } from 'react-materialize'
import history from '../../routers/history';
import { connect } from 'react-redux';
import { getDiscussionsList } from '../../actions/Discussions.actions'
import Badges from './Fragments/Badges.component'

class Discussions extends Component {

    componentDidMount = () => {
        this.props.getDiscussionsList('')
    }

    render() {

        return (
            <Fragment>
                <Row />
                <Row />

                <div className="container">
                    <Row>
                        <Col s={2} >
                            <div style={{ marginTop: '7.5px', marginRight: "25px" }}>
                                <a class="btn"
                                    onClick={() => history.push('/discussions/new')}
                                >New discussion</a>
                            </div>

                            <Row />
                            <Row />
                            <Row><div style={{ paddingLeft: "11.25px" }}><a
                                onClick={() => this.props.getDiscussionsList('')}
                            >All discussions</a> </div> </Row>
                            <Row> <div style={{ paddingLeft: "11.25px" }}>Categories</div></Row>
                            <Row>

                                <Col s={12}><span class="new badge tag-menu left"
                                    onClick={() => this.props.getDiscussionsList(0)} data-badge-caption="General Discussion"></span>       </Col>
                                <Col s={12}><span class="new badge tag-menu  left"
                                    onClick={() => this.props.getDiscussionsList(1)} data-badge-caption="Stocks / Bonds"></span>       </Col>
                                <Col s={12}><span class="new badge tag-menu left"
                                    onClick={() => this.props.getDiscussionsList(2)} data-badge-caption="Investment Ideas"></span></Col>
                                <Col s={12}><span class="new badge tag-menu left"
                                    onClick={() => this.props.getDiscussionsList(3)} data-badge-caption="Cryptocurrencies"></span>       </Col>
                                <Col s={12}><span class="new badge tag-menu left"
                                    onClick={() => this.props.getDiscussionsList(4)} data-badge-caption="Commodities"></span>       </Col>
                                <Col s={12}><span class="new badge tag-menu left"
                                    onClick={() => this.props.getDiscussionsList(5)} data-badge-caption="Short / CFDs"></span>       </Col>
                            </Row>

                        </Col>
                        <Col />
                        <Col s={8}>
                            <ul class="collection">
                                {!!this.props.list ?
                                    this.props.list.map(el => (
                                        <li class="collection-item avatar"
                                            onClick={() => history.push(`/discussion/${el.id}`)}>
                                            <img src={`http://localhost:8081/profile/pic/${el.author}`} alt="" class="circle" />
                                            <span class="title">{el.topic}</span>
                                            <p> </p>

                                            <a href="#!" class="secondary-content">

                                                <Row>
                                                    <Col> <Badges badge={el.category} />
                                                    </Col>
                                                    <Col><Badge> <Icon tiny >chat_bubble_outline</Icon>4</Badge>
                                                    </Col>
                                                </Row>
                                            </a>
                                        </li>)) : ''}
                            </ul>
                        </Col>
                    </Row>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.discussion)
    return {
        ...state.discussion,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDiscussionsList: (...args) => dispatch(getDiscussionsList(...args)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Discussions);