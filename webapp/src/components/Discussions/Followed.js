import React, { Component } from 'react'
import { CardPanel, Row, Col, Card, CardTitle, Button, Autocomplete, Tabs, Tab, Icon, Input } from 'react-materialize'
import M from 'materialize-css';

export default class Followed extends Component {
    constructor(props) {
        super(props);
        this.search = React.createRef();
    }

    handleTags() {
        const elem = document.querySelector('.chips');
        let search = M.Chips.getInstance(elem).chipsData.map(el => el.tag)
        if (JSON.stringify(search) !== JSON.stringify(this.state.search)) {
            this.setState({ search })
            console.log(search)
            
        }

        console.log(search)
    }

    componentDidMount = () => {
        let elems = document.querySelectorAll('.chips');
        const instances = M.Chips.init(elems, {
            placeholder: 'Enter a keyphrase',
            secondaryPlaceholder: '+Keyphrase',
            onChipDelete: () => this.handleTags(),
            onChipAdd: () => this.handleTags(),
        });
        this.setState({
            search: []
        })

    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col s={2} />
                    <Col s={8}>
                        <h4>Search for discussion</h4>
                        <div class="chips">
                            <input id="tags" ref={this.search} />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
