import React, { Component, Fragment } from 'react'
import { Button } from 'react-materialize'

export default class ChooseTypeButtons extends Component {

    render() {
        const { type, setType } = this.props
        const types = ['Chart', 'Crypto Market Overview', 'Custom Market Overview', 'Single Ticker', 'Economic Calendar', 'Multi Ticker', 'RSS Reader']
        return (
            <Fragment>
                <p>Choose type</p>
                {types.map((el, index) => (
                    <Button 
                        className={`choose-type-buttons indigo  ${type == index ? '' : 'lighten-1'}`}
                        onClick={() => setType(index)}
                    >{el}</Button>
                ))}
            </Fragment>

        )
    }
}
