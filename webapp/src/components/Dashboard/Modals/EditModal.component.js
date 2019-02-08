import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { symbols } from './Autosuggestion.component'
import Select from 'react-select';
import { toggleEditModal } from "../../../actions/Dashboard.actions";
import { Input, Row, Col, Card, CardTitle, Button, Autocomplete, Tabs, Tab } from 'react-materialize'
import ChooseTypeButtons from './Fragments/ChooseTypeButtons'
import { updateSettings, updateLayout, getLayout, getSettings } from '../../../actions/Dashboard.actions'
import M from 'materialize-css';

let autocompleteSymbols = {}

symbols.forEach(symbol => {
    autocompleteSymbols[symbol.name] = null;
})

class AddWidgetModal extends Component {

    componentWillMount() {
        this.setState({
            type: this.props.settings[this.props.editedWidget].type,
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
        switch (this.props.settings[this.props.editedWidget].type) {
            case 0:
                break
            case 1:
                this.setState({
                    symbol: [{
                        label: this.props.settings[this.props.editedWidget].settings.value,
                        value: this.props.settings[this.props.editedWidget].settings.value
                    }]
                })
                break
            case 2:
                let tabs = this.props.settings[this.props.editedWidget].settings.tabs.map(tab => ({
                    name: tab.title,
                    symbols: tab.symbols.map(symbol => ({
                        value: symbol.s,
                        label: symbol.d
                    }))
                }))
                this.setState({ tabs })

                break
            case 3:
                break
            case 4:

                break
            case 5:
                this.setState({ multiTicker: this.props.settings[this.props.editedWidget].settings.map(el => ({ value: el.proName, label: el.title })) })
                break

            case 6:
                const { display, orderBy, category, country, keyphrase } = this.props.settings[this.props.editedWidget].settings
                this.setState({
                    display,
                    category,
                    keyphrase,
                    orderBy,
                    country
                })
                break
        }
        console.log(this.props.settings[this.props.editedWidget])
    }
    componentDidMount = () => {
        setTimeout(() => {
            const elems = document.querySelectorAll('.tabs');
            let instances = M.Tabs.init(elems, {});
        }, 100);
        setTimeout(() => {
            let elems = document.querySelectorAll('.chips');
            const instances = M.Chips.init(elems, {
                placeholder: 'Enter a keyphrase',
                secondaryPlaceholder: '+Keyphrase',
                data: this.state.keyphrase.map(el => ({ tag: el }))
            });
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
                                        <Button style={{ marginTop: "25px" }} onClick={() => this.setState({ tabs, tabActive: index })}>Change</Button>
                                    </Col>
                                    {tabs.length > 1 ?
                                        <Col s={3} ><Button style={{ marginTop: "25px" }} className="red right"
                                            onClick={() => {
                                                tabs = tabs.filter((el, f_index) => index != f_index)
                                                this.setState({ tabs, tabActive: 0 })
                                            }}
                                        >Remove tab</Button></Col> : ''}

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

    renderSettingsForNewsFeed() {
        console.log(this.state)
        return (
            <Fragment>
                <h5>Display</h5>

                <Row>
                    <Input name='group1' type='checkbox' value='headlines' label='Top headlines'
                        checked={this.state.display == 0}
                        onClick={(...args) => this.setState({ display: 0 })} />
                    <Input name='group1' type='checkbox' value='everything' label='Everything'
                        checked={this.state.display == 1}
                        onClick={(...args) => this.setState({ display: 1 })} />
                </Row>
                {this.state.display == 0 ? (
                    <Fragment>
                        <h5>From category</h5>
                        <Row>
                            <Input name='group2' type='checkbox' value='relevancy' label='Business'
                                onClick={(...args) => this.setState({ category: 'relevancy' })}
                                checked={this.state.category == 'relevancy'} />
                            <Input name='group2' type='checkbox' value='entertainment' label='Entertainment'
                                onClick={(...args) => this.setState({ category: 'entertainment' })}
                                checked={this.state.category == 'entertainment'} />
                            <Input name='group2' type='checkbox' value='general' label='general'
                                onClick={(...args) => this.setState({ category: 'general' })}
                                checked={this.state.category == 'general'} />
                            <Input name='group2' type='checkbox' value='health' label='Health'
                                onClick={(...args) => this.setState({ category: 'health' })}
                                checked={this.state.category == 'health'} />
                            <Input name='group2' type='checkbox' value='science' label='Science'
                                onClick={(...args) => this.setState({ category: 'science' })}
                                checked={this.state.category == 'science'} />
                            <Input name='group2' type='checkbox' value='sports' label='Sports'
                                onClick={(...args) => this.setState({ category: 'sports' })}
                                checked={this.state.category == 'sports'} />
                            <Input name='group2' type='checkbox' value='technology' label='Technology'
                                onClick={(...args) => this.setState({ category: 'technology' })}
                                checked={this.state.category == 'technology'} />
                            <Input name='group2' type='checkbox' value='all' label='All'
                                onClick={(...args) => this.setState({ category: 'all' })}
                                checked={this.state.category == 'all'} />

                        </Row>
                        <h5>Country</h5>
                        <Row>
                            <Autocomplete
                                title='Country'
                                value={this.state.country}
                                onAutocomplete={(country) => this.setState({ country })}
                                data={
                                    {
                                        'United Arab Emirates': null,
                                        'Argentina': null,
                                        'Austria': null,
                                        'Australia': null,
                                        'Belgium': null,
                                        'Bulgaria': null,
                                        'Brazil': null,
                                        'Canada': null,
                                        'Switzerland': null,
                                        'China': null,
                                        'Colombia': null,
                                        'Cuba': null,
                                        'Czechia': null,
                                        'Germany': null,
                                        'Egypt': null,
                                        'France': null,
                                        'United Kingdom': null,
                                        'Hong Kong': null,
                                        'Hungary': null,
                                        'Indonesia': null,
                                        'Ireland': null,
                                        'Israel': null,
                                        'India': null,
                                        'Italy': null,
                                        'Japan': null,
                                        'Korea, Republic of': null,
                                        'Lithuania': null,
                                        'Latvia': null,
                                        'Morocco': null,
                                        'Mexico': null,
                                        'Malaysia': null,
                                        'Nigeria': null,
                                        'Netherlands': null,
                                        'Norway': null,
                                        'New Zealand': null,
                                        'Philippines': null,
                                        'Poland': null,
                                        'Portugal': null,
                                        'Romania': null,
                                        'Serbia': null,
                                        'Russian Federation': null,
                                        'Saudi Arabia': null,
                                        'Singapore': null,
                                        'Slovenia': null,
                                        'Slovakia': null,
                                        'Thailand': null,
                                        'Turkey': null,
                                        'Taiwan': null,
                                        'Ukraine': null,
                                        'United States': null,
                                        'Venezuela': null,
                                        'South Africa': null,
                                    }
                                }
                            />
                        </Row>
                    </Fragment>
                ) : (
                        <Fragment>
                            <h5>Order by</h5>
                            <Row>
                                <Input name='group2' type='checkbox' value='relevancy' label='Relevancy'
                                    onClick={(...args) => this.setState({ orderBy: 'relevancy' })}
                                    checked={this.state.orderBy == 'relevancy'} />
                                <Input name='group2' type='checkbox' value='popularity' label='Popularity'
                                    onClick={(...args) => this.setState({ orderBy: 'popularity' })}
                                    checked={this.state.orderBy == 'popularity'} />
                                <Input name='group2' type='checkbox' value='publishedAt' label='Date'
                                    onClick={(...args) => this.setState({ orderBy: 'publishedAt' })}
                                    checked={this.state.orderBy == 'publishedAt'} />
                            </Row>
                            <h5>Keywords</h5>
                            <Row>
                                <div class="chips">
                                    <input id="tags"
                                        onChipAdd={(...args) => console.log(args)}
                                        error={this.state.err.tagsa}
                                    />
                                </div>
                            </Row>
                        </Fragment>
                    )}
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
                        {this.renderSettingsForCrypoMarketOverview()}
                    </Fragment>
                )
            case 5:
                return (
                    <Fragment>
                        {this.renderSettingsForMultiTicker()}
                    </Fragment>
                )
            case 6:
                return (
                    <Fragment>
                        {this.renderSettingsForNewsFeed()}
                    </Fragment>
                )
            default: return 'Ooopsss...'
        }
    }

    addWidget(type, widgetSettings) {
        let { settings, editedWidget } = this.props

        switch (type) {
            case 0:
                settings[editedWidget].settings.symbol.value = widgetSettings.symbol.value
                this.props.updateSettings(settings)
                this.props.toggleEditModal(false);
                break
            case 1:
                this.props.toggleEditModal(false);
                break
            case 2:
                settings[editedWidget] = {
                    type: 2,
                    settings: widgetSettings
                }

                this.props.updateSettings(settings)
                this.props.toggleEditModal(false);
                break
            case 3:
                // layout[tabActive].layout[0].h = 3
                // layout[tabActive].layout[0].w = 3
                // settings[newId] = {
                //     type: 3,
                //     settings: {
                //         symbol: {
                //             value: widgetSettings.symbol.value
                //         }
                //     }
                // }
                // this.props.updateSettings(settings)
                // this.props.updateLayout(layout)
                // this.props.toggleAddModal(false);
                return
            case 4:
                this.props.toggleEditModal(false);
                break
            case 5:
                settings[editedWidget].type = -1
                this.props.updateSettings(settings)
                getSettings()
                settings[editedWidget].type = 5
                settings[editedWidget].settings = widgetSettings
                    .map(el => ({
                        proName: el.value,
                        title: typeof el.label == 'object' ? el.label.props.children[3] : el.label
                    }))
                setTimeout(() => this.props.updateSettings(settings), 2200)
                this.props.toggleEditModal(false);
                break
            case 6:
                settings[editedWidget].settings = widgetSettings
                setTimeout(() => this.props.updateSettings(settings), 200)
                this.props.toggleEditModal(false);
                break
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
                                d: typeof symbol.label == 'object' ? symbol.label.props.children[3] : symbol.label
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
                this.addWidget(4, {})
                break
            case 5:
                console.log(this.state.multiTicker)

                if (this.state.multiTicker.length === 0) {
                    this.setState({ err: 'Please add at least one symbol' })
                } else if (this.state.multiTicker.filter(el => el.value == null).length > 0) {
                    this.setState({ err: 'Please fill all inputs or delete additional' })
                } else {
                    this.addWidget(5, this.state.multiTicker)
                }
                break
            case 6:
                const { display, orderBy, category, country } = this.state
                let keyphrase = []
                if (display === 0) {
                    if (this.state.country.length < 3) {
                        this.setState({ err: 'Please fill all inputs' })
                        return
                    }
                    
                } else if (this.state.display === 1) {
                    const elem = document.querySelector('.chips');
                    keyphrase = M.Chips.getInstance(elem).chipsData.map(el => el.tag)
                    if (keyphrase.length < 1) {
                        this.setState({ err: 'Please add at least one keyphase' })
                        return
                    }
                }
                this.addWidget(6, { display, orderBy, category, country, keyphrase })
                break
            default: return 'Ooopsss...'

        }
    }

    render() {
        const { toggleEditModal, editedWidget } = this.props
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
                                >Edit</a>
                                <a className="red-text"
                                    onClick={() => toggleEditModal(false)}
                                > Cancel</a></div>]}
                            title="Edit widget" >

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
        toggleEditModal: (isActive) => dispatch(toggleEditModal(isActive)),
        updateLayout: (...args) => dispatch(updateLayout(...args)),
        updateSettings: (...args) => dispatch(updateSettings(...args)),
        getLayout: () => dispatch(getLayout()),
        getSettings: () => dispatch(getSettings())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddWidgetModal);





