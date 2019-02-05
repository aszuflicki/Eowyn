import React, { Component } from "react";

class MarketOverview extends Component {
    constructor(props) {
        super(props)
        this.iframeId = Math.random()
    }
    componentWillMount = () => {
        this.setState({ toRefresh: '' })
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({ toRefresh: new Date() })
    }

    render() {
        const styleDiv = {
            width: "100%",
            height: "calc(100% - 20px)",
            position: "absolute",
            backgroundColor: "#fff"
        }
        let tabs = null

        tabs = this.props.settings.tabs
        tabs = JSON.stringify({ tabs }) + ""
        tabs = tabs.substring(1, tabs.length - 1)


        let src = "https://s.tradingview.com/embed-widget/market-overview/?locale=en#"
            + encodeURIComponent(`{"showChart":false,"largeChartUrl":"","width":"400","height":"600","plotLineColorGrowing":"rgba(60, 188, 152, 1)","plotLineColorFalling":"rgba(255, 74, 104, 1)","gridLineColor":"rgba(233, 233, 234, 1)","scaleFontColor":"rgba(214, 216, 224, 1)","belowLineFillColorGrowing":"rgba(60, 188, 152, 0.05)","belowLineFillColorFalling":"rgba(255, 74, 104, 0.05)","symbolActiveColor":"rgba(242, 250, 254, 1)",`)
            + encodeURIComponent(tabs + ',')
            + encodeURIComponent(`"utm_source":"localhost","utm_medium":"widget_new","utm_campaign":"market-overview"}`)

        return (
            <React.Fragment>

                <iframe
                    key={'widget-market-' + this.state.toRefresh}
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