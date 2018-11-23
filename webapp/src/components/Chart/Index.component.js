import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTick, setFigure } from '../../actions/Chart.actions'
import Chart from './Chart'
import { tsvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";
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

        // setInterval(() => {
        //     if (!!this.value && !!this.value.time)
        //         this.props.addTick(new Date().toISOString(), this.value.price)

        // }, 500)

        getData().then(data => {
			this.setState({ data })
		})

    }

    

    render() {

        const x = this.props.x.length ? this.props.x : ['2018-11-12T10:19:26.118000Z',]
        const y = this.props.x.length ? this.props.y : [6359.09000000,]
        const data = [
            { type: 'line', x: x, y: y }
        ]

        console.log(data[0])
        if (this.state == null) {
			return <div>Loading...</div>
		}
        return (
            <div           >
               

                {/* <HighchartsReact
                    highcharts={Highcharts}
                    options={data[0]}
                /> */}

                <Chart  type={'hybrid'} data={this.state.data}  />

            </div>
        );
    }
}
// const options = {
//     title: {
//         text: 'My chart'
//     },
//     series: [{
//         data: [1, 2, 3]
//     }]
// }


function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.value = +d.open;
		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");
const getData = () => {
	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	return promiseMSFT;
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
