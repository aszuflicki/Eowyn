import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Layout from './DashboardTabBodyLayout.component'
import { updateLayout } from './../../actions/Dashboard.actions'

export class DashboardTabBody extends Component {

  render() {
    let { tabActive, layout, updateLayout } = this.props
    const layoutId = Object.keys(layout)[tabActive]
    const dashboard = layout[layoutId].layout
    console.log(dashboard)
    return (
      <Fragment>
        <Layout
          onLayoutChange={(newLayout) => {
            layout[layoutId].layout = newLayout
            updateLayout(layout)
          }}
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
    updateLayout: (...args) => dispatch(updateLayout(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTabBody)

