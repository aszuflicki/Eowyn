import React, { Component, Fragment } from 'react'

export default class AddEditBtns extends Component {

    render() {
        return (
            <Fragment>
                <div className="card">
                    <div className="card-body">
                        <button type="button" className="btn btn-md btn-success "
                            onClick={() => { this.props.updateState(true, false) }}>Add</button>
                        {this.props.isEditMode ? (
                            <Fragment>
                                <button type="button" className="btn btn-md btn-danger ml-3"
                                    onClick={() => { this.props.updateState(false, false) }}>Stop Editing</button>
                            </Fragment>
                        ) : (
                                <Fragment>
                                    <button type="button" className="btn btn-md btn-info ml-3"
                                        onClick={() => { this.props.updateState(false, true) }}>Edit</button>
                                </Fragment>
                            )}
                    </div>
                </div>
            </Fragment>
        )
    }
}