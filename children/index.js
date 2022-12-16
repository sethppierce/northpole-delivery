'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/northpole');
const { newWish, wakeUp } = require('./handlers');

socket.emit('JOIN', 'wishlist');
socket.emit('GET_PRESENTS', {queueId: 'delivered'})
socket.on('CHRISTMASDAY', (payload) => wakeUp(socket)(payload))

setInterval(() => {
  newWish(socket)();
}, 4000);