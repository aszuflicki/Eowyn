import React, { Component, Fragment } from 'react';
import Navbar from '../Navbar.component'
import { CardPanel, Row, Col, Card, CardTitle, Button, Autocomplete, Tabs, Tab, Icon, Input } from 'react-materialize'
import history from '../../routers/history';
import { connect } from 'react-redux';
import Badges from './Fragments/Badges.component'
import { getDisscussion, newPost } from '../../actions/Discussions.actions'
import ta from 'time-ago'

class Discussion extends Component {

    componentWillMount = () => {
        this.setState({ err: '', input: '' })
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
        const { topic, category, author, desc } = this.props.discussion

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
                                        <img src="http://chittagongit.com//images/default-user-icon/default-user-icon-8.jpg" alt="" class="circle" style={{ width: "42px", marginTop: "35px" }} />
                                    </Col>
                                    <Col s={10}>
                                        <Row>
                                            <Col s={5} />
                                            <Col>
                                                <Badges s={2} badge={0} />
                                            </Col>
                                            <Col s={5} />
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
                                ><Icon><img src="http://chittagongit.com//images/default-user-icon/default-user-icon-8.jpg" alt="" class="circle" style={{ width: "32px", marginTop: "0px" }} /></Icon></Input>

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
                        ) : (<ul class="collection">
                            {this.props.posts.map(post => (
                                <li class="collection-item avatar">
                                    <img src="http://chittagongit.com//images/default-user-icon/default-user-icon-8.jpg" alt="" class="circle" />
                                    <p><b>{post.author}</b>
                                    
                                     <label>&nbsp; {ta.ago(post.updatedAt +'')}</label>
                                      <br />
                                        {post.comment}
                                    </p>
                                    <a href="#!" class="secondary-content">
                                        {/* <Row>
                                            <Col> <span class="new badge" data-badge-caption="Investment"></span>
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
    console.log(state.discussion)
    return {
        ...state.discussion,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDisscussion: (...args) => dispatch(getDisscussion(...args)),
        newPost: (...args) => dispatch(newPost(...args))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Discussion);