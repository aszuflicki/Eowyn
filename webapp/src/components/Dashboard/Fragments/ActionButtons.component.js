import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { toggleAddModal, toggleEditMode, toggleDeleteTabModal } from '../../../actions/Dashboard.actions'
import './fragments.css'
import { Button } from 'react-materialize'
import M from 'materialize-css';

class ActionButtons extends Component {

    render() {

        return (
            <Fragment>

                <Button floating fab='vertical' icon={this.props.isEditMode ? 'close' : 'dehaze'} className={this.props.isEditMode ? 'blue' : 'red'} large style={{ bottom: '45px', right: '24px' }}
                >
                    <div style={{ height: "45px", width: "45px", bottom: "-60px", position: "absolute", zIndex: 10000 }} onClick={() => {
                        if (this.props.isEditMode)
                            this.props.toggleEditMode(false)
                    }}></div>
                    <Button floating className='red'
                        onClick={() => {
                            this.props.toggleDeleteTabModal(true)
                        }}><svg viewBox="0 0 210 297" height={"60px"} style={{ margin: "5px" }}>
                            <g >
                                <path id="path10" d="M 125.33691,55.624406 H 92.679757 L 83.387786,46.00979 C 82.36725,44.953819 80.982722,44.360715 79.538666,44.360715 H 54.579761 c -4.509067,0 -8.164286,3.782136 -8.164286,8.447768 v 50.686607 c 0,4.66563 3.655219,8.44776 8.164286,8.44776 h 70.757149 c 4.50907,0 8.16429,-3.78213 8.16429,-8.44776 V 64.072177 c 0,-4.665636 -3.65522,-8.447771 -8.16429,-8.447771 z m 0,47.870684 H 54.579761 V 52.808483 h 23.832908 l 9.29198,9.614616 c 1.020535,1.055972 2.405068,1.649078 3.849118,1.649078 h 33.783143 z" connector-curvature="0" style={{ fill: "#fff", strokeWidth: "0.17301702" }} />
                                <path id="path21" d="m 33.27338,25.991072 10.78846,-10.35864 c 1.323894,-1.271153 1.323894,-3.332115 0,-4.604301 L 41.664163,8.725982 c -1.323895,-1.271154 -3.470373,-1.271154 -4.795347,0 L 26.080355,19.084621 15.291898,8.725982 c -1.323895,-1.271154 -3.470375,-1.271154 -4.795349,0 l -2.3976751,2.302149 c -1.323896,1.27115 -1.323896,3.332114 0,4.604301 L 18.887332,25.991072 8.0988739,36.349714 c -1.323896,1.27115 -1.323896,3.332111 0,4.604297 l 2.3976751,2.302153 c 1.323896,1.271151 3.471454,1.271151 4.795349,0 L 26.080355,32.897521 36.868816,43.256164 c 1.323894,1.271151 3.471452,1.271151 4.795347,0 l 2.397677,-2.302153 c 1.323894,-1.271149 1.323894,-3.332111 0,-4.604297 z" connector-curvature="0" style={{ fill: "#fff", strokeWidth: "0.1056397" }} />
                            </g>
                        </svg >

                    </Button >
                    <Button floating icon='mode_edit' className='blue'
                        onClick={() => this.props.toggleEditMode(true)} />

                    <Button floating className='green'
                        onClick={() => { this.props.toggleAddModal(true); console.log('xD') }}
                    >
                        <svg viewBox="0 0 210 297" height={"40px"} style={{ margin: "2px" }}>
                            <g >
                                <path id="path3735" d="m 176.81153,170.77222 c 1.74625,0 3.175,1.42875 3.175,3.175 v 10.58333 c 0,1.74625 -1.42875,3.175 -3.175,3.175 H 47.694866 c -1.74625,0 -3.175,-1.42875 -3.175,-3.175 V 89.280559 c 0,-1.74625 1.42875,-3.175 3.175,-3.175 h 10.583333 c 1.74625,0 3.175,1.42875 3.175,3.175 V 170.77222 Z M 143.13007,111.37326 120.71986,126.32222 98.150913,96.239099 c -1.34938,-1.79917 -4.10105,-1.66688 -5.26521,0.26458 L 69.919866,134.78889 v 27.51667 H 171.51986 l -23.78604,-49.68875 c -0.84667,-1.7198 -3.01625,-2.30188 -4.60375,-1.24355 z" connector-curvature="0" style={{ fill: "#fff", strokeWidth: "0.26458332" }} />
                                <path id="path3746" d="M 47.813481,66.012699 H 33.080483 V 51.709236 c 0,-1.755162 -1.466135,-3.178562 -3.273996,-3.178562 H 26.53249 c -1.807861,0 -3.274011,1.4234 -3.274011,3.178562 V 66.012699 H 8.5254807 c -1.8078762,0 -3.2740117,1.423384 -3.2740117,3.178532 v 3.178548 c 0,1.755177 1.4661355,3.178554 3.2740117,3.178554 H 23.258479 v 14.303462 c 0,1.755149 1.46615,3.178548 3.274011,3.178548 h 3.273997 c 1.807861,0 3.273996,-1.423399 3.273996,-3.178548 V 75.548333 h 14.732998 c 1.807862,0 3.274012,-1.423377 3.274012,-3.178554 v -3.178548 c 0,-1.755148 -1.46615,-3.178532 -3.274012,-3.178532 z" connector-curvature="0" style={{ fill: "#fff", strokeWidth: "0.10081004" }} />
                            </g>
                        </svg >

                    </Button >

                    {/* <Button floating icon='format_quote' className='yellow darken-1' />
                    <Button floating icon='publish' className='green' />
                    <Button floating icon='attach_file' className='blue' /> */}
                </Button >
            </Fragment >
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
        toggleEditMode: (isActive) => dispatch(toggleEditMode(isActive)),
        toggleDeleteTabModal: (isActive) => dispatch(toggleDeleteTabModal(isActive)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons)