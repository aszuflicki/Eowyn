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

        return (
            <React.Fragment>
                
                <iframe 
                style={styleDiv}
                scrolling="yes" 
                allowtransparency="false" 
                frameBorder="0" 
                title={this.iframeId}
                src="https://s.tradingview.com/embed-widget/market-overview/?locale=pl#%7B%22showChart%22%3Afalse%2C%22largeChartUrl%22%3A%22%22%2C%22width%22%3A%22400%22%2C%22height%22%3A%22600%22%2C%22plotLineColorGrowing%22%3A%22rgba(60%2C%20188%2C%20152%2C%201)%22%2C%22plotLineColorFalling%22%3A%22rgba(255%2C%2074%2C%20104%2C%201)%22%2C%22gridLineColor%22%3A%22rgba(233%2C%20233%2C%20234%2C%201)%22%2C%22scaleFontColor%22%3A%22rgba(214%2C%20216%2C%20224%2C%201)%22%2C%22belowLineFillColorGrowing%22%3A%22rgba(60%2C%20188%2C%20152%2C%200.05)%22%2C%22belowLineFillColorFalling%22%3A%22rgba(255%2C%2074%2C%20104%2C%200.05)%22%2C%22symbolActiveColor%22%3A%22rgba(242%2C%20250%2C%20254%2C%201)%22%2C%22tabs%22%3A%5B%7B%22title%22%3A%22Indeksssy%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22INDEX%3ASPX%22%2C%22d%22%3A%22S%26P%20500%22%7D%2C%7B%22s%22%3A%22INDEX%3AIUXX%22%2C%22d%22%3A%22Nasdaq%20100%22%7D%2C%7B%22s%22%3A%22INDEX%3ADOWI%22%2C%22d%22%3A%22Dow%2030%22%7D%2C%7B%22s%22%3A%22INDEX%3ANKY%22%2C%22d%22%3A%22Nikkei%20225%22%7D%2C%7B%22s%22%3A%22INDEX%3ADAX%22%2C%22d%22%3A%22DAX%20Index%22%7D%2C%7B%22s%22%3A%22OANDA%3AUK100GBP%22%2C%22d%22%3A%22FTSE%20100%22%7D%5D%2C%22originalTitle%22%3A%22Indices%22%7D%2C%7B%22title%22%3A%22Towary%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CME_MINI%3AES1!%22%2C%22d%22%3A%22E-Mini%20S%26P%22%7D%2C%7B%22s%22%3A%22CME%3AE61!%22%2C%22d%22%3A%22Euro%22%7D%2C%7B%22s%22%3A%22COMEX%3AGC1!%22%2C%22d%22%3A%22Gold%22%7D%2C%7B%22s%22%3A%22NYMEX%3ACL1!%22%2C%22d%22%3A%22Crude%20Oil%22%7D%2C%7B%22s%22%3A%22NYMEX%3ANG1!%22%2C%22d%22%3A%22Natural%20Gas%22%7D%2C%7B%22s%22%3A%22CBOT%3AZC1!%22%2C%22d%22%3A%22Corn%22%7D%5D%2C%22originalTitle%22%3A%22Commodities%22%7D%2C%7B%22title%22%3A%22Obligacje%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CME%3AGE1!%22%2C%22d%22%3A%22Eurodollar%22%7D%2C%7B%22s%22%3A%22CBOT%3AZB1!%22%2C%22d%22%3A%22T-Bond%22%7D%2C%7B%22s%22%3A%22CBOT%3AUD1!%22%2C%22d%22%3A%22Ultra%20T-Bond%22%7D%2C%7B%22s%22%3A%22EUREX%3AGG1!%22%2C%22d%22%3A%22Euro%20Bund%22%7D%2C%7B%22s%22%3A%22EUREX%3AII1!%22%2C%22d%22%3A%22Euro%20BTP%22%7D%2C%7B%22s%22%3A%22EUREX%3AHR1!%22%2C%22d%22%3A%22Euro%20BOBL%22%7D%5D%2C%22originalTitle%22%3A%22Bonds%22%7D%2C%7B%22title%22%3A%22Forex%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FX%3AEURUSD%22%7D%2C%7B%22s%22%3A%22FX%3AGBPUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDJPY%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCHF%22%7D%2C%7B%22s%22%3A%22FX%3AAUDUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCAD%22%7D%5D%2C%22originalTitle%22%3A%22Forex%22%7D%5D%2C%22utm_source%22%3A%22localhost%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22market-overview%22%7D">
                </iframe>
            </React.Fragment>
        )
    }
}

export default MarketOverview;