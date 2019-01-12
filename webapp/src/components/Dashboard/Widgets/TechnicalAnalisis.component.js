import React, { Component } from "react";

class TechnicalAnalisis extends Component {
    constructor(props) {
        super(props)
        this.iframeId = Math.random()
    }

    render() {
        const styleDiv = {
            width: "100%",
            height: "calc(100% - 20px)",
            position: "absolute",
            backgroundColor: "#fff"
        }

        let src = 'https://s.tradingview.com/embed-widget/technical-analysis/?locale=en#' +
            encodeURIComponent(`{"width":"100%","height":"100%","symbol":"${this.props.symbol || 'FX:EURUSD'}","interval":"1m","utm_source":"localhost","utm_medium":"widget_new","utm_campaign":"technical-analysis"}`)

        return (
            <React.Fragment>

                <iframe
                    style={styleDiv}
                    scrolling="yes"
                    allowtransparency="false"
                    frameBorder="0"
                    title={this.iframeId}
                    src={src}>
                </iframe>
            </React.Fragment>
        )
    }
}

export default TechnicalAnalisis;