import React, { Component } from "react";

class MarketOverview extends Component {


    render() {
        const styleDiv = {
            width: "100%",
            height: "calc(100% - 20px)",
            position: "absolute",
            "background-color": "#fff"
          }

        return (
            <React.Fragment>
                
                <iframe 
                style={styleDiv}
                scrolling="yes" 
                allowtransparency="false" 
                frameborder="0" 
                src="https%3A%2F%2Fs.tradingview.com%2Fembed-widget%2Fcrypto-mkt-screener%2F%3Flocale%3Den%23%7B%22width%22%3A100%25%2C%22height%22%3A100%25%2C%22defaultColumn%22%3A%22overview%22%2C%22screener_type%22%3A%22crypto_mkt%22%2C%22displayCurrency%22%3A%22USD%22%2C%22market%22%3A%22crypto%22%2C%22enableScrolling%22%3Atrue%2C%22utm_source%22%3A%22localhost%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22cryptomktscreener%22%7D">
                </iframe>
            </React.Fragment>
        )
    }
}

export default MarketOverview;