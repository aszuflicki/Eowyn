import React, { Fragment, Component } from "react";
import { connect } from 'react-redux';
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import './dashboard.css'

import { updateLayout, updateSettings, getLayout, getSettings, getAllLayouts } from './../../actions/Dashboard.actions'
import AddWidgetModal from './Modal.component'
import EditWidgetModal from './EditModal.component'
import MainTabs from './Fragments/MainTabs.component'
import AddEditBtns from './Fragments/AddEditBtns.component'
import Loading from './Fragments/Loading.component'
import Widget from './Widgets/Widget.component'

class Dashboard extends Component {

  componentWillMount() {
<<<<<<< HEAD
    console.log()
    console.log('xdd')
    this.setState({
      dashboard: {
        "1": {
          tabName: "tab1", layout: [{ h: 10, w: 6, i: "1", x: 6, y: 0 }, { h: 10, w: 6, i: "2", x: 0, y: 10 }]
        },
        "2": {
          tabName: "tab2", layout: [{ h: 10, w: 6, i: "3", x: 6, y: 0 }, { h: 10, w: 6, i: "4", x: 0, y: 10 },]
=======
    this.props.getLayout()
    this.props.getSettings()

  }

  constructor(props) {
    super(props);
    this.state = {
      isAddMode: false, isEditMode: false, isEditModeModal: false, editedWidget: { type: 1 },
      tabs: [
        { name: 'Tab1' },
        { name: 'Tab2' },
        { name: 'Tab3' },
      ],
      tabActive: 0
    }

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
>>>>>>> c9053b8718fb4a3dc89ec7cb12f2868dccb257a1
        }
      },
      settings: {
        "1": {
          type: 1,
        },
        "2": {
          type: 2,
          settings: {
            tabs: [
              {
                title: "Indeksssy xd",
                symbols: [{ s: "INDEX:SPX", d: "S&P 500" }, { s: "INDEX:IUXX", d: "Nasdaq 100" }]
              },
              {
                title: "Towary",
                symbols: [{ s: "CME_MINI:ES1!", d: "E-Mini S&P" }, { s: "CME:E61!", d: "Euro" }]
              }]
          }
        },
        "3": {
          type: 3,
          settings: {
            symbol: {
              value: "BITFINEX:ETHUSD"
            }
          }
        },
        "4": {
          type: 4,
          settings: {
            symbol: {
              value: "BITFINEX:ETHUSD"
            }
          }
        }
<<<<<<< HEAD
      },
      isAddMode: false,
      isEditMode: false,
      isEditModalOpen: false
    })
    setTimeout(() => {
      this.setState({ tabActive: window.location.href.split('/')[4] || Object.keys(this.state.dashboard)[0] })
    }, 100)
=======
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
>>>>>>> c9053b8718fb4a3dc89ec7cb12f2868dccb257a1
  }

  render() {
    if (!this.state.tabActive) return <Loading />

    const { dashboard } = this.state
    const tabs = Object.keys(dashboard).map(key => ({ name: dashboard[key].tabName, id: key }))
    console.log(this.state)

    return (
      <Fragment>
        <AddEditBtns
          updateState={(isAddMode, isEditMode) => this.setState({ isAddMode, isEditMode })}
        />
        <MainTabs
          tabs={tabs}
          tabActive={this.state.tabActive}
          updateState={(tabActive, tabs) => {
            console.log(tabActive)
            this.setState({ tabActive, tabs })
          }}
        />

        <MainTabsBody
          dashboard={dashboard}
          tabActive={this.state.tabActive}
          settings={this.state.settings}
        />

        {this.state.isAddMode ?
          <AddWidgetModal

<<<<<<< HEAD
=======
        {this.state.isEditModeModal ?
          <EditWidgetModal
            onClose={() => this.setState({ isEditModeModal: false })}
            editedWidget={this.state.editedWidget}
            editWidget={(...args) => {
              this.setState({ isEditModeModal: false })
              this.editWidget(...args)
            }}
>>>>>>> c9053b8718fb4a3dc89ec7cb12f2868dccb257a1
          /> : ''}
      </Fragment>
    );
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
    updateLayout: (layout, no) => dispatch(updateLayout(layout, no)),
    updateSettings: (settings, no) => dispatch(updateSettings(settings, no)),
    getLayout: () => dispatch(getLayout()),
    getSettings: () => dispatch(getSettings()),
    getAllLayouts: () => dispatch(getAllLayouts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

class MainTabsBody extends Component {

  render() {
    let dashboard = this.props.dashboard[this.props.tabActive]
    dashboard.id = this.props.tabActive;

    return (
      <Fragment>

        <div
          key={"mainTab-" + dashboard.id}>
          <GridLayout
            dashboard={dashboard}
            settings={this.props.settings}
            tabActive={this.props.tabActive}
          />
        </div>
      </Fragment>
    )
  }
}

const ReactGridLayout = WidthProvider(RGL);
class GridLayout extends Component {

  static defaultProps = {
    className: "layout",
    items: 6,
    rowHeight: 30,
    cols: 18,
    isAddMode: false,
    draggableHandle: '.handle',
  };

  generateDOM() {
    return this.props.dashboard.layout.map(el => {
      return (
        <div key={el.i}>
          <div className="handle" style={{ width: "100%" }}>
            <span className="text" >{el.i} </span>
          </div>
          <div className="widget-body">
            <Widget
              widget={el}
              type={this.props.settings[el.i].type}
              settings={this.props.settings[el.i].settings}
            // isEditMode={this.state.isEditMode}
            // layout={this.props.layout}
            // updateLayout={this.props.updateLayout}
            // getLayout={this.props.getLayout}
            // updateState={(editedWidget, isEditModeModal) => {
            //   console.log(editedWidget)
            //   this.setState({ editedWidget })
            //   setTimeout(() => {
            //     this.setState({ isEditModeModal: true })
            //   }, 50)
            // }}
            />
          </div>
        </div>
      );
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    console.log(this.props)
    if (!this.props.settings) return <Loading />
    return (
      <React.Fragment>
        <div className="widget-container">
          <ReactGridLayout
            layout={this.props.dashboard.layout}
            onLayoutChange={(...args) => console.log(args)}
            {...this.props}
            settings={this.props.settings}
          >
            {this.generateDOM()}
          </ReactGridLayout>
        </div>

      </React.Fragment>
    );
  }
}

