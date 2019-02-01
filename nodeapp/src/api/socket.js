let io, repo
module.exports = (http, rep) => {
    io = require('socket.io')(http);
    repo = rep;
    io.on('connection', function (socket) {
        console.log('connected -----------------')
        socket.on('dashboard_layout', function (layout, token) {
            console.log(layout)
            console.log(token)
            jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
                if (err) {
                    console.log(err)
                } else {
                    options.repo.updateLayout(decoded.email, layout)
                }
            });
        });

        socket.on('dashboard_settings', function (settings, token) {
            console.log(settings)
            console.log(token)
            jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
                if (err) {
                    console.log(err)
                } else {
                    options.repo.updateSettings(decoded.email, settings)
                }
            });
        });
    });
}

module.exports.notifyNewPost = (post) => {
    io.of(`/discussion/${post.topic_id}`).emit('new_post', post)
    Promise.all([
        repo.getAllFollowers(post.topic_id),
        repo.getDisscusion(post.topic_id)
    ]).then(res => {
        const users = [...new Set(res[0])]

        users.forEach(el => {
            console.log(`/following/${el.replace('@', '&')}`)
            io.of(`/following/${el.replace('@', '&')}`).emit('new_post', post, res[1].discussion)

        })
    })
}
