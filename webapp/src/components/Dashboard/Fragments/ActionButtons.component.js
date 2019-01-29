import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { toggleAddModal, toggleEditMode } from '../../../actions/Dashboard.actions'
import './fragments.css'
import { Button } from 'react-materialize'

class ActionButtons extends Component {

    render() {

        return (
            <Fragment>
                <Button floating fab='vertical' icon='mode_edit' className='red' large style={{ bottom: '45px', right: '24px' }}>
                    <Button floating icon='insert_chart' className='green'
                        onClick={() => {this.props.toggleAddModal(true); console.log('xD')}}
                    />
                    <Button floating className='red' 
                    onClick={() => this.props.toggleEditMode(true)}
                    ><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /><path d="M0 0h24v24H0z" fill="none" /></svg> 
                    </Button>
                    {/* <Button floating icon='format_quote' className='yellow darken-1' />
                    <Button floating icon='publish' className='green' />
                    <Button floating icon='attach_file' className='blue' /> */}
                </Button>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state.dashboard)
    return {
        ...state.dashboard,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleAddModal: (isActive) => dispatch(toggleAddModal(isActive)),
        toggleEditMode: (isActive) => dispatch(toggleEditMode(isActive))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons)