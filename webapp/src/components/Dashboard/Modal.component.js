import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import AutoSuggestions from './Autosuggestion.component'


class AddWidgetModal extends PureComponent {

    render() {
        return (
            <div class="modal show " tabindex="1" role="dialog" style={{ display: "block" }}>
                <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add Widget</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Choose type</p>
                            <button type="button" class="btn btn-md btn-primary active">Chart View Widget</button>
                            <span style={{ color: "white" }}>x</span>
                            <button type="button" class="btn btn-md btn-primary">Crypto Market Overview</button>
                            <span style={{ color: "white" }}>x</span>
                            <button type="button" class="btn btn-md btn-primary">Market Overview</button>
                            <span style={{ color: "white" }}>x</span>
                            <button type="button" class="btn btn-md btn-primary">Single Ticker</button>
                            <span style={{ color: "white" }}>x</span>
                            <button type="button" class="btn btn-md btn-primary">Technical Analisis</button>
                            <span style={{ color: "white" }}>x</span>
                            <button type="button" class="btn btn-md btn-primary">Multi Ticker</button>

                            <hr />

                            <p>Settings</p>
                            
                            <AutoSuggestions />

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
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
        //   updateLayout: (layout) => dispatch(updateLayout(layout)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddWidgetModal);


