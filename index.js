const net = require('node:net');

const server = net.createServer((socket)=>{
    console.log('connected')
    // receive the data
    socket.on('data',(chunck)=>{
        console.log(chunck.toString())
    })
});


server.listen(8081)