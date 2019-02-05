import React, { Component } from "react";

class MarketOverview extends Component {
    constructor(props) {
        super(props)
        this.iframeId = Math.random()
    }
    componentWillMount = () => {
      this.setState({toRefresh: ''})
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({toRefresh: new Date()})
    }
    
    

    render() {
        const styleDiv = {
            width: "100%",
            height: "calc(100% - 20px)",
            position: "absolute",
            backgroundColor: "#fff"
        }

        let settings = {
            "symbols": this.props.symbols,
            "width": "100%", "height": 180, "utm_source": "localhost", "utm_medium": "widget_new", "utm_campaign": "tickers"
        }

        let src = 'https://s.tradingview.com/embed-widget/tickers/?locale=en#' +
            encodeURIComponent(JSON.stringify(settings))

        console.log(src)

        return (
            <React.Fragment>

                <iframe
                    style={styleDiv}
                    scrolling="yes"
                    allowtransparency="true"
                    frameBorder="0"
                    title={this.iframeId}
                    src={src}
                    key={'widget-' + this.state.toRefresh}>
                </iframe>
            </React.Fragment>
        )
    }
}

export default MarketOverview;