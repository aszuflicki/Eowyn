import React, { Component, Fragment } from 'react'

class AutoSugestions extends Component {
  constructor(props) {
    super(props)
    this.symbol = React.createRef()
    // this.state.value = ''
  }

  componentWillMount() {
    this.setState({ value: '', choosen: '' })

  }

  handleChange() {
    let value = this.symbol.current.value

    if (value.length < this.state.value.length && this.state.chosen.length > 0){
      value = ''
      this.symbol.current.value = ''
    } 

    this.setState({ value, chosen: '' })
  }

  handleClick(el) {
    const { symbol: chosen, name, desc, type } = el
    this.symbol.current.value = name + "   " + desc + "     " + type
    this.setState({ chosen })
  }

  renderSugestionsItems(value) {
    const end = value.length - 1
    console.log('xdd')
    return symbolsForTradingView
      .filter(el =>
        el.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        el.desc.toLowerCase().indexOf(value.toLowerCase()) > -1
      )
      .slice(0, 5)
      .map(el => (
        <a
          style={{ width: "700px" }}
          class="dropdown-item"
          value={this.state.value}
          onClick={() => this.handleClick(el)}
        >
          <b>{el.name}</b> {'\u00A0'}
          {el.desc}
          <i style={{ position: "absolute", right: '25px' }}>{el.type}</i>
        </a>
      ))
  }

  renderSugestions(value) {
    console.log(value)

    if (value.length === 0 || this.state.chosen.length !== 0) return

    return (
      <div class="dropdown-menu show" aria-labelledby="dropdownMenuButton" x-placement="bottom-start" style={style}>
        {this.renderSugestionsItems(value)}
      </div>
    )

  }

  render() {

    console.log(this)

    return (
      <Fragment>
        <div class="form-group" style={{ position: "relative" }}>
          <label for="symbolInput">Symbol</label>
          <input
            type="text"
            class="form-control"
            id="symbolInput"
            placeholder="Enter symbol"
            ref={this.symbol}
            onChange={this.handleChange.bind(this)}
          />
          {this.renderSugestions(this.state.value)}
        </div>
      </Fragment>

    )
  }
}
const style = {
  position: "absolute",
  transform: "translate3d(0px, 62px, 0px)",
  top: "0px",
  left: "0px",
  willChange: "transform"
}

export default AutoSugestions

