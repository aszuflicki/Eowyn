import React, { Component } from 'react'

export default class Badges extends Component {
    render() {
        switch (this.props.badge) {
            case 0:
                return (
                    <span className={`new badge ${this.props.active ? 'darken-3' : ''}`}
                        data-badge-caption="General Discussion"></span>
                )
            case 1:
                return (
                    <span className={`new badge ${this.props.active ? 'darken-3' : ''}`}
                        data-badge-caption="Stocks / Bonds"></span>
                )
            case 2:
                return (
                    <span className={`new badge ${this.props.active ? 'darken-3' : ''}`}
                        data-badge-caption="Investment Ideas"></span>
                )
            case 3:
                return (
                    <span className={`new badge ${this.props.active ? 'darken-3' : ''}`}
                        data-badge-caption="Cryptocurrencies"></span>
                )
            case 4:
                return (
                    <span className={`new badge ${this.props.active ? 'darken-3' : ''}`}
                        data-badge-caption="Commodities"></span>
                )
            case 5:
                return (
                    <span className={`new badge ${this.props.active ? 'darken-3' : ''}`}
                        data-badge-caption="Short / CFDs"></span>
                )
            default: return 'Ooopss...'
        }
    }
}
