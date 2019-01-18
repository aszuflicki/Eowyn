import React, { Component } from 'react'

export default class AddEditBtns extends Component {

    render() {
        return (
            <div style={{
                position: 'absolute',
                left: 0,
                top: "75px",
                backgroundColor: "rgb(0,0,0,.4)",
                width: '100vw',
                height: 'calc(100vh - 75px)'
            }}>
                <div className="d-flex justify-content-center"
                    style={{ top: '40vh', left: '50vw', position: 'absolute', transition: "transform(-50%, 0)" }}
                >
                    <div className="spinner-border row" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
}