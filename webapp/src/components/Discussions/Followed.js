import React, { Component } from 'react'
import M from 'materialize-css';
import ta from 'time-ago'
import { getFollowed } from '../../actions/Discussions.actions'
import history from '../../routers/history';
import { Row, Col, Icon, Badge } from 'react-materialize'

import { connect } from 'react-redux'

class Followed extends Component {
    constructor(props) {
        super(props);
        this.search = React.createRef();
    }

    componentWillMount = () => {
        this.props.getFollowed()
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col s={2} />
                    <Col s={8}>
                        <h4>Followed discussions</h4>
                    </Col>
                </Row>
                <Row>
                    <Col s={2} />
                    <Col s={8}>
                        {!!this.props.followed.rows.length > 0 &&
                            <ul className="collection">
                                {this.props.followed.rows.map(el => (
                                    <li className="collection-item avatar"
                                        onClick={() => history.push(`/discussion/${el.id}`)} key={'post-' + el.id}>
                                        <img src={`http://localhost:8081/profile/pic/${el.author}`} alt="" className="circle" />
                                        <span className="title"><b>{el.topic}</b></span>
                                        <p><span className="truncate"
                                            style={{ width: "calc(100% - 250px)", display: "inline-block" }}>

                                            {el.desc}
                                        </span> </p>
                                        <label>{el.posts === 0 ? `Created ${ta.ago(el.createdAt)}` : `Updated ${ta.ago(el.updatedAt)}`}</label>

                                        <a href="#!" className="secondary-content">
                                            <Row>
                                                <Col><Badge> <Icon tiny >chat_bubble_outline</Icon>{el.posts}</Badge>
                                                </Col>
                                            </Row>
                                        </a>
                                    </li>))}
                            </ul>}
                        {this.props.followed.rows.length < this.props.followed.count &&
                            <div>Loading...</div>}
                        {this.props.followed.rows.length === this.props.followed.count && this.props.followed.count !== 0 &&
                            <div>You did it! You reached the end!</div>}
                        {this.props.followed.count === 0 &&
                            <div>You do not follow any discussions :( </div>}
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return { ...state.discussion }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFollowed: () => dispatch(getFollowed())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Followed);