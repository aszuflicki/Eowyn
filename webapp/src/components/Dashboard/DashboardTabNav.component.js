import React, { Component, Fragment } from 'react'
import { setTabActive } from './../../actions/Dashboard.actions'
import { connect } from 'react-redux';

export class DashboardTabNav extends Component {
  render() {
    const { layout, setTabActive, tabActive } = this.props
    const tabs = Object.keys(layout).map(key => ({ id: key, name: layout[key].tabName }))

    return (
      <Fragment>
        <nav className="nav-extended indigo darken-4">
          <div className="nav-content">
            <ul className="tabs tabs-transparent">
              {tabs.map((tab, index) => (
                <li className="tab"
                  onClick={() => setTabActive(index)}
                  key={'DashboardTabNav-' + index}>
                  <a className={`${tabActive == index ? 'active' : ''}`}
                  >{tab.name}</a>
                </li>
              ))}
              <li className="tab"
                onClick={() => { }}
                key={'DashboardTabNav-add'}>
                <a className={``} style={{ paddingLeft: "0", fontSize: "20px" }}
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
    setTabActive: (id) => dispatch(setTabActive(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTabNav)




