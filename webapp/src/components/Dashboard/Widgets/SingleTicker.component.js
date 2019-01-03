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
                src="https://s.tradingview.com/embed-widget/single-quote/?locale=en#%7B%22width%22%3A350%2C%22symbol%22%3A%22FX%3AEURUSD%22%2C%22height%22%3A126%2C%22utm_source%22%3A%22www.tradingview.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22single-quote%22%7D">
                </iframe>
            </React.Fragment>
        )
    }
}

export default MarketOverview;