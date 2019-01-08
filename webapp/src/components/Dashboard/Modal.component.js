import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import AutoSuggestions, { symbols } from './Autosuggestion.component'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';

library.add(faEnvelope, faTimes);

class AddWidgetModal extends Component {

    constructor(props) {
        super(props)
        // this.handleClickTabAutoSuggest = this.handleClickTabAutoSuggest.bind(this)
    }

    componentWillMount() {
        this.setState({
            type: 0,
            settings: '',
            symbol: [],
            tabs: [
                {
                    name: 'New tab',
                    symbols: [{}, {}]

                },
                {
                    name: 'New tab1',
                    symbols: []
                }
            ],
            tabActive: 0,
            multiTicker: [],
            err: ''

        })
    }

    renderSettingsForChartView() {
        return (
            <Fragment>
                <div class="row mb-3">
                    <div class="col-6">
                        <Select
                            options={symbols.map(el => ({
                                value: el.symbol,
                                label: (
                                    <Fragment>
                                        <b>{el.name}</b> {'\u00A0'}
                                        {el.desc}
                                        {'\u00A0'}
                                        {'\u00A0'}
                                        {'\u00A0'}
                                        <i>{el.type}</i>
                                    </Fragment>
                                )
                            }))}
                            onChange={(e) => {
                                this.setState({ symbol: e })
                            }}
                            value={this.state.symbol}
                        />
                    </div>
                </div>
            </Fragment >

        )
    }

    renderSettingsForCrypoMarketOverview() {
        return (
            <Fragment>
                <p>No settings available for this widget</p>
            </Fragment>

        )
    }

    renderNavItems() {
        return (
            <ul className="nav nav-tabs">
                {this.state.tabs.map((tab, index) => {
                    return (
                        <li className="nav-item" key={index + 'nav-tabs'}>
                            <a
                                className={`nav-link ${this.state.tabActive == index ? 'active' : ''}`}
                                onClick={() => this.setState({ tabActive: index })}
                            >
                                {tab.name}
                                <span
                                    className="fas fa-igloo"
                                    style={{ fontSize: "12px", width: '7px', height: '10px' }}

                                ></span>
                                <FontAwesomeIcon
                                    icon="times"
                                    onClick={() => {
                                        let { tabs, tabActive } = this.state
                                        tabs = tabs.filter((el, i) => index !== i)
                                        if (tabActive >= index) tabActive = tabActive - 1
                                        

                                        this.setState({ tabs })
                                        setTimeout(() => this.setState({ tabActive }), 50)
                                    }}
                                />
                            </a>
                        </li>
                    )
                })
                }

                <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                        const { tabs } = this.state
                        this.setState({
                            tabs: [...tabs, { name: 'New Tab', symbols: [] }],
                            tabActive: tabs.length
                        })
                    }}
                >
                    +
                </button>

