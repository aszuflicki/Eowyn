import React from "react";
import Chart from "./Chart";

import io from 'socket.io-client'

class App extends React.Component {

    componentDidMount() {

        let socket = io('https://api.eowyn.szuflicki.tk/prices/');

        socket.on("btc", (message) => {
            const value = JSON.parse(message)
            console.log(value.price);

            this.appendData({
                date: new Date(value.time),
                open: message.price,
                high: message.price,
                low: message.price,
                price: value.price,
                volume: message.price,
            })
        })

        fetch('https://api.eowyn.szuflicki.tk/prices/btc')
            .then(res => res.json())
            .then(data => {
                const d = data.map(d => ({ date: new Date(d._time), price: d.price }))

                this.setState({ data: d })
            })
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    /* Just to simulate getting data from the server */
    appendData = (dataPoint) => {

        if (!!this.state) {
            const { data } = this.state;

            data.push(dataPoint);
            this.setState({ data });
        }

    };
    render() {

        console.log(this.state)
        if (this.state == null) {
            return <div>Loading...</div>;
        }
        return (
            <div className="chart-container" >

                <Chart type={'hybrid'} data={this.state.data} />
            </div>
        );
    }
}

export default App
