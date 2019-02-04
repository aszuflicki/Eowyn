import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { symbols } from '../Autosuggestion.component'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import { toggleAddModal } from "../../../actions/Dashboard.actions";
import { Input, Row, Col, Card, CardTitle, Button, Autocomplete, Tabs, Tab } from 'react-materialize'
import ChooseTypeButtons from './Fragments/ChooseTypeButtons'
import { updateSettings, updateLayout } from '../../../actions/Dashboard.actions'
import M from 'materialize-css';

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
    componentDidMount = () => {
        setTimeout(() => {
            const elems = document.querySelectorAll('.tabs');
            let instances = M.Tabs.init(elems, {});
        }, 100);
    }


    renderSettingsForChartView() {
        return (
            <Fragment>
                <Row>
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
                </Row>


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
        return;
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
        let { tabs, tabActive } = this.state
        console.log(tabs)
        return (
            <div style={{ position: "relative" }}>
                <Button style={{ position: "absolute", right: "20px", zIndex: 10000, top: "5px" }}
                    onClick={() => {
                        tabs.push({ name: 'New tab', symbols: [] })
                        this.setState({ tabs, tabActive: tabs.length - 1 })
                        console.log('xD')
                    }}
                >Add tab</Button>
                <Tabs className='tab-demo z-depth-1'>
                    {this.state.tabs.map((tab, index) => {
                        let tabName = tab.name + "";
                        return (
                            <Tab title={tab.name} active={index === tabActive} key={'tab' + index} onShow={(...args) => {
                                this.setState({ tabActive: index })
                                console.log(args)
                            }}>
                                <Row>
                                    <Input placeholder="Tab name" s={6} label="Tab name"
                                        defaultValue={tabName}
                                        onChange={(...args) => {
                                            tabs[index].name = args[1]
                                            tabName = args[1]
                                            console.log(tabName)
                                        }} />
                                    <Col s={3}>
                                        <Button style={{ marginTop: "25px" }} onClick={() => this.setState({ tabs })}>Change</Button>
                                    </Col>
                                    {tabs.length > 1 ? 
                                    <Col s={3} ><Button style={{ marginTop: "25px" }} className="red right"
                                        onClick={() => {
                                            tabs = tabs.filter((el, f_index) => index != f_index)
                                            this.setState({ tabs, tabActive: 0 })
                                        }}
                                    >Remove tab</Button></Col> :''}

                                </Row>
                                {tabs[index].symbols.length > 0 ? tabs[index].symbols.map((el, i) => {

                                    return (
                                        <Row>
                                            <Col s={8} >
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
                                            </Col>
                                            <Col s={3} >
                                                <div class="col-2">
                                                    <button type="button" class="btn btn-primary btn-sm"
                                                        onClick={() => {
                                                            let { tabs } = this.state
                                                            tabs[index].symbols = tabs[index].symbols.filter((el, filter_i) => i !== filter_i)
                                                            this.setState({ tabs, tabActive: index })

                                                        }}
                                                    >Remove</button>
                                                </div>

                                            </Col>
                                        </Row>
                                    )
                                }) :
                                    <p>No symbols added for his tab</p>
                                }
                                <button type="button" className="btn btn-secondary"
                                    onClick={() => {
                                        tabs[index].symbols.push({})
                                        this.setState({ tabs, tabActive: index })
                                    }}
                                >
                                    Add
                                </button>
                            </Tab>
                        )
                    })}
                </Tabs>
            </div>
        )
    }

    renderSettingsForMarketOverview() {
        return (
            <div class="row">
                {this.renderNavItems()}
                {this.renderTabs()}
            </div>
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
        tabActive = Object.keys(layout)[tabActive]
        let newLayout = layout[tabActive].layout

        let newId = Math.max(0, ...Object.keys(settings)) + 1

        newLayout = [
            {
                h: 10,
                w: 6,
                i: newId + "",
                x: 0,
                y: 0
            },
            ...newLayout.map(el => ({
                ...el, y: el.y + 10
            })),]
        layout[tabActive].layout = newLayout

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


                return
            case 1:
                settings[newId] = {
                    type: 1,
                    settings: widgetSettings
                }

                this.props.updateSettings(settings)
                this.props.updateLayout(layout)
                this.props.toggleAddModal(false);
                return
            case 2:
                settings[newId] = {
                    type: 2,
                    settings: widgetSettings
                }

                this.props.updateSettings(settings)
                this.props.updateLayout(layout)
                this.props.toggleAddModal(false);
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
                    this.setState({ err: 'Please select symbol' })
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
        console.log(this.props)
        return (
            <div style={{ position: "absolute", top: "112px", width: "100vw", zIndex: "1000", backgroundColor: "rgb(121,121,121,.7)", height: 'calc(100vh - 80px)' }}>
                <Row style={{ position: "absolute", zIndex: "10000", width: "100vw" }}>
                    <Col s={2}></Col>
                    <Col s={8}>
                        <Card header={<CardTitle waves='light' />}
                            actions={[<div className="right-align">
                                <a className="blue-text"
                                    onClick={() => this.validate()}
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
        updateLayout: (...args) => dispatch(updateLayout(...args)),
        updateSettings: (...args) => dispatch(updateSettings(...args))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddWidgetModal);


