const TCPServer = require('./tcp.js');


const server = new TCPServer();


server.receive((data)=>{
console.log(data)
})


server.createServer(8081)
