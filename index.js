const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket=>{
    console.log('接続しました。');

    socket.on('disconnect', ()=>{
        console.log('接続が切れました。');
    });

    socket.on('chat message', msg=>{
        console.log(`受信したメッセージ:${msg}`);

        io.emit('push', msg);
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});