import React, { Component, Fragment } from 'react'
import { updateLayout, updateSettings, toggleAddTabModal, setTabActive } from "../../../actions/Dashboard.actions";
import { Modal, Button, Input, Row, Col, Card, CardTitle } from 'react-materialize'
import { connect } from 'react-redux';

class DeleteTabModal extends Component {
    componentWillMount = () => {
        this.setState({ input: '', err: '' })
    }

    render() {
        let { toggleAddTabModal, layout, updateLayout, isAddTabModal, setTabActive } = this.props

        if (!isAddTabModal) return ''

        return (
            <Fragment>
                <div style={{ position: "absolute", top: "112px", width: "100vw", zIndex: "1000", backgroundColor: "rgb(121,121,121,.7)", height: 'calc(100vh - 80px)' }}>
                    <Row style={{ position: "absolute", zIndex: "10000", width: "100vw" }}>
                        <Col s={2}></Col>
                        <Col s={8}>
                            <Card
                                header={<CardTitle waves='light' />}
                                actions={[
                                    <div className="right-align">
                                        <a className="blue-text"
                                            onClick={() => {
                                                const newId = Math.max(0, ...Object.keys(layout)) + 1
                                                console.log(newId)
                                                layout[newId + ""] = {
                                                    layout: [],
                                                    tabName: this.state.input
                                                }
                                                updateLayout(layout)
                                                setTabActive(Object.keys(layout).length - 1)
                                                toggleAddTabModal(false)
                                            }}
                                        >Add</a>
                                        <a className="red-text"
                                            onClick={() => toggleAddTabModal(false)}
                                        > Cancel</a>
                                    </div>
                                ]}
                                title="Add new tab" >

                                <div style={{ color: "white" }}>x</div>
                                {this.state.err.length > 0 ?
                                    <div class="alert alert-danger" role="alert">
                                        {this.state.err}
                                    </div> : ''}
                                <Row>
                                    <Input s={6} label="Tab name"
                                        onChange={(...args) => {
                                            console.log(args)
                                            this.setState({
                                                input: args[1]
                                            })
                                        }} />
                                </Row>
                            </Card>
                        </Col>
                        <Col s={2} />
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
        updateLayout: (...args) => dispatch(updateLayout(...args)),
        updateSettings: (...args) => dispatch(updateSettings(...args)),
        toggleAddTabModal: (isActive) => dispatch(toggleAddTabModal(isActive)),
        setTabActive: (index) => dispatch(setTabActive(index))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTabModal);







