import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTick, setFigure } from '../../actions/Chart.actions'
import Chart from './Chart'
import io from 'socket.io-client'

class Index extends Component {

    value;

    componentDidMount() {
        let socket = io('http://192.168.1.106:7001/');

        socket.on("btc", (message) => {
            console.log(message);
            const value = JSON.parse(message)

            this.setState({
                data: [
                    ...this.state.data,
                    { _time: new Date(value.time), price: value.price }
                ]
            })
        })

        fetch('http://192.168.1.106:7001/prices/btc')
            .then(res => res.json())
            .then(data => {
                const d = data.map(d => ({ _time: new Date(d._time), price: d.price }))

                this.setState({ data: d })
            })
    }

    render() {

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
