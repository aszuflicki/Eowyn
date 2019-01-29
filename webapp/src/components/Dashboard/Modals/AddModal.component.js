import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { symbols } from '../Autosuggestion.component'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import { toggleAddModal } from "../../../actions/Dashboard.actions";
import { CardPanel, Row, Col, Card, CardTitle, Button, Autocomplete, Tabs, Tab } from 'react-materialize'
import ChooseTypeButtons from './Fragments/ChooseTypeButtons'

library.add(faEnvelope, faTimes);

let autocompleteSymbols = {}

symbols.forEach(symbol => {
    autocompleteSymbols[symbol.name] = null;
})

class AddWidgetModal extends Component {

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
                <Row>
                    <div class="col-6">
                        <Autocomplete
                            title='Symbol'
                            data={autocompleteSymbols}
                            onAutocomplete={(value) => console.log(value)}
                        />
                    </div>
                </Row>

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
                {/* {this.renderNavItems()} */}
                {/* {this.renderTabs()} */}
                <Tabs className='tab-demo z-depth-1'>
                    <Tab title="Test 1">Test 1</Tab>
                    <Tab title="Test 2" active>Test 2</Tab>
                    <Tab title="Test 3">Test 3</Tab>
                    <Tab title="Test 4">Test 4</Tab>
                </Tabs>
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
            default: return 'Ooopsss...'
        }
    }

    addWidget(type, widgetSettings) {
        let { layout, settings, tabActive } = this.props
        layout = layout[tabActive].layout

        // let newId = Math.max(...this.props.layout[tabActive].layout.map(el => el.i)) + 1
        let newId = Math.max(0, ...Object.keys(settings)) + 1

        console.log(layout)
        layout = [
            {
                h: 10,
                w: 6,
                i: newId + "",
                x: 0,
                y: 0
            },
            ...layout.map(el => ({
                ...el, y: el.y + 10
            })),]

        switch (type) {
            case 0:
                settings[newId] = {
                    type: 0,
                    settings: {
                        symbol: {
                            value: widgetSettings.symbol.value
                        }
                    }
                }
                this.props.update(layout, settings)
                return
            case 1:
                settings[newId] = {
                    type: 1,
                    settings: widgetSettings
                }
                this.props.update(layout, settings)


                return
            case 2:
                settings[newId] = {
                    type: 2,
                    settings: widgetSettings
                }

                this.props.update(layout, settings)

                return
            case 3:
                layout[0].h = 3
                layout[0].w = 3
                settings[newId] = {
                    type: 3,
                    settings: {
                        symbol: {
                            value: widgetSettings.symbol.value
                        }
                    }
                }
                this.props.update(layout, settings)
                return
            case 4:
                layout[0].h = 11
                layout[0].w = 4
                settings[newId] = {
                    type: 4,
                    settings: {
                        symbol: {
                            value: widgetSettings.symbol.value
                        }
                    }
                }
                this.props.update(layout, settings)
                return
            case 5:
                settings[newId] = {
                    type: 5,
                    settings: widgetSettings.map(el => ({ proName: el.value, title: el.label.props.children[3] }))
                }
                this.props.update(layout, settings)
                return
        }

    }

    validate() {
        switch (this.state.type) {
            case 0:
                if (!Array.isArray(this.state.symbol)) {
                    this.addWidget(0, {
                        symbol: this.state.symbol
                    })
                } else {
                    this.setState({ err: 'Please fill input' })
                }
                return

            case 1:
                this.addWidget(1, {})
                return
            case 2:
                console.log(this.state.tabs.join())
                let { tabs } = this.state

                if (tabs.length === 0) {
                    this.setState({ err: 'Please add at least one tab' })
                } else if (tabs.filter(el => el.name === '').length > 0) {
                    this.setState({ err: 'All tabs should be named' })
                } else if (tabs.filter(el => el.symbols.length === 0).length > 0) {
                    this.setState({ err: 'All tabs should containe at least one symbol' })
                } else if (tabs
                    .filter(el => el.symbols.filter(el => el.value == null).length > 0)
                    .length > 0) {
                    this.setState({ err: 'All fields should be filled' })
                } else if (tabs.filter(el => el.symbols.length === 0).length > 0) {
                    this.setState({ err: 'All tabs should containe at least one symbol' })
                } else {
                    this.addWidget(2, {
                        tabs: tabs.map(tab => ({
                            title: tab.name,
                            symbols: tab.symbols.map(symbol => ({
                                s: symbol.value,
                                d: symbol.label.props.children[3]
                            }))
                        }))
                    })
                }
                return
            case 3:
                console.log()
                if (!Array.isArray(this.state.symbol)) {
                    this.addWidget(3, {
                        symbol: this.state.symbol
                    })
                } else {
                    this.setState({ err: 'Please fill input' })
                }
                return
            case 4:
                console.log()
                if (!Array.isArray(this.state.symbol)) {
                    this.addWidget(4, {
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
                    this.addWidget(5, this.state.multiTicker)
                }
                return
            default: return 'Ooopsss...'

        }
    }

    render() {
        const { toggleAddModal } = this.props
        return (
            <div style={{ position: "absolute", top: "112px", width: "100vw", zIndex: "1000", backgroundColor: "rgb(121,121,121,.7)", height: 'calc(100vh - 80px)' }}>
                <Row style={{ position: "absolute", zIndex: "10000", width: "100vw" }}>
                    <Col s={2}></Col>
                    <Col s={8}>
                        <Card header={<CardTitle waves='light' />}
                            actions={[<div className="right-align">
                                <a className="blue-text"
                                    onClick={() => { }}
                                >Add</a>
                                <a className="red-text"
                                    onClick={() => toggleAddModal(false)}
                                > Cancel</a></div>]}
                            title="Add widget" >
                            <ChooseTypeButtons
                                type={this.state.type}
                                setType={(type) => this.setState({ type })}
                            />
                            <div style={{ color: "white" }}>x</div>
                            {this.state.err.length > 0 ?
                                <div class="alert alert-danger" role="alert">
                                    {this.state.err}
                                </div> : ''}
                            {this.renderSettings()}
                        </Card>

                    </Col>
                    <Col s={2}></Col>
                </Row>
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
        toggleAddModal: (isActive) => dispatch(toggleAddModal(isActive)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddWidgetModal);


