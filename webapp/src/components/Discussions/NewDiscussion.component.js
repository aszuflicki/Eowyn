import React, { Component, Fragment } from 'react'
import Navbar from '../Navbar.component'
import { connect } from 'react-redux';
import M from 'materialize-css';
import { addNewDisscussion } from '../../actions/Discussions.actions'

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
        document.addEventListener('DOMContentLoaded', function () {
            const elems = document.querySelectorAll('.chips');
            instances = M.Chips.init(elems, {
                placeholder: 'Enter a tag',
                secondaryPlaceholder: '+Tag',
            });

        });
        this.setState({ instances })

    }

    handleSubmit() {
        const elem = document.querySelector('.chips');
        const tags = M.Chips.getInstance(elem).chipsData.map(el => el.tag)
        const { topic, desc, category } = this.state

        this.props.addNewDisscussion(category, topic, desc, tags)

        console.log(tags)
    }




    render() {
        const { category } = this.state
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
                                <a class={`btn teal ${category == 0 ? 'darken-3' : ''}`} onClick={() => this.setState({ category: 0 })}>General Discussion</a>
                                <a class={`btn teal ${category == 1 ? 'darken-3' : ''}`} onClick={() => this.setState({ category: 1 })}>Stocks / Bonds</a>
                                <a class={`btn teal ${category == 2 ? 'darken-3' : ''}`} onClick={() => this.setState({ category: 2 })}>Investment Ideas</a>
                                <a class={`btn teal ${category == 3 ? 'darken-3' : ''}`} onClick={() => this.setState({ category: 3 })}>Cryptocurrencies</a>
                                <a class={`btn teal ${category == 4 ? 'darken-3' : ''}`} onClick={() => this.setState({ category: 4 })}>Commodities</a>
                                <a class={`btn teal ${category == 5 ? 'darken-3' : ''}`} onClick={() => this.setState({ category: 5 })}>Short / CFDs</a>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col s={3} />
                        <Input placeholder="Topic" s={6}
                            onChange={(...args) => this.setState({ topic: args[1] })}
                            error={this.state.err.topic} />
                        <label>{this.state.err.topic}</label>
                    </Row>
                    <Row>
                        <Col s={3} />
                        <Input type='textarea' s={6} placeholder="Description"
                            onChange={(...args) => this.setState({ desc: args[1] })}
                        />
                        <label>{this.state.err.desc}</label>
                    </Row>
                    <Row>
                        <Col s={3} />
                        <Col s={6} >
                            <div class="chips">
                                <input id="tags"
                                    onChipAdd={(...args) => console.log(args)}
                                />

                            </div>
                            <label>{this.state.err.tags}</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col s={6} />
                        <Col s={3}>
                            <a class="btn right indigo darken-3"
                                onClick={() => this.handleSubmit()}
                            >Add</a>
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
        addNewDisscussion: (...args) => dispatch(addNewDisscussion(...args)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDiscussion);