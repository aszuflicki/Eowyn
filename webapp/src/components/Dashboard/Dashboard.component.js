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
import { updateLayout } from './../../actions/Dashboard.actions'
import AddWidgetModal from './Modal.component'

const ReactGridLayout = WidthProvider(RGL);

class Dashboard extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 6,
    rowHeight: 40,
    cols: 12
  };


  gridLayout = [

    {
      // isDraggable: true,
      // isResizable: true,
      // minH: 2,
      // minW: 2,
      // maxH: undefined,
      // maxW: undefined,
      // moved: false,
      // static: false,
      h: 10,
      w: 6,
      i: "0",
      x: 0,
      y: 0
    },
    {

      h: 10,
      w: 6,
      i: "1",
      x: 6,
      y: 0
    },
    {

      h: 10,
      w: 6,
      i: "2",
      x: 0,
      y: 10
    },
    {
      h: 10,
      w: 6,
      i: "3",
      x: 6,
      y: 10
    },
    {
      h: 10,
      w: 6,
      i: "4",
      x: 0,
      y: 20
    },
    {
      h: 10,
      w: 6,
      i: "5",
      x: 6,
      y: 20
    },
  ]


  constructor(props) {
    super(props);

    // const layout = this.generateLayout();
    const layout = this.gridLayout;
    this.state = { layout };
  }



  generateDOM() {




    return _.map(_.range(this.props.items), function (i) {
      return (
        <div key={i}>
          <span className="text">{i}</span>
          <div className="widget-body">
            {getWidgets(i)}
          </div>


        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function (item, i) {
      const w = 6;
      const y = 10;
      return {
        x: (i % 2) * 6,
        y: i % 2,
        w: w,
        h: y,
        i: i.toString()
      };
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {

    // console.log(this.generateLayout())
    return (
      <React.Fragment>

        <div class="card">
          <div class="card-body">
            <button type="button" class="btn btn-md btn-success">Add</button>
            <span style={{ color: "white" }}>x</span>
            <button type="button" class="btn btn-md btn-info" >Edit</button>
          </div>
        </div>
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
            <AddWidgetModal />
       
      </React.Fragment>
    );
  }
}
const getWidgets = (i) => {
  switch (i) {
    case 0:
      return (
        <TradingViewWidget
          symbol="BITFINEX:ETHUSD"
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
  return {
    ...state.dashboard,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLayout: (layout) => dispatch(updateLayout(layout)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
