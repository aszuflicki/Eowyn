import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTick, setFigure } from '../../actions/Chart.actions'
import Chart from './Chart'
class Index extends Component {

    value;

    componentDidMount() {
        const subscribe = {
            type: "subscribe",
            channels: [
                {
                    name: "ticker",
                    product_ids: ["BTC-USD"]
                }
            ]
        };
        this.ws = new WebSocket("wss://ws-feed.gdax.com");

        this.ws.onopen = () => {
            this.ws.send(JSON.stringify(subscribe));
        };

        this.ws.onmessage = e => {
            this.value = JSON.parse(e.data);
            if (this.value.type !== "ticker") {
                return;
            }
            if (!!this.value.time)
                this.props.addTick(this.value.time, this.value.price)
        }

        fetch('http://192.168.1.106:7001/prices/btc')
            .then(res => res.json())
            .then(data => {
                const d = data.map(d => ({ _time: new Date(d._time), price: d.price }))

                this.setState({ data: d })
            })
    }

    render() {

        // const x = this.props.x.length ? this.props.x : ['2018-11-12T10:19:26.118000Z',]
        // const y = this.props.x.length ? this.props.y : [6359.09000000,]
        // const data = [
        //     { type: 'line', x: x, y: y }
        // ]

        if (this.state == null) {
            return <div>Loading...</div>
        }
        return (
            <div className="chart-container" >

                <Chart type={'hybrid'} data={this.state.data} />

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.chart
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTick: (x, y) => dispatch(addTick(x, y)),
        setFigure: (figure) => dispatch(setFigure(figure))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
