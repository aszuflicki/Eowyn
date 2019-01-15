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
        let tabs = null
        // [
        //     {
        //         title: "Indeksssy",
        //         symbols: [{ s: "INDEX:SPX", d: "S&P 500" }, { s: "INDEX:IUXX", d: "Nasdaq 100" }]
        //     },
        //     {
        //         title: "Towary",
        //         symbols: [{ s: "CME_MINI:ES1!", d: "E-Mini S&P" }, { s: "CME:E61!", d: "Euro" }]
        //     }]
            tabs = this.props.settings.tabs
            tabs = JSON.stringify({tabs}) + ""
            tabs = tabs.substring(1, tabs.length-1)
            console.log(tabs)


        let src = "https://s.tradingview.com/embed-widget/market-overview/?locale=en#"
            + encodeURIComponent(`{"showChart":false,"largeChartUrl":"","width":"400","height":"600","plotLineColorGrowing":"rgba(60, 188, 152, 1)","plotLineColorFalling":"rgba(255, 74, 104, 1)","gridLineColor":"rgba(233, 233, 234, 1)","scaleFontColor":"rgba(214, 216, 224, 1)","belowLineFillColorGrowing":"rgba(60, 188, 152, 0.05)","belowLineFillColorFalling":"rgba(255, 74, 104, 0.05)","symbolActiveColor":"rgba(242, 250, 254, 1)",`)
            + encodeURIComponent(tabs+ ',')
            // + encodeURIComponent(`"tabs":[{"title":"Indeksssy","symbols":[{"s":"INDEX:SPX"}]},{"title":"Towary","symbols":[{"s":"CME_MINI:ES1!","d":"E-Mini S&P"}]}],`)
            + encodeURIComponent(`"utm_source":"localhost","utm_medium":"widget_new","utm_campaign":"market-overview"}`)
console.log(src)
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