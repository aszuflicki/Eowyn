import React, { Component, Fragment } from 'react'
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import CryptoMarketOverview from './CryptoMarketOveriew.component'
import MarketOverview from './MarketOveriew.component'
import SingleTicker from './SingleTicker.component'
import TechnicalAnalisis from './TechnicalAnalisis.component'
import Ticker from './Ticker.component'

export default class Widget extends Component {

    render() {
        let { widget, type, settings, isEditMode } = this.props
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
                                            onClick={() => {
                                                let { layout } = this.props
                                                layout = layout.filter((el) => el.i !== widget.i)
                                                this.props.updateLayout([layout])
                                                setTimeout(() => this.props.getLayout(), 100)
                                            }}
                                        ></i>
                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div style={{
                                        fontSize: "4rem", margin: 0, position: "absolute", top: "50%", left: "20%",
                                        transform: "translate(-50%, -50%)"
                                    }}>
                                        <i className="fas fa-cog"
                                            onClick={() => { this.props.updateState({type, settings}, true) }}></i>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : ''}
                {getWidgets(type, settings)} 
                
            </Fragment>
        )
    }
}

const getWidgets = (i, settings, isEditMode) => {
    switch (i) {
        case 0:
            return (
                <Fragment>
                    {isEditMode ?
                        'Edit mode' : ''}
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
                <TechnicalAnalisis
                    symbol={settings.symbol.value} />
            )
        case 5:
            return (
                <Ticker
                    symbols={settings} />
            )
        default:
            return <div> Ooopss...</div>

    }
}