import React, { Component } from "react";

class MarketOverview extends Component {
    constructor(props) {
        super(props)
        this.iframeId = Math.random()
    }


    render() {
        const styleDiv = {
            width: "100%",
            height: "calc(100%)",
            backgroundColor: "#fff"
          }

        return (
            <React.Fragment>
                <iframe 
                style={styleDiv}
                scrolling="yes" 
                allowtransparency="false" 
                frameBorder="0" 
                title={this.iframeId}
                src="https://s.tradingview.com/embed-widget/crypto-mkt-screener/?locale=en#%7B%22width%22%3A1000%2C%22height%22%3A490%2C%22defaultColumn%22%3A%22overview%22%2C%22screener_type%22%3A%22crypto_mkt%22%2C%22displayCurrency%22%3A%22USD%22%2C%22market%22%3A%22crypto%22%2C%22enableScrolling%22%3Atrue%2C%22utm_source%22%3A%22localhost%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22cryptomktscreener%22%7D">
                </iframe>
            </React.Fragment>
        )
    }
}

export default MarketOverview;