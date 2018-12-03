import React, { Component } from 'react';
import { Tabs, Tab, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar.component'

class LandingPage extends Component {

    state = {
        show: true
    }

    drawerClickHandler = () => {

        this.setState({
            show: !this.state.show
        })
    }

    render() {

        return (
            <div className="dashboard-container">

                <Sidebar handleClick={this.drawerClickHandler} show={this.state.show} />
                
            </div>
            )
        }
    }
    
export default LandingPage