// const net = require('node:net');

// // export const server = net.createServer((socket)=>{
// //     console.log('connected')
// //     // send data
// //     socket.write("Welcome to the tcp server")
// //     // receive the data
// //     // socket.on('data',(chunck)=>{
// //         // console.log(chunck.toString())
// //     // })
// // });

// let instance;
// const server  = net.createServer((socket)=>{
//     if(socket){
//         instance =  socket
//     }
//     else{
//         return
//     }
// })

// const listen = (PORT) => server.listen(PORT)

// module.exports = {listen,instance}


// const net = require('node:net');

// const server = net.createServer((socket)=>{
//     console.log('connected')
//     // send data
//     socket.write("Welcome to the tcp server")
//     // receive the data
//     // socket.on('data',(chunck)=>{
//         // console.log(chunck.toString())
//     // })
// });


// server.listen(8081)


const net = require("node:net");

class TCPServer {
  constructor() {
    this.initPort = null;
    this.initTcpServer = null;
    this.tcpSocket = null;
    this.dataHandler = null;
  }

  createServer(port) {
    this.initPort = port;
    this.initTcpServer = net.createServer((socket) => {
      this.tcpSocket = socket;
      console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);
      
      // If we've set up a data handler, attach it to this new socket
      if (this.dataHandler) {
        socket.on("data", this.dataHandler);
      }
      
      socket.on("close", () => {
        console.log("Client disconnected");
        this.tcpSocket = null;
      });
      
      socket.on("error", (err) => {
        console.error("Socket error:", err);
      });
    });
    
    this.initTcpServer.listen(port, () => {
      console.log(`TCP server listening on port ${port}`);
    });
    
    return this;
  }

  // Method to set up a data handler that will be attached when a client connects
  receive(callback) {
    this.dataHandler = (chunks) => {
      const data = chunks.toString();
      callback(data);
    };
    
    // If we already have an active socket, attach the handler
    if (this.tcpSocket) {
      this.tcpSocket.on("data", this.dataHandler);
    }
    
    return this;
  }
  
  // Method to send data to the connected client
  send(data) {
    if (!this.tcpSocket) {
      console.error("No client connected. Cannot send data.");
      return false;
    }
    
    try {
      this.tcpSocket.write(data);
      return true;
    } catch (err) {
      console.error("Error sending data:", err);
      return false;
    }
  }
}

module.exports = TCPServer;