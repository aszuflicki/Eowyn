import React, { Component, Fragment } from 'react'
import { Button } from 'react-materialize'

export default class ChooseTypeButtons extends Component {

    render() {
        const { type, setType } = this.props
        return (
            <Fragment>
                <p>Choose type</p>
                <Button waves='light'
                    className={`indigo  ${type === 0 ? '' : 'lighten-1'}`}
                    onClick={() => setType(0)}
                >Chart</Button>
                <span style={{ color: "white" }}>x</span>
                <Button waves='light'
                    className={`indigo  ${type === 1 ? '' : 'lighten-1'}`}
                    onClick={() => setType(1)}
                >Crypto Market Overview</Button>
                <span style={{ color: "white" }}>x</span>
                <Button waves='light'
                    className={`indigo  ${type === 2 ? '' : 'lighten-1'}`}
                    onClick={() => setType(2)}
                >Custom Market Overview</Button>
                <span style={{ color: "white" }}>x</span>
                <Button waves='light'
                    className={`indigo  ${type === 3 ? '' : 'lighten-1'}`}
                    onClick={() => setType(3)}
                >Chart</Button>
                <span style={{ color: "white" }}>x</span>
                <Button waves='light'
                    className={`indigo  ${type === 4 ? '' : 'lighten-1'}`}
                    onClick={() => setType(4)}
                >Chart</Button>
                <span style={{ color: "white" }}>x</span>
                <Button waves='light'
                    className={`indigo  ${type === 5 ? '' : 'lighten-1'}`}
                    onClick={() => setType(5)}
                >Chart</Button>
            </Fragment>

        )
    }
}
