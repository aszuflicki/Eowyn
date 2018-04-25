window.onload = () => {

	var currentPrice = {};
	var socket = io.connect('https://streamer.cryptocompare.com/');
	var subscription = ['5~CCCAGG~BTC~USD'];
	socket.emit('SubAdd', { subs: subscription });
	socket.on("m", function (message) {
		console.log(message);
		var messageType = message.substring(0, message.indexOf("~"));
		var tradeType = message.split("~")[4];
		if (messageType == "5" && tradeType == "1" || tradeType == "2") {
			document.querySelector("#PRICE_BTC").innerHTML = message.split("~")[5];
		}

	});
}

