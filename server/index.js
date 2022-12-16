'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue');
const presentQueue = new Queue();

const server = new Server(3001);
const northpole = server.of('/northpole')

northpole.on('connection', (socket) => {
  console.log('connected to the northpole namespace', socket.id);

  socket.on('JOIN', (queueId) => {
    console.log('Rooms are ', socket.rooms)
    socket.join(queueId)
    socket.emit('JOIN', queueId)
    console.log(`You've joined the ${queueId} room`)
  });

  socket.on('PLEASESANTA', (payload) => {
    // create queue or add into queue
    let currentQueue = presentQueue.read(payload.queueId);
    // if queue isn't made, create it
    if(!currentQueue){
      let queueKey = presentQueue.store(payload.queueId, new Queue());
      currentQueue = presentQueue.read(queueKey);
    }
    // store payload in queue
    currentQueue.store(payload.name, payload);
    socket.broadcast.emit('NEWWISH', payload);
  });

  socket.on('CHECKITTWICE', (payload) => {
    console.log('Christmas list made it to Santa!');
    let currentQueue = presentQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('No Queue');
    }
    // read queue and remove the payload from it
    let present = currentQueue.remove(payload.name)
    socket.emit('CHRISTMASEVE', present);
  });
  
  socket.on('DOWNTHECHIMNEY', (payload) => {
    //make a new queue for delivered presents
    let currentQueue = presentQueue.read(payload.queueId);
    // if queue isn't made, create it
    if(!currentQueue){
      let queueKey = presentQueue.store(payload.queueId, new Queue());
      currentQueue = presentQueue.read(queueKey);
    }
    // store payload in queue
    currentQueue.store(payload.name, payload);
    socket.broadcast.emit('CHRISTMASDAY', payload);
  });

  socket.on('RECIEVED', (payload) => {
    console.log('Gift Recieved', payload);
    let currentQueue = presentQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('No Queue');
    }
    // read queue and remove the payload from it
    let present = currentQueue.remove(payload.name)
    socket.broadcast.emit('THANKSSANTA', present);
  });

  socket.on('GET_WISHES', (payload) => {
    let currentQueue = presentQueue.read(payload.queueId)
    // check and see if there are wishes in the queue
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(name => {
        socket.emit('NEWWISH', currentQueue.read(name))
      })
    }
  });

  socket.on('GET_PRESENTS', (payload) => {
    let currentQueue = presentQueue.read(payload.queueId)
    // check and see if there are delivered presents in the queue
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(name => {
        socket.emit('CHRISTMASDAY', currentQueue.read(name))
      })
    }
  });

});