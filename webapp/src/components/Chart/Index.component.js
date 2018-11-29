import React from "react";
import Chart from "./Chart";

import io from 'socket.io-client'

class App extends React.Component {

    componentDidMount() {


        let socket = io('https://streamer.cryptocompare.com/')
        var subscription = ['5~CCCAGG~BTC~USD']
        socket.emit('SubAdd', { subs: subscription })


        socket.on("m", (message) => {
            const msg = message.split('~')

            if (msg[0] === '5' && (msg[4] === '1' || msg[4] === '2')) {
                let price = msg[5];
                     this.appendData({
                    date: new Date(),
                    open: price,
                    high: price,
                    low: price,
                    price: price,
                    volume: price,
                })

            }
           
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