const symbolsForTradingView = [
  {
    symbol: "BITFINEX:BTCUSD",
    name: "BTCUSD",
    desc: "BITCOIN / DOLLAR",
    type: "crypto - Bitfinex"
  },
  {
    symbol: "COINBASE:BTCUSD",
    name: "BTCUSD",
    desc: "BTC/USD",
    type: "crypto - Coinbase"
  },
  {
    symbol: "BITMEX:XBTUSD",
    name: "XBTUSD",
    desc: "BITCOIN / US DOLLAR PERPETUAL INVERSE SWA",
    type: "crypto - BitMEX"
  },
  {
    symbol: "BITSTAMP:BTCUSD",
    name: "BTCUSD",
    desc: "BITCOIN / DOLLAR",
    type: "crypto - Bitstamp"
  },
  {
    symbol: "BINANCE:BTCUSDT",
    name: "BTCUSDT",
    desc: "BITCOIN / TETHERUS",
    type: "crypto - Binance"
  },
  {
    symbol: "BITFINEX:ETHUSD",
    name: "ETHUSD",
    desc: "ETHEREUM / DOLLAR",
    type: "crypto - Bitfinex"
  },
  {
    symbol: "BITFINEX:XRPUSD",
    name: "XRPUSD",
    desc: "RIPPLE / DOLLAR",
    type: "crypto - Bitfinex"
  },
  {
    symbol: "BITMEX:ETHUSD",
    name: "ETHUSD",
    desc: "ETHEREUM / US DOLLAR PERPETUAL QUANTO SWA",
    type: "crypto - BitMEX"
  },
  {
    symbol: "BITFLYER:BTCJPY",
    name: "BTCJPY",
    desc: "BITCOIN / YEN",
    type: "crypto - bitFlyer"
  },
  {
    symbol: "COINBASE:ETHUSD",
    name: "ETHUSD",
    desc: "ETH/USD",
    type: "crypto - Coinbase"
  },
  {
    symbol: "BITMEX:XBT",
    name: "XBT",
    desc: "BITCOIN / US DOLLAR INDEX",
    type: "crypto - BitMEX"
  },
  {
    symbol: "BITFINEX:BTCUSDSHORTS",
    name: "BTCUSDSHORTS",
    desc: "BTCUSD SHORTS",
    type: "crypto - Bitfinex"
  },
  {
    symbol: "BINANCE:ETHUSDT",
    name: "ETHUSDT",
    desc: "ETHEREUM / TETHERUS",
    type: "crypto - Binance"
  },
  {
    symbol: "BITFLYER:FXBTCJPY",
    name: "FXBTCJPY",
    desc: "FX BITCOIN / YEN",
    type: "crypto - bitFlyer"
  },
  {
    symbol: "BITFINEX:EOSUSD",
    name: "EOSUSD",
    desc: "EOS / DOLLAR",
    type: "crypto - Bitfinex"
  },
  {
    symbol: "COINBASE:LTCUSD",
    name: "LTCUSD",
    desc: "LTC/USD",
    type: "crypto - Coinbase"
  },
  {
    symbol: "BINANCE:TRXBTC",
    name: "TRXBTC",
    desc: "TRON / BITCOIN",
    type: "crypto - Binance"
  },
  {
    symbol: "BINANCE:XRPBTC",
    name: "XRPBTC",
    desc: "RIPPLE / BITCOIN",
    type: "crypto - Binance"
  },
  {
    symbol: "POLONIEX:BTCUSDT",
    name: "BTCUSDT",
    desc: "BITCOIN / TETHER USD",
    type: "crypto - Poloniex"
  },
  {
    symbol: "BITFINEX:LTCUSD",
    name: "LTCUSD",
    desc: "LITECOIN / DOLLAR",
    type: "crypto - Bitfinex"
  },
  {
    symbol: "BINANCE:ETHBTC",
    name: "ETHBTC",
    desc: "ETHEREUM / BITCOIN",
    type: "crypto - Binance"
  },
  {
    symbol: "KRAKEN:ETHUSD",
    name: "ETHUSD",
    desc: "ETH / USD",
    type: "crypto - Kraken"
  },
  {
    symbol: "BINANCE:XRPUSDT",
    name: "XRPUSDT",
    desc: "RIPPLE / TETHERUS",
    type: "crypto - Binance"
  },
  {
    symbol: "BITFINEX:BTCUSDLONGS",
    name: "BTCUSDLONGS",
    desc: "BTCUSD LONGS",
    type: "crypto - Bitfinex"
  },
  {
    symbol: "KRAKEN:XBTUSD",
    name: "XBTUSD",
    desc: "XBT / USD",
    type: "crypto - Kraken"
  },
  {
    symbol: "BINANCE:ADABTC",
    name: "ADABTC",
    desc: "CARDANO / BITCOIN",
    type: "crypto - Binance"
  },
  {
    symbol: "BINANCE:WAVESBTC",
    name: "WAVESBTC",
    desc: "WAVES / BITCOIN",
    type: "crypto - Binance"
  },
  {
    symbol: "KRAKEN:XRPUSD",
    name: "XRPUSD",
    desc: "XRP / USD",
    type: "crypto - Kraken"
  },
  {
    symbol: "BINANCE:EOSBTC",
    name: "EOSBTC",
    desc: "EOS / BITCOIN",
    type: "crypto - Binance"
  },
  {
    symbol: "BINANCE:BCHSVUSDT",
    name: "BCHSVUSDT",
    desc: "BITCOIN CASH SV / TETHERUS",
    type: "crypto - Binance"
  },
  {
    symbol: "BITTREX:BTCUSDT",
    name: "BTCUSDT",
    desc: "BITCOIN / TETHER",
    type: "crypto - Bittrex"
  },
  {
    symbol: "BINANCE:BCHABCUSDT",
    name: "BCHABCUSDT",
    desc: "BITCOIN CASH ABC / TETHERUS",
    type: "crypto - Binance"
  },
  {
    symbol: "BINANCE:XLMBTC",
    name: "XLMBTC",
    desc: "STELLAR LUMENS / BITCOIN",
    type: "crypto - Binance"
  },
  {
    symbol: "COINBASE:BTCEUR",
    name: "BTCEUR",
    desc: "BTC/EUR",
    type: "crypto - Coinbase"
  },
  {
    symbol: "BITFINEX:IOTUSD",
    name: "IOTUSD",
    desc: "IOTA / DOLLAR",
    type: "crypto - Bitfinex"
  },
  {
    symbol: "BITSTAMP:XRPUSD",
    name: "XRPUSD",
    desc: "RIPPLE / DOLLAR",
    type: "crypto - Bitstamp"
  },
  {
    symbol: "BINANCE:BCHSVBTC",
    name: "BCHSVBTC",
    desc: "BITCOIN CASH SV / BITCOIN",
    type: "crypto - Binance"
  },
  {
    symbol: "BITSTAMP:BTCEUR",
    name: "BTCEUR",
    desc: "BITCOIN / EURO",
    type: "crypto - Bitstamp"
  },
  {
    symbol: "BINANCE:BNBBTC",
    name: "BNBBTC",
    desc: "BINANCE COIN / BITCOIN",
    type: "crypto - Binance"
  },
  {
    symbol: "BINANCE:EOSUSDT",
    name: "EOSUSDT",
    desc: "EOS / TETHERUS",
    type: "crypto - Binance"
  },
  {
    symbol: "KRAKEN:XBTEUR",
    name: "XBTEUR",
    desc: "XBT / EUR",
    type: "crypto - Kraken"
  },
  {
    symbol: "BITTREX:ETHBTC",
    name: "ETHBTC",
    desc: "ETHEREUM / BITCOIN",
    type: "crypto - Bittrex"
  },
  {
    symbol: "COINBASE:BCHUSD",
    name: "BCHUSD",
    desc: "BCH/USD",
    type: "crypto - Coinbase"
  },
  {
    symbol: "BINANCE:STRATBTC",
    name: "STRATBTC",
    desc: "STRATIS / BITCOIN",
    type: "crypto - Binance"
  },
  {
    symbol: "BINANCE:ICXBTC",
    name: "ICXBTC",
    desc: "ICON / BITCOIN",
    type: "crypto - Binance"
  },
  {
    symbol: "KRAKEN:ETHEUR",
    name: "ETHEUR",
    desc: "ETH / EUR",
    type: "crypto - Kraken"
  },
  {
    symbol: "BINANCE:BCHABCBTC",
    name: "BCHABCBTC",
    desc: "BITCOIN CASH ABC / BITCOIN",
    type: "crypto - Binance"
  },
  {
    symbol: "BINANCE:TRXUSDT",
    name: "TRXUSDT",
    desc: "TRON / TETHERUS",
    type: "crypto - Binance"
  },
  {
    symbol: "BITFINEX:NEOUSD",
    name: "NEOUSD",
    desc: "NEO / DOLLAR",
    type: "crypto - Bitfinex"
  },
  {
    symbol: "BINANCE:NEOBTC",
    name: "NEOBTC",
    desc: "NEO / BITCOIN",
    type: "crypto - Binance"
  },
]
