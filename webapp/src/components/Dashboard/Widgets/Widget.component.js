import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import CryptoMarketOverview from './CryptoMarketOveriew.component'
import MarketOverview from './MarketOveriew.component'
import SingleTicker from './SingleTicker.component'
import EconomicCalendar from './Calendar.component'
import Ticker from './Ticker.component'
import NewsFeed from './NewsFeed.component'
import { updateLayout, updateSettings, getLayout, toggleEditModal } from '../../../actions/Dashboard.actions'

class Widget extends Component {

    componentWillMount = () => {
        this.setState({ counter: 0 })
    }


    onDelete() {
        let { settings, layout, i, updateLayout, updateSettings, getLayout } = this.props
        settings[i] = null;
        Object.keys(layout).forEach(key => {
            layout[key].layout = layout[key].layout.filter(el => el.i != i)
        })
        updateLayout(layout)
        updateSettings(settings)
        setTimeout(() => getLayout(), 200);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        // setTimeout(() => this.forceUpdate(), 500)
        // let { i, settings: settingsAll } = this.props
        // const { settings } = settingsAll[i]
        // this.setState({ counter: new Date() })
    }

    render() {
        let { i, isEditMode, settings: settingsAll } = this.props
        const { type, settings } = settingsAll[i]
        return (
            <Fragment>
                {isEditMode ? (
                    <div style={{ position: "absolute", width: "100%", height: "calc(100% - 20px)", backgroundColor: "rgb(239, 163, 29,0.6)", zIndex: "100000" }}>
                        <div className="row" style={{ height: "100%" }}>
                            <div className="col-md-6">
                                <div style={{
                                    fontSize: "4rem", margin: 0, position: "absolute", top: "50%", right: "20%",
                                    transform: "translate(-50%, -50%)"
                                }}>
                                    <i
                                        className="fas fa-trash-alt "
                                        onClick={() => this.onDelete()}
                                    ></i>
                                </div>

                            </div>
                            <div className="col-md-6">
                                <div style={{
                                    fontSize: "4rem", margin: 0, position: "absolute", top: "50%", left: "20%",
                                    transform: "translate(-50%, -50%)"
                                }}>
                                    <i className="fas fa-cog"
                                        onClick={() => {
                                            this.props.toggleEditModal(true, i)
                                        }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : ''}
                {getWidget(type, settings)}
            </Fragment>
        )
    }
}

const getWidget = (i, settings) => {
    switch (i) {
        case 0:
            return (
                <Fragment>
                    <TradingViewWidget
                        symbol={settings.symbol.value}
                        theme={Themes.DARK}
                        locale="pl"
                        autosize={true}
                    />
                </Fragment>
            )
        case 1:
            return (
                <CryptoMarketOverview />
            )
        case 2:
            return (
                <MarketOverview
                    settings={settings} />
            )
        case 3:
            return (
                <SingleTicker
                    symbol={settings.symbol.value} />
            )
        case 4:
            return (
                <EconomicCalendar />
            )
        case 5:
            return (
                <Ticker
                    symbols={settings} />
            )
        case 6:
            return (
                <NewsFeed
                    settings={settings} />
            )
        default:
            return <div> Ooopss...</div>

    }
}

function mapStateToProps(state) {
    return {
        ...state.dashboard,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateLayout: (...args) => dispatch(updateLayout(...args)),
        updateSettings: (...args) => dispatch(updateSettings(...args)),
        getLayout: () => dispatch(getLayout()),
        toggleEditModal: (isActive, i) => dispatch(toggleEditModal(isActive, i))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Widget)