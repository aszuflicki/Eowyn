import React, { Component, Fragment } from 'react';
import { CardPanel, Row, Col, Card, CardTitle, Button, Autocomplete, Tabs, Tab, Badge, Icon } from 'react-materialize'
import history from '../../routers/history';
import { connect } from 'react-redux';
import { getDiscussionsList, getMoreOfDiscussionsList } from '../../actions/Discussions.actions'
import Badges from './Fragments/Badges.component'
import ta from 'time-ago'

class Discussions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            category: ''
        };

        // Binds our scroll event handler
        window.onscroll = () => {
            const {
                state: {
                    error,
                    isLoading,
                },
            } = this;

            if (error || isLoading || !this.hasMore) return;

            if (
                window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight
            ) {
                console.log('xD')
                this.props.getMoreOfDiscussionsList(this.state.category, this.props.list.length);
            }
        };
    }

    componentDidMount = () => {
        this.props.getDiscussionsList('')
    }

    hasMore() { return this.props.list.length < this.props.count }

    render() {
        if (!this.props.list) return <div>Loading...</div>

        return (
            <Fragment>
                <Row />
                <Row />

                <div className="container">
                    <Row>
                        <Col s={2} >
                            <div style={{ marginTop: '7.5px', marginRight: "25px" }}>
                                <a className="btn"
                                    onClick={() => history.push('/discussions/new')}
                                >New discussion</a>
                            </div>

                            <Row />
                            <Row />
                            <Row><div style={{ paddingLeft: "11.25px" }}><a
                                onClick={() => { this.props.getDiscussionsList(''); this.setState({ category: '' });history.push('/discussions/followed')  }}
                            >Followed</a> </div> </Row>
                            <Row><div style={{ paddingLeft: "11.25px" }}><a
                                onClick={() => { this.props.getDiscussionsList(''); this.setState({ category: '' });history.push('/discussions/search')  }}
                            >Search</a> </div> </Row>
                            <Row><div style={{ paddingLeft: "11.25px" }}><a
                                onClick={() => { this.props.getDiscussionsList(''); this.setState({ category: '' });history.push('/discussions/') }}
                            >All discussions</a> </div> </Row>
                            

                        </Col>
                        <Col />
                        <Col s={8}>
                            <ul className="collection">
                                {!!this.props.list ?
                                    this.props.list.map(el => (
                                        <li className="collection-item avatar"
                                            onClick={() => history.push(`/discussion/${el.id}`)} key={'post-' + el.createdAt}>
                                            <img src={`/api/profile/pic/${el.author}`} alt="" className="circle" />
                                            <span className="title"><b>{el.topic}</b></span>
                                            <p><span className="truncate"
                                                style={{ width: "calc(100% - 250px)", display: "inline-block" }}>

                                                {el.desc}
                                            </span> </p>
                                            <label>{el.posts === 0? `Created ${ta.ago(el.createdAt)}` : `Updated ${ta.ago(el.updatedAt)}`}</label>

                                            <a href="#!" className="secondary-content">

                                                <Row>
                                                    <Col> <Badges badge={el.category} />
                                                    </Col>
                                                    <Col><Badge> <Icon tiny >chat_bubble_outline</Icon>{el.posts}</Badge>
                                                    </Col>
                                                </Row>
                                            </a>
                                        </li>)) : ''}
                            </ul>
                            {this.props.list.length < this.props.count ?
                                <div>Loading...</div>
                                : ''}
                            {this.props.list.length === this.props.count && this.props.count !== 0 ?
                                <div>You did it! You reached the end!</div>
                                : ''}
                            {this.props.count === 0 ?
                                <div>Empty so far :( </div>
                                : ''}
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
        getMoreOfDiscussionsList: (...args) => dispatch(getMoreOfDiscussionsList(...args))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Discussions);