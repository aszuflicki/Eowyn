import React, { Component, Fragment } from 'react';
import { CardPanel, Row, Col, Card, CardTitle, Button, Autocomplete, Tabs, Tab, Icon, Input } from 'react-materialize'
import { connect } from 'react-redux';
import Badges from './Fragments/Badges.component'
import Follow from './Fragments/Follow.component'
import { getDisscussion, newPost, getFollows, notifyNewPost } from '../../actions/Discussions.actions'
import ta from 'time-ago'
const io = require('socket.io-client')

class Discussion extends Component {

    componentWillMount = () => {
        this.setState({ err: '', input: '' })
        this.props.getFollows()
        const id = window.location.href.split('/')[4]
        const socket = io(`http://localhost:8081/discussion/${id}`)
            .on('new_post', (post) => {
                console.log(post)
                if (post.author != this.props.email) {
                    this.props.notifyNewPost(post, this.props.discussion)
                }
            })
    }

    componentDidMount = () => {
        const id = window.location.href.split('/')[4]
        this.props.getDisscussion(id)
    }

    newPost() {
        if (this.state.input.length === 0) {
            this.setState({ err: 'Comment can\'t be blank' })
        } else {
            this.setState({ err: '', input: '' })
            this.props.newPost(this.state.input, this.props.discussion.id)
            setTimeout(() => this.props.getDisscussion(this.props.discussion.id), 100);
        }
    }

    render() {
        if (!this.props.discussion) return (<div></div>)
        console.log(this.props)
        const { topic, category, author, desc, id } = this.props.discussion

        return (
            <Fragment>
                <Row />
                <Row />
                <Row>
                    <Col s={12} >
                        <CardPanel className="teal lighten-4 black-text">
                            <Row>
                                <div className="container avatar">
                                    <Col s={1}>
                                        <img src={`http://localhost:8081/profile/pic/${author}`} alt="" className="circle" style={{ width: "42px", height: "42px", marginTop: "35px" }} />
                                    </Col>
                                    <Col s={11}>
                                        <Row>
                                            <Col s={4} />
                                            <Col s={3}>
                                                <Badges badge={0} />
                                            </Col>
                                            <Col s={3} />
                                            <Col>
                                                {/* <a className="waves-effect waves-light btn-small" right><i className="material-icons right">star_border</i>Follow</a> */}
                                                <Follow topic_id={id} />
                                            </Col>
                                        </Row>
                                        <h5>{topic}</h5>
                                        <span>{desc}</span>
                                    </Col>
                                </div>


                            </Row>
                        </CardPanel>
                    </Col>

                </Row>
                <div className="container">
                    <Row>
                        <Row>
                            <div className='reply' style={{ padding: "0 0 0 45px", position: "relative" }}>

                                <Input s={10} label="Comment" validate
                                    value={this.state.input}
                                    onChange={(...args) => this.setState({ input: args[1] })}
                                ><Icon><img src={`http://localhost:8081/profile/pic/${this.props.email}`} alt="" className="circle" style={{ width: "32px", height: "32px", marginTop: "0px" }} /></Icon></Input>

                                <Col>
                                    <Button s={2} style={{ marginTop: "25px" }}
                                        onClick={() => this.newPost()}
                                    >Reply</Button>
                                </Col>
                                <Row><label style={{ position: "absolute", bottom: 0, left: "100px", color: 'red' }}>{!this.state.err ? '' : this.state.err}</label></Row>
                            </div>
                        </Row>

                        {this.props.posts.length == 0 ? (
                            <Row>
                                <Col s={8}><span>No comments. Be first to comment</span></Col>
                            </Row>
                        ) : (<ul className="collection">
                            {this.props.posts.map(post => (
                                <li className="collection-item avatar" key={'post-' + post.updatedAt}>
                                    <img src={`http://localhost:8081/profile/pic/${post.author}`} alt="" className="circle" />
                                    <p><b>{post.author}</b>

                                        <label>&nbsp; {ta.ago(post.updatedAt + '')}</label>
                                        <br />
                                        {post.comment}
                                    </p>
                                    <a href="#!" className="secondary-content">
                                        {/* <Row>
                                            <Col> <span className="new badge" data-badge-caption="Investment"></span>
                                            </Col>
                                        </Row> */}

                                    </a>
                                </li>
                            ))}


                        </ul>)}


                    </Row>


                </div>

            </Fragment >
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        ...state.discussion,
        email: state.auth.email || ''
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDisscussion: (...args) => dispatch(getDisscussion(...args)),
        newPost: (...args) => dispatch(newPost(...args)),
        getFollows: (...args) => dispatch(getFollows(...args)),
        notifyNewPost: (...args) => dispatch(notifyNewPost(...args))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Discussion);

// google news api key 6518591a014846529815780fd3f59d72