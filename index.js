const cron = require("node-cron");
var r = require('rethinkdb');

var connection = null;
r.connect({ host: 'localhost', port: 28015 }, function (err, conn) {
    if (err) throw err;
    connection = conn;


    r.table('authors').run(connection, function (err, cursor) {
        if (err) throw err;
        cursor.toArray(function (err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
        });
    })



})
// cron.schedule("*/30 * * * * *", () => {
//     r.table('authors').insert([
//         {
//             name: "William Adama", tv_show: "Battlestar Galactica",
//             posts: [
//                 { title: "Decommissioning speech", content: "The Cylon War is long over..." },
//                 { title: "We are at war", content: "Moments ago, this ship received word..." },
//                 { title: "The new Earth", content: "The discoveries of the past few days..." }
//             ]
//         }
//     ]).run(connection, function (err, result) {
//         if (err) throw err;
//         console.log(JSON.stringify(result, null, 2));
//     })
// })

