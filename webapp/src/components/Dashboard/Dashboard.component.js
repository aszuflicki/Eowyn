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
    console.log()
    console.log('xdd')
    this.setState({
      dashboard: {
        "1": {
          tabName: "tab1", layout: [{ h: 10, w: 6, i: "1", x: 6, y: 0 }, { h: 10, w: 6, i: "2", x: 0, y: 10 }]
        },
        "2": {
          tabName: "tab2", layout: [{ h: 10, w: 6, i: "3", x: 6, y: 0 }, { h: 10, w: 6, i: "4", x: 0, y: 10 },]
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
      },
      isAddMode: false,
      isEditMode: false,
      isEditModalOpen: false
    })
    setTimeout(() => {
      this.setState({ tabActive: window.location.href.split('/')[4] || Object.keys(this.state.dashboard)[0] })
    }, 100)
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

