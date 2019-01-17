import React, { Component, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class MainTabs extends Component {

    render() {
        return (
            <Fragment>
                <ul className="nav nav-tabs">
                    {this.props.tabs.map((tab, index) => {
                        return (
                            <li className="nav-item" key={tab.id + 'nav-tabs'}>
                                <a
                                    className={`nav-link ${this.props.tabActive === tab.id ? 'active' : ''}`}
                                    onClick={() => this.props.updateState(tab.id, this.props.tabs)}
                                    href={`/dashboard/${tab.id}`}>
                                    {tab.name}
                                    <span
                                        className="fas fa-igloo"
                                        style={{ fontSize: "12px", width: '7px', height: '10px' }}></span>
                                    <FontAwesomeIcon
                                        icon="times"
                                        onClick={() => {
                                            let { tabs, tabActive } = this.props
                                            tabs = tabs.filter((el, i) => index !== i)
                                            if (tabActive >= index) tabActive = tabActive - 1
                                            setTimeout(() => {
                                                this.props.updateState(tabActive, tabs)
                                            }, 50)
                                        }}
                                    />
                                </a>
                            </li>
                        )
                    })
                    }
                    <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => {
                            const { tabs } = this.props
                            this.props.updateState(tabs.length, [...tabs, { name: 'New Tab', symbols: [] }])
                        }}>+ </button>
                </ul >

            </Fragment>
        )
    }
}