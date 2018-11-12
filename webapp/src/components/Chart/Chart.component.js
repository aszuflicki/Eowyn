import React, { Component } from 'react'
import Plot from 'react-plotly.js'
import { connect } from 'react-redux'
import { addTick, setFigure } from '../../actions/Chart.actions'
import _ from 'underscore'

class Chart extends Component {

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
            // if (!!value.time)
            //     this.props.addTick(value.time, value.price)
        }
        console.log(new Date().toISOString())

        setInterval(() => {
            if (!!this.value && !!this.value.time)
                this.props.addTick(new Date().toISOString(), this.value.price)

        }, 100)
    }



    render() {

        const x = this.props.x.length ? this.props.x : ['2018-11-12T10:19:26.118000Z',]
        const y = this.props.x.length ? this.props.y : [6359.09000000,]
        const data = [
            { type: 'line', x: x, y: y }
        ]
        return (
            <div>
                <Plot
                    data={data}
                    layout={this.props.layout}
                    // frames={this.props.frames}
                    // config={this.props.config}
                    onInitialized={(figure) => this.props.setFigure(figure)}
                    onUpdate={(figure) => {
                        console.log(figure)
                        const { layout } = figure

                        if (!_.isEqual(layout, this.props.layout))
                            this.props.setZoom(layout)
                    }}
                />

                {/* {data[0].x.length}
                {renderChart(data)} */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state.chart.data[0].x.length)
    return {
        ...state.chart
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        addTick: (x, y) => dispatch(addTick(x, y)),
        // addTicki: (x) => dispatch(addTicki(x)),
        setFigure: (figure) => dispatch(setFigure(figure))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);


// const renderChart = (data) => (
//     <Plot
//         data={[
//             { type: 'line', x: data[0].x, y: data[0].y }
//         ]}
//         layout={{ width: 800, height: 640, title: 'A Fancy Plot' }}
//     />
// )