import React, { Component } from 'react'
import { CardPanel, Row, Col, Card, CardTitle, Button, Autocomplete, Tabs, Tab, Icon, Input } from 'react-materialize'
import M from 'materialize-css';
import ta from 'time-ago'
import { getFollows } from '../../actions/Discussions.actions'

import { connect } from 'react-redux'

class Followed extends Component {
    constructor(props) {
        super(props);
        this.search = React.createRef();
    }

    componentDidMount = () => {
        this.props.getFollows()
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col s={2} />
                    <Col s={8}>
                        <h4>Followed discussion</h4>
                        <div class="chips">
                            <input id="tags" ref={this.search} />
                        </div>
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
        getFollows: () => dispatch(getFollows())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Followed);