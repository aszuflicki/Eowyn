import React, { Component, Fragment } from 'react'
import { updateLayout, updateSettings, toggleEditTabModal, setTabActive } from "../../../actions/Dashboard.actions";
import { Modal, Button, Input, Row, Col, Card, CardTitle } from 'react-materialize'
import { connect } from 'react-redux';
import { relative } from 'path';

class EditTabModal extends Component {
    componentWillMount = () => {
        this.setState({ input: '', err: '' })
    }

    handleSubmit() {
        if (this.state.input.length < 3 || this.state.input.length > 20) {
            this.setState({ err: 'Tab name should have length between 3 and 20' })
            return;
        }

        this.setState({ err: '' })
        let { toggleEditTabModal, layout, updateLayout, editedTab } = this.props
        layout[Object.keys(layout)[editedTab]].tabName = this.state.input
        updateLayout(layout)
        toggleEditTabModal(false)
    }

    render() {
        let { toggleEditTabModal, isEditTabModal } = this.props

        if (!isEditTabModal) return ''

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
                                            onClick={() => this.handleSubmit()}
                                        >Change</a>
                                        <a className="red-text"
                                            onClick={() => toggleEditTabModal(false)}
                                        > Cancel</a>
                                    </div>
                                ]}
                                title="Edit tab name" >

                                <div style={{ color: "white" }}>x</div>

                                <Row style={{position: "relative"}}>
                                    <Input s={6} label="Tab name"
                                        onChange={(...args) => {
                                            console.log(args)
                                            this.setState({
                                                input: args[1]
                                            })
                                        }} />
                                    <label 
                                    style={{position: 'absolute', left: "15px", bottom: "0", color: 'red'}}>{this.state.err}</label>

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
        toggleEditTabModal: (isActive, index) => dispatch(toggleEditTabModal(isActive, index)),
        setTabActive: (index) => dispatch(setTabActive(index))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTabModal);







