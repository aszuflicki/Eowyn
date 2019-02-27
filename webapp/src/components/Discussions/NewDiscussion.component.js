import React, { Component, Fragment } from 'react'
import Navbar from '../Navbar.component'
import { connect } from 'react-redux';
import M from 'materialize-css';
import { addNewDisscussion } from '../../actions/Discussions.actions'
import history from '../../routers/history'
import { CardPanel, Row, Col, Card, CardTitle, Button, Autocomplete, Tabs, Tab, Badge, Input } from 'react-materialize'

class NewDiscussion extends Component {
    componentWillMount() {
        this.setState({
            category: 0,
            topic: '',
            desc: '',
            instances: {},
            err: {
                topic: '',
                desc: '',
                tags: ''
            }
        })
    }


    componentDidMount = () => {
        let instances = {}
    
        setTimeout(() => {
            const elems = document.querySelectorAll('.chips');
            instances = M.Chips.init(elems, {
                placeholder: 'Enter a tag',
                secondaryPlaceholder: '+Tag',
            });
        }, 100);

        this.setState({ instances })

    }

    handleSubmit() {
        const elem = document.querySelector('.chips');
        const tags = M.Chips.getInstance(elem).chipsData.map(el => el.tag)
        const { topic, desc, category } = this.state

        if (topic.length < 10) {
            this.setState({
                err: {
                    topic: 'Topic must be at least 10 characters long'
                }
            })
        } else if (desc.length < 10) {
            this.setState({
                err: {
                    desc: 'Description must be at least 10 characters long'
                }
            })
        } else if (tags.length < 3) {
            this.setState({
                err: {
                    tags: 'Add at least 3 tags'
                }
            })
        } else {
            this.props.addNewDisscussion(category, topic, desc, tags)
        }



        console.log(tags)
    }




    render() {
        const { category } = this.state
        return (
            <Fragment>
                <div className="container" style={{ marginTop: "60px" }}>
                    <Row>
                        <Col s={3} />
                        <Col s={6} >
                            <h4>Add new discussion</h4>
                        </Col>
                    </Row>
                    <Row style={{ position: "relative" }}>
                        <Col s={3} />
                        <Input placeholder="Topic" s={6}
                            onChange={(...args) => this.setState({ topic: args[1] })}
                            error={this.state.err.topic} />
                        <Col s={6} offset={'s3'}> <label className="add-discussion-label">{this.state.err.topic}</label>
                        </Col>

                    </Row>
                    <Row style={{ position: "relative" }}>
                        <Col s={3} />
                        <Input type='textarea' s={6} placeholder="Description"
                            onChange={(...args) => this.setState({ desc: args[1] })}
                            error={this.state.err.desc}
                        />
                        <Col s={6} offset={'s3'}> <label className="add-discussion-label">{this.state.err.desc}</label>
                        </Col>
                    </Row>
                    <Row style={{ position: "relative" }}>
                        <Col s={3} />
                        <Col s={6} >
                            <div class="chips">
                                <input id="tags"
                                    onChipAdd={(...args) => console.log(args)}
                                    error={this.state.err.tagsa}
                                />
                            </div>
                        </Col>
                        <Col s={6} offset={'s3'}> <label className="add-discussion-label">{this.state.err.tags}</label>
                            </Col>
                    </Row>
                    <Row>
                        <Col s={6} />
                        <Col s={3}>
                            <a class="btn right indigo darken-3"
                                onClick={() => this.handleSubmit()}
                            >Add</a>
                            <a class="btn right indigo lighten-2" 
                            onClick={() => history.push('/discussions')}
                            >Cancel</a>
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
        addNewDisscussion: (...args) => dispatch(addNewDisscussion(...args)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDiscussion);