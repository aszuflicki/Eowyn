import React, { Component, Fragment } from 'react'
import { updateLayout, updateSettings, toggleDeleteTabModal, setTabActive } from "../../../actions/Dashboard.actions";
import { Card, CardTitle, Row, Col, Button, Icon } from 'react-materialize'
import { connect } from 'react-redux';

class DeleteTabModal extends Component {
    componentWillMount = () => {
        this.setState({ input: '', err: '' })
    }

    render() {
        let { toggleDeleteTabModal, layout, updateLayout, isDeleteTabModal,
             settings, tabActive, setTabActive } = this.props

        if (!isDeleteTabModal) return ''

        return (
            <Fragment>
                <div style={{ position: "absolute", top: "112px", width: "100vw", zIndex: "1000", backgroundColor: "rgb(121,121,121,.7)", height: 'calc(100vh - 80px)' }}>
                    <Row style={{ position: "absolute", zIndex: "10000", width: "100vw" }}>
                        <Col s={2}></Col>
                        <Col s={8}>
                            <Card
                                header={<CardTitle waves='light' />}

                                title="Delete this tab" >

                                {this.state.err.length > 0 ?
                                    <div class="alert alert-danger" role="alert">
                                        {this.state.err}
                                    </div> : ''}
                                <h5>Are you sure?</h5>
                                <Row>
                                    <Col s={6} />
                                    <Col s={6}>
                                        <Button className="red"
                                            onClick={() => {
                                                console.log(tabActive)
                                                layout[Object.keys(layout)[tabActive]].layout.forEach(el => {
                                                    delete settings[el.i]
                                                })
                                                delete layout[Object.keys(layout)[tabActive]]
                                                setTabActive(Object.keys(layout).length - 1)
                                                updateLayout(layout)
                                                updateSettings(settings)
                                                toggleDeleteTabModal(false)
                                            }}>Yes, delete<Icon right>delete_forever</Icon></Button>
                                        <Button style={{marginLeft: "15px"}}
                                        onClick={() => {
                                                toggleDeleteTabModal(false)
                                            }}>No, go back</Button>
                                    </Col>
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
        toggleDeleteTabModal: (isActive) => dispatch(toggleDeleteTabModal(isActive)),
        setTabActive: (index) => dispatch(setTabActive(index)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTabModal);