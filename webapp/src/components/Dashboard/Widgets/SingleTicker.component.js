import React, { Component } from "react";

class MarketOverview extends Component {
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

        let src = 'https://s.tradingview.com/embed-widget/single-quote/?locale=en#' + 
        encodeURIComponent(`{"width":350,"symbol":"${this.props.symbol || 'FX:EURUSD'}","height":126,"utm_source":"www.tradingview.com","utm_medium":"widget_new","utm_campaign":"single-quote"}`)

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

export default MarketOverview;