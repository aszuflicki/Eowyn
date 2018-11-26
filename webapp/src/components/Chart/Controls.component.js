import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap'

class Controls extends Component {

    render() {

        return (
            <div>
                <DropdownButton
                    bsStyle={"default"}
                    title={"Type"}
                    key={"type-btns"}
                    id={`dropdown-basic`}
                >
                    <MenuItem eventKey="1" active>Area</MenuItem>
                    <MenuItem eventKey="2">Candlestick</MenuItem>
                    <MenuItem eventKey="3" >Line</MenuItem>
                </DropdownButton>

            </div>
        )
    }
}

export default Controls;