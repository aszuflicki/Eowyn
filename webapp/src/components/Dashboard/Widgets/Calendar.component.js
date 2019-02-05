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

        let src = 'https://s.tradingview.com/embed-widget/events/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22importanceFilter%22%3A%22-1%2C0%2C1%22%2C%22utm_source%22%3A%22%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22events%22%7D'

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