import React, { PureComponent, Fragment } from "react";
import { connect } from 'react-redux';
import AutoSuggestions from './Autosuggestion.component'


class AddWidgetModal extends PureComponent {

    componentWillMount() {
        this.setState({
            type: 2,
            settings: ''
        })
    }

    renderSettingsForChartView() {
        return (
            <Fragment>
                <AutoSuggestions />
            </Fragment>

        )
    }

    renderSettingsForCrypoMarketOverview() {
        return (
            <Fragment>
                <p>No settings available for this widget</p>
            </Fragment>

        )
    }

    renderSettingsForMarketOverview() {
        return (
            <Fragment>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" >Active</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">Link</a>
                    </li>
                    <button type="button" className="btn btn-info">+</button>

                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <AutoSuggestions />
                        <AutoSuggestions />
                        <AutoSuggestions />

                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                    </div>
                    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">

                    </div>
                </div>
            </Fragment>

        )
    }

    renderSettings() {
        switch (this.state.type) {
            case 0:
                return (
                    <Fragment>
                        {this.renderSettingsForChartView()}
                    </Fragment>
                )
            case 1:
                return (
                    <Fragment>
                        {this.renderSettingsForCrypoMarketOverview()}
                    </Fragment>
                )
            case 2:
                return (
                    <Fragment>
                        {this.renderSettingsForMarketOverview()}
                    </Fragment>
                )
            case 3:
                return (
                    <Fragment>
                        {this.renderSettingsForChartView()}
                    </Fragment>
                )
            case 4:
                return (
                    <Fragment>
                        {this.renderSettingsForChartView()}
                    </Fragment>
                )
            case 5:
                return (
                    <Fragment>
                        {this.renderSettingsForChartView()}
                    </Fragment>
                )
        }
    }

    renderChooseType() {
        const { type } = this.state
        return (
            <Fragment>
                <p>Choose type</p>
                <button
                    type="button"
                    className={`btn btn-md btn-primary ${type === 0 ? 'active' : ''}`}
                    onClick={() => this.setState({ type: 0 })}
                >
                    Chart View Widgetw
                </button>
                <span style={{ color: "white" }}>x</span>
                <button
                    type="button"
                    className="btn btn-md btn-primary"
                    className={`btn btn-md btn-primary ${type === 1 ? 'active' : ''}`}

                    onClick={() => this.setState({ type: 1 })}

                >
                    Crypto Market Overview
                </button>
                <span style={{ color: "white" }}>x</span>
                <button
                    type="button"
                    className={`btn btn-md btn-primary ${type === 2 ? 'active' : ''}`}

                    onClick={() => this.setState({ type: 2 })}

                >
                    Market Overview
                </button>
                <span style={{ color: "white" }}>x</span>
                <button
                    type="button"
                    className={`btn btn-md btn-primary ${type === 3 ? 'active' : ''}`}

                    onClick={() => this.setState({ type: 3 })}

                >
                    Single Ticker
                </button>
                <span style={{ color: "white" }}>x</span>
                <button
                    type="button"
                    className={`btn btn-md btn-primary ${type === 4 ? 'active' : ''}`}

                    onClick={() => this.setState({ type: 4 })}

                >
                    Technical Analisis
                </button>
                <span style={{ color: "white" }}>x</span>
                <button
                    type="button"
                    className={`btn btn-md btn-primary ${type === 5 ? 'active' : ''}`}

                    onClick={() => this.setState({ type: 5 })}

                >
                    Multi Ticker
                </button>
            </Fragment>

        )
    }

    render() {
        return (
            <div className="modal show " tabindex="1" role="dialog" style={{ display: "block" }}>
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Widget</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.renderChooseType()}
                            < hr />

                            {this.renderSettings()}


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Add</button>
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


