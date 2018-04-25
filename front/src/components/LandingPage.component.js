import React, { Component } from 'react';
import { updatePrice } from './LandingPage.actions'

const io = require('socket.io-client')();

class LandingPage extends Component {

    render() {
        return (
            <div>
                Price:<span id="price"></span>
            </div>
        )
    }

    componentDidMount() {
        var currentPrice = {};
        var socket = io.connect('https://streamer.cryptocompare.com/');
        var subscription = ['5~CCCAGG~BTC~USD'];
        socket.emit('SubAdd', { subs: subscription });
        socket.on("m", function (message) {
            console.log(message);
            var messageType = message.substring(0, message.indexOf("~"));
            var tradeType = message.split("~")[4];
            if (messageType == "5" && tradeType == "1" || tradeType == "2") {
                document.querySelector("#price").innerHTML = message.split("~")[5];
                updatePrice(message.split("~")[5]);
            }

        });



    }
}

export default LandingPage;