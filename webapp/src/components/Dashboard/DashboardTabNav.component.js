import React, { Component, Fragment } from 'react'
import { setTabActive, toggleAddTabModal, toggleEditTabModal } from './../../actions/Dashboard.actions'
import { connect } from 'react-redux';
import { Icon } from 'react-materialize'
export class DashboardTabNav extends Component {

  render() {
    const { layout, setTabActive, tabActive, toggleAddTabModal, isEditMode, toggleEditTabModal } = this.props
    const tabs = Object.keys(layout).map(key => ({ id: key, name: layout[key].tabName }))

    return (
      <Fragment>
        <nav className="nav-extended indigo darken-4">
          <div className="nav-content">
            <ul className="tabs tabs-transparent">
              {tabs.map((tab, index) => (
                <li className="tab" style={isEditMode ? { position: "relative", marginRight: "10px" } : {}}
                  onClick={() => setTabActive(index)}
                  key={'DashboardTabNav-' + index}>
                  <a className={`${tabActive == index ? 'active' : ''}`}
                  >{tab.name}
                    {isEditMode ? <i class="material-icons" 
                    style={{ position: "absolute", top: "-3px", right: 0, fontSize: "18px" }}
                    onClick={() => {
                      toggleEditTabModal(true, index)
                    }}>edit</i> : ''}
                  </a>

                </li>
              ))}
              <li className="tab"
                onClick={() => toggleAddTabModal(true)}
                key={'DashboardTabNav-add'}>
                <a className={``} style={{ paddingLeft: "0", fontSize: "20px", }}
                >+</a>
              </li>

            </ul>
          </div>
        </nav>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.dashboard,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTabActive: (id) => dispatch(setTabActive(id)),
    toggleAddTabModal: (isActive) => dispatch(toggleAddTabModal(isActive)),
    toggleEditTabModal: (isActive, index) => dispatch(toggleEditTabModal(isActive, index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTabNav)




