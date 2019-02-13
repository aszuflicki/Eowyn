import React, { Fragment, Component } from "react";
import { connect } from 'react-redux';
import './dashboard.css'

import { updateLayout, updateSettings, getLayout, getSettings } from './../../actions/Dashboard.actions'
import AddWidgetModal from './Modals/AddModal.component'
import EditWidgetModal from './Modals/EditModal.component'
import DeleteTabModal from './Modals/DeleteTabModal.component'
import AddTabModal from './Modals/AddTabModal.component'
import Loading from './Fragments/Loading.component'
import ActionButtons from './Fragments/ActionButtons.component'
import DashboardTabNav from './DashboardTabNav.component'
import DashboardTabBody from './DashboardTabBody.component'
import EditTabModal from './Modals/EditTabModal.component'

class Dashboard extends Component {

  componentWillMount() {
    this.setState({
      isAddMode: false,
      isEditMode: false,
      isEditModalOpen: false,
      editedWidget: null
    })
    setTimeout(() => {
      this.setState({ tabActive: window.location.href.split('/')[4] || Object.keys(this.props.layout)[0] })
    }, 400)

    this.props.getLayout()
    this.props.getSettings()
  }

  onDelete(id) {
    let { layout, settings } = this.props
    const { tabActive } = this.state
    layout[tabActive].layout = layout[tabActive].layout.filter(el => el.i != id)
    settings[id] = null;
    this.props.updateSettings(settings)
    this.props.updateLayout(layout)
    this.props.getLayout()
    this.props.getSettings()
  }

  render() {
    if (!this.state.tabActive) return <Loading />

    let { layout: dashboard, settings } = this.props

    return (
      <Fragment>

        {}
        <DashboardTabNav />
        {this.props.isAddModal ?
          <AddWidgetModal
            layout={dashboard}
            tabActive={this.state.tabActive}
            settings={settings}
          /> : ''}
        <DashboardTabBody />


        {this.props.isEditModal ?
          <EditWidgetModal
            onClose={() => this.setState({ isEditModalOpen: false })}
            editedWidget={this.state.editedWidget}
            editWidget={(type, id, settings_) => {
              settings[id].settings = settings_;
              this.props.updateSettings(settings)
              this.setState({ isEditModalOpen: false })
            }}
          /> : ''}
        <DeleteTabModal />
        <AddTabModal />
        <EditTabModal />

        <ActionButtons
          isEditMode={this.state.isEditMode}
          updateState={(isAddMode, isEditMode) => this.setState({ isAddMode, isEditMode })}
        />

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

