import React from "react";
import { connect } from 'react-redux';
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import './dashboard.css'
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import CryptoMarketOverview from './Widgets/CryptoMarketOveriew.component'
import MarketOverview from './Widgets/MarketOveriew.component'
import SingleTicker from './Widgets/SingleTicker.component'
import TechnicalAnalisis from './Widgets/TechnicalAnalisis.component'
import Ticker from './Widgets/Ticker.component'
import { updateLayout, updateSettings, getLayout, getSettings } from './../../actions/Dashboard.actions'
import AddWidgetModal from './Modal.component'

const ReactGridLayout = WidthProvider(RGL);

class Dashboard extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 6,
    rowHeight: 30,
    cols: 12,
    isAddMode: false
  };

  componentWillMount() {
    console.log('xhr')
    this.props.getLayout()
    this.props.getSettings()
  }
  constructor(props) {
    super(props);
    this.state = { layout: null, isAddMode: false, settings: null };
  }

  generateDOM() {
    return this.props.layout.map(widget => {

      const { type, settings } = this.props.settings[widget.i]
      return (
        <div key={widget.i}>
          <span className="text">{widget.i}</span>
          <div className="widget-body">
            {getWidgets(type, settings)}
          </div>
        </div>
      );
    })
  }



  addMode(isAddMode) {
    this.setState({ isAddMode })
  }

  addWidget(type, widgetSettings) {
    const newId = Math.max(...this.props.layout.map(el => el.i)) + 1
    let { layout, settings } = this.props

    switch (type) {
      case 0:
        layout = [
          {
            h: 10,
            w: 6,
            i: newId + "",
            x: 0,
            y: 0
          },
          ...layout.map(el => ({
            ...el, y: el.y + 10
          })),]
        settings[newId] = {
          type: 0,
          settings: {
            symbol: {
              value: widgetSettings.symbol.value
            }
          }
        }
        console.log(settings)
        console.log(widgetSettings)
        console.log([layout])
        this.props.updateSettings(settings)
        this.props.updateLayout([layout])
        this.props.getLayout()
        return
      case 1:
        layout = [
          {
            h: 10,
            w: 6,
            i: newId + "",
            x: 0,
            y: 0
          },
          ...layout.map(el => ({
            ...el, y: el.y + 10
          })),]
        settings[newId] = {
          type: 1,
          settings: widgetSettings
        }
        console.log(layout)
        console.log(widgetSettings)
        this.props.updateSettings(settings)
        this.props.updateLayout([layout])
        this.props.getLayout()

        this.setState({ settings })
        this.setState({ layout })

        return
      case 2:
        return
      case 3:
        layout = [
          {
            h: 3,
            w: 3,
            i: newId + "",
            x: 0,
            y: 0
          },
          ...layout.map(el => ({
            ...el, y: el.y + 10
          })),]
        settings[newId] = {
          type: 3,
          settings: {
            symbol: {
              value: widgetSettings.symbol.value
            }
          }
        }
        this.props.updateSettings(settings)
        this.props.updateLayout([layout])
        this.props.getLayout()

        return
      case 4:
        layout = [
          {
            h: 11,
            w: 4,
            i: newId + "",
            x: 0,
            y: 0
          },
          ...layout.map(el => ({
            ...el, y: el.y + 10
          })),]
        settings[newId] = {
          type: 4,
          settings: {
            symbol: {
              value: widgetSettings.symbol.value
            }
          }
        }
        this.props.updateSettings(settings)
        this.props.updateLayout([layout])
        this.props.getLayout()

        return
      case 5:
        layout = [
          {
            h: 10,
            w: 6,
            i: newId + "",
            x: 0,
            y: 0
          },
          ...layout.map(el => ({
            ...el, y: el.y + 10
          })),]
        settings[newId] = {
          type: 1,
          settings: widgetSettings
        }
        this.setState({ settings })
        this.setState({ layout })

        return
    }

  }

  renderGridLayout() {
    return (
      <div className="widget-container">

        <ReactGridLayout
          layout={this.state.layout}
          onLayoutChange={(...args) => {
            console.log(args)
            this.props.updateLayout(args)
          }
          }
          {...this.props}
        >
          {this.generateDOM()}
        </ReactGridLayout>
      </div>
    )
  }
  renderLoading() {
    console.log(this.props)

    return (
      <div style={{
        position: 'absolute',
        left: 0,
        top: "75px",
        backgroundColor: "rgb(0,0,0,.4)",
        width: '100vw',
        height: 'calc(100vh - 75px)'
      }}>
        <div class="d-flex justify-content-center"
          style={{ top: '40vh', left: '50vw', position: 'absolute', transition: "transform(-50%, 0)" }}
        >
          <div class="spinner-border row" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>

    )
  }

  render() {
    return (
      <React.Fragment>
        <div className="card">
          <div className="card-body">
            <button type="button" className="btn btn-md btn-success"
              onClick={() => { this.addMode(true); console.log('xdd') }}
            >
              Add
            </button>
            <span style={{ color: "white" }}>x</span>
            <button type="button" className="btn btn-md btn-info" >Edit</button>
          </div>
        </div>
        {this.props.layout == null || this.props.settings == null ? this.renderLoading() : this.renderGridLayout()}
        {this.state.isAddMode ?
          <AddWidgetModal
            onClose={() => this.addMode(false)}
            addWidget={(type, settings) => {
              this.addMode(false)
              this.addWidget(type, settings)
              console.log(settings)
            }}
          /> : ''}

      </React.Fragment>
    );
  }
}
const getWidgets = (i, settings) => {
  switch (i) {
    case 0:
      return (
        <TradingViewWidget
          symbol={settings.symbol.value}
          theme={Themes.DARK}
          locale="pl"
          autosize={true}
        />
      )
    case 1:
      return (
        <CryptoMarketOverview />
      )
    case 2:
      return (
        <MarketOverview />
      )
    case 3:
      return (
        <SingleTicker />
      )
    case 4:
      return (
        <TechnicalAnalisis />
      )
    case 5:
      return (
        <Ticker />
      )
    default:
      return <div> Ooopss...</div>

  }
}
function mapStateToProps(state) {
  console.log(state.dashboard)
  return {
    ...state.dashboard,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLayout: (layout) => dispatch(updateLayout(layout)),
    updateSettings: (settings) => dispatch(updateSettings(settings)),
    getLayout: () => dispatch(getLayout()),
    getSettings: () => dispatch(getSettings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
