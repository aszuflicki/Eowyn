import React, { Component } from 'react';
import { Tabs, Tab, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
class LandingPage extends Component {

    render() {

        return (
            <div className="landingpage-container">
                <div className="landingpage-container_bg"> </div>
                <div className="landingpage-container_text">
                    <h2>Welcome to Eowyn</h2>
                    <h5>That's the last tool your ever gonna need...</h5>
                </div>

                <div className="landingpage-container_form">
                    <Tabs defaultActiveKey={1} id="form-register">
                        <Tab eventKey={1} title="Register">
                            
                            <FormGroup
                                controlId="formBasicText"
                                validationState={true}
                            >
                                {/* <ControlLabel>Working example with validation</ControlLabel> */}
                                <FormControl
                                    type="text"
                                    value={"Email"}
                                    placeholder="Enter text"
                                    onChange={() => console.log()}
                                />

                                <FormControl
                                    type="text"
                                    value={"Password"}
                                    placeholder="Enter text"
                                    onChange={() => console.log()}
                                />

                                <FormControl
                                    type="text"
                                    value={"Password again"}
                                    placeholder="Enter text"
                                    onChange={() => console.log()}
                                />
                                {/* <FormControl.Feedback /> */}
                                {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
                            </FormGroup>
                        </Tab>
                        <Tab eventKey={2} title="Log in">
                            
                            <FormGroup
                                controlId="formBasicText"
                                validationState={true}
                            >
                                <FormControl
                                    type="text"
                                    value={"LLogin"}
                                    placeholder="Enter text"
                                    onChange={() => console.log()}
                                />
                                <FormControl
                                    type="text"
                                    value={"LLogin"}
                                    placeholder="Enter text"
                                    onChange={() => console.log()}
                                />
                                {/* <FormControl.Feedback /> */}
                                {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
                            </FormGroup>
                        </Tab>

                    </Tabs>

                </div>

            </div>
        )
    }
}

export default LandingPage