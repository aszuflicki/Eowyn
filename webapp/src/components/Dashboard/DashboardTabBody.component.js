import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Layout from './DashboardTabBodyLayout.component'

export class DashboardTabBody extends Component {

  render() {
    const { tabActive, layout } = this.props
    const layoutId = Object.keys(layout)[tabActive]
    const dashboard = layout[layoutId].layout
    console.log(dashboard)
    return (
      <Fragment>
        <Layout
          onLayoutChange={() => { }}
          dashboard={dashboard}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.dashboard,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // updateLayout: (layout, no) => dispatch(updateLayout(layout, no)),
    // updateSettings: (settings, no) => dispatch(updateSettings(settings, no)),
    // getLayout: () => dispatch(getLayout()),
    // getSettings: () => dispatch(getSettings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTabBody)

