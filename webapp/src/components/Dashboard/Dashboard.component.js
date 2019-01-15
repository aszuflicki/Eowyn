import React, { Fragment } from "react";
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
import EditWidgetModal from './EditModal.component'

const ReactGridLayout = WidthProvider(RGL);

class Dashboard extends React.Component {
  static defaultProps = {
    className: "layout",
    items: 6,
    rowHeight: 30,
    cols: 12,
    isAddMode: false,
    draggableHandle: '.handle'
  };

  componentWillMount() {
    this.props.getLayout()
    this.props.getSettings()

  }

  constructor(props) {
    super(props);
    this.state = { isAddMode: false, isEditMode: false, isEditModeModal: false, editedWidget: {type: 1} };
  }

  generateDOM() {
    return this.props.layout.map(widget => {

      const { type, settings } = this.props.settings[widget.i]
      return (
        <div key={widget.i}>
          <div className="handle" style={{ width: "100%" }}>
            <span className="text" >{widget.i} </span>
          </div>
          <div className="widget-body">
            {this.state.isEditMode ? (
              <div style={{ position: "absolute", width: "100%", height: "calc(100% - 20px)", backgroundColor: "rgb(239, 163, 29,0.6)", zIndex: "100000" }}>
                <div className="row" style={{ height: "100%" }}>
                  <div className="col-md-6">
                    <div style={{
                      fontSize: "4rem", margin: 0, position: "absolute", top: "50%", right: "20%",
                      transform: "translate(-50%, -50%)"
                    }}>
                      <i
                        className="fas fa-trash-alt "
                        onClick={() => {
                          let { layout } = this.props
                          layout = layout.filter((el) => el.i !== widget.i)
                          this.props.updateLayout([layout])
                          setTimeout(() => this.props.getLayout(), 100)
                        }}
                      ></i>
                    </div>

                  </div>
                  <div className="col-md-6">
                    <div style={{
                      fontSize: "4rem", margin: 0, position: "absolute", top: "50%", left: "20%",
                      transform: "translate(-50%, -50%)"
                    }}>
                      <i
                        className="fas fa-cog"
                        onClick={() => {
                          this.setState({editedWidget: {
                            type, settings, id: widget.i
                          }})
                          this.setState({ isEditModeModal: true })
                        }}
                      ></i>
                    </div>
                  </div>
                </div>

              </div>
            ) : ''}
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

    switch (type) {
      case 0:
        settings[newId] = {
          type: 0,
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
      case 1:
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
        console.log(widgetSettings)
        layout[0].h = 11
        layout[0].w = 6
        settings[newId] = {
          type: 2,
          settings: widgetSettings
        }
        this.props.updateSettings(settings)
        this.props.updateLayout([layout])
        this.props.getLayout()
        return
      case 3:
        layout[0].h = 3
        layout[0].w = 3
        console.log(widgetSettings)
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
        layout[0].h = 11
        layout[0].w = 4
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
        layout[0].h = 3
        layout[0].w = 12
        settings[newId] = {
          type: 5,
          settings: widgetSettings.map(el => ({ proName: el.value, title: el.label.props.children[3] }))
        }
        console.log(settings)
        this.props.updateSettings(settings)
        this.props.updateLayout([layout])
        this.props.getLayout()

        return
    }

  }

  editWidget(type, id, widgetSettings) {

    console.log(type)
    console.log(id)
    console.log(widgetSettings)
    let { layout, settings } = this.props


    switch (type) {
      case 0:
        settings[id] = {
          type: 0,
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
      case 1:
        return
    //   case 2:
    //     layout[0].h = 11
    //     layout[0].w = 6
    //     settings[newId] = {
    //       type: 2,
    //       settings: widgetSettings
    //     }
    //     this.props.updateSettings(settings)
    //     this.props.updateLayout([layout])
    //     this.props.getLayout()
    //     return
    //   case 3:
    //     layout[0].h = 3
    //     layout[0].w = 3
    //     console.log(widgetSettings)
    //     settings[newId] = {
    //       type: 3,
    //       settings: {
    //         symbol: {
    //           value: widgetSettings.symbol.value
    //         }
    //       }
    //     }
    //     this.props.updateSettings(settings)
    //     this.props.updateLayout([layout])
    //     this.props.getLayout()

    //     return
    //   case 4:
    //     layout[0].h = 11
    //     layout[0].w = 4
    //     settings[newId] = {
    //       type: 4,
    //       settings: {
    //         symbol: {
    //           value: widgetSettings.symbol.value
    //         }
    //       }
    //     }
    //     this.props.updateSettings(settings)
    //     this.props.updateLayout([layout])
    //     this.props.getLayout()

    //     return
    //   case 5:
    //     layout[0].h = 3
    //     layout[0].w = 12
    //     settings[newId] = {
    //       type: 5,
    //       settings: widgetSettings.map(el => ({ proName: el.value, title: el.label.props.children[3] }))
    //     }
    //     console.log(settings)
    //     this.props.updateSettings(settings)
    //     this.props.updateLayout([layout])
    //     this.props.getLayout()

    //     return
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
              onClick={() => { this.addMode(true); }}
            >
              Add
            </button>
            <span style={{ color: "white" }}>x</span>

            {this.state.isEditMode ? (
              <Fragment>
                <button type="button" className="btn btn-md btn-danger"
                  onClick={() => { this.setState({ isEditMode: false }); }}
                >Stop Editing</button>
              </Fragment>
            ) : (
                <Fragment>
                  <button type="button" className="btn btn-md btn-info"
                    onClick={() => { this.setState({ isEditMode: true }); }}
                  >Edit</button>
                </Fragment>
              )}


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

        {this.state.isEditModeModal ?
          <EditWidgetModal
            onClose={() => this.setState({ isEditModeModal: false })}
            editedWidget={this.state.editedWidget}
            editWidget={(...args) => {
              this.setState({ isEditModeModal: false })
              this.editWidget(...args)
            }}
          /> : ''}


      </React.Fragment>
    );
  }
}
const getWidgets = (i, settings, isEditMode) => {
  switch (i) {
    case 0:
      return (
        <Fragment>
          {isEditMode ?
            'Edit mode' : ''}
          <TradingViewWidget
            symbol={settings.symbol.value}
            theme={Themes.DARK}
            locale="pl"
            autosize={true}
          />
        </Fragment>

      )
    case 1:
      return (
        <CryptoMarketOverview />
      )
    case 2:
      return (
        <MarketOverview
          settings={settings} />
      )
    case 3:
      return (
        <SingleTicker
          symbol={settings.symbol.value} />
      )
    case 4:
      return (
        <TechnicalAnalisis
          symbol={settings.symbol.value} />
      )
    case 5:
      return (
        <Ticker
          symbols={settings} />
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