            </ul >
        )
    }

    handleClickTabAutoSuggest({ i, index }) {
        console.log(i + " " + index)
        // console.log(this.state)
        let { tabs } = this.state
        tabs[index].symbols = tabs[index].symbols.filter((el, filter_i) => i === filter_i)
        this.setState({ tabs })
    }

    handleChoosing({ i, index, value, symbol }) {
        console.log(i + " " + index + " " + value + " | " + symbol)
        // console.log(this.state)
        let { tabs } = this.state
        tabs[index].symbols[i] = { value, symbol }
        this.setState({ tabs })
    }

    renderTabs() {
        let { tabs } = this.state
        return (
            <div class="row mb-3">
                <div class="col-6">
                    <div className="tab-content" id="myTabContent">
                        {this.state.tabs.map((tab, index) => {
                            return (
                                <div
                                    className={`tab-pane fade show ${this.state.tabActive === index ? 'active' : ''}`}
                                    key={'tab' + index}
                                >
                                    <div className="input-group mb-3 mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"> Tab Title </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Username"
                                            value={tab.name}
                                            onChange={(e) => {
                                                tabs[index].name = e.target.value
                                                this.setState({ tabs })
                                            }}
                                        />
                                    </div>
                                    {this.state.tabs[index].symbols.length > 0 ? this.state.tabs[index].symbols.map((el, i) => {

                                        return (
                                            <Fragment>
                                                <div class="row mb-3">
                                                    <div class="col-10">
                                                        <Select
                                                            options={symbols.map(el => ({
                                                                value: el.symbol,
                                                                label: (
                                                                    <Fragment>
                                                                        <b>{el.name}</b> {'\u00A0'}
                                                                        {el.desc}
                                                                        {'\u00A0'}
                                                                        {'\u00A0'}
                                                                        {'\u00A0'}
                                                                        <i>{el.type}</i>
                                                                    </Fragment>
                                                                )
                                                            }))}
                                                            onChange={(e) => {
                                                                tabs[index].symbols[i] = e
                                                                this.setState({ tabs })
                                                            }}
                                                            value={this.state.tabs[index].symbols[i]}
                                                        />
                                                    </div>
                                                    <div class="col-2">
                                                        <button type="button" class="btn btn-primary btn-sm"
                                                            onClick={() => {
                                                                let { tabs } = this.state
                                                                tabs[index].symbols = tabs[index].symbols.filter((el, filter_i) => i !== filter_i)
                                                                this.setState({ tabs })
                                                                console.log(this.state.tabs)
                                                            }}
                                                        >Remove</button>
                                                    </div>

                                                </div>
                                            </Fragment>
                                        )
                                    }) :
                                        <p>No symbols added for his tab</p>
                                    }
                                    <button type="button" className="btn btn-secondary"
                                        onClick={() => {
                                            tabs[index].symbols.push({})
                                            this.setState({ tabs })
                                        }}
                                    >
                                        Add
                                </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    renderSettingsForMarketOverview() {
        return (
            <Fragment>
                {this.renderNavItems()}
                {this.renderTabs()}
            </Fragment>
        )
    }

    renderSettingsForMultiTicker() {
        let { multiTicker } = this.state
        return (
            <Fragment>
                <p>Multiticker</p>
                {this.state.multiTicker.length > 0 ? this.state.multiTicker.map((el, i) => {

                    return (
                        <Fragment>
                            <div class="row mb-3">
                                <div class="col-10">
                                    <Select
                                        options={symbols.map((el, i) => ({
                                            value: el.symbol,
                                            label: (
                                                <Fragment>
                                                    <b>{el.name}</b> {'\u00A0'}
                                                    {el.desc}
                                                    {'\u00A0'}
                                                    {'\u00A0'}
                                                    {'\u00A0'}
                                                    <i>{el.type}</i>
                                                </Fragment>
                                            )
                                        }))}
                                        onChange={(e) => {
                                            multiTicker[i] = e
                                            this.setState({ multiTicker })
                                        }}
                                        value={multiTicker[i]}
                                    />
                                </div>
                                <div class="col-2">
                                    <button type="button" class="btn btn-primary btn-sm"
                                        onClick={() => {
                                            multiTicker = multiTicker.filter((el, filter_i) => i !== filter_i)
                                            this.setState({ multiTicker })
                                        }}
                                    >Remove</button>
                                </div>
                            </div>
                        </Fragment>
                    )
                }) :
                    <p>No symbols added</p>
                }
                <button type="button" className="btn btn-secondary"
                    onClick={() => {
                        multiTicker.push({})
                        this.setState({ multiTicker })
                    }}
                >
                    Add
             </button>
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
                        {this.renderSettingsForMultiTicker()}
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

    validate() {
        switch (this.state.type) {
            case 0:
                if (!Array.isArray(this.state.symbol)) {
                    this.props.addWidget(0, {
                        symbol: this.state.symbol
                    })
                } else {
                    this.setState({ err: 'Please fill input' })
                }
                return

            case 1:
                this.props.addWidget(1, {})
                return
            case 2:
                console.log(this.state.tabs.join())
                let { tabs } = this.state

                if (tabs.length === 0) {
                    this.setState({ err: 'Please add at least one tab' })
                }  else if (tabs.filter(el => el.name === '').length > 0) {
                    this.setState({ err: 'All tabs should be named' })
                }else if (tabs.filter(el => el.symbols.length === 0).length > 0) {
                    this.setState({ err: 'All tabs should containe at least one symbol' })
                }else if (tabs
                    .filter(el => el.symbols.filter(el => el.value == null).length >  0)
                    .length > 0) {
                    this.setState({ err: 'All fields should be filled' })
                }else if (tabs.filter(el => el.symbols.length === 0).length > 0) {
                    this.setState({ err: 'All tabs should containe at least one symbol' })
                } else {
                    this.props.addWidget(5, {
                        symbols: this.state.multiTicker.map(el => el.value)
                    })
                }
                return
            case 3:
                console.log()
                if (!Array.isArray(this.state.symbol)) {
                    this.props.addWidget(3, {
                        symbol: this.state.symbol
                    })
                } else {
                    this.setState({ err: 'Please fill input' })
                }
                return
            case 4:
                console.log()
                if (!Array.isArray(this.state.symbol)) {
                    this.props.addWidget(4, {
                        symbol: this.state.symbol
                    })
                } else {
                    this.setState({ err: 'Please fill input' })
                }
                return
            case 5:
                console.log(this.state.multiTicker)

                if (this.state.multiTicker.length === 0) {
                    this.setState({ err: 'Please add at least one symbol' })
                } else if (this.state.multiTicker.filter(el => el.value == null).length > 0) {
                    this.setState({ err: 'Please fill all inputs or delete additional' })
                } else {
                    this.props.addWidget(5, {
                        tabs: tabs.map(el => ({name: el.name, symbols: el.symbols.map(el => el.value)}))
                    })
                }
                return
        }
    }

    render() {
        return (
            <div className="modal show " tabIndex="1" role="dialog" style={{ display: "block" }}>
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Widget</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                onClick={() => this.props.onClose()}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            {this.renderChooseType()}
                            < hr />
                            {this.state.err.length > 0 ?
                                <div class="alert alert-danger" role="alert">
                                    {this.state.err}
                                </div> : ''}
                            {this.renderSettings()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                onClick={() => this.props.onClose()}
                            >Close</button>
                            <button type="button" className="btn btn-primary"
                                onClick={() => this.validate()}
                            >Add</button>
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


