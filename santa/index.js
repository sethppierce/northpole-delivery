'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/northpole');
const {grantWish, onSleigh, recieveThanks} = require('./handlers');

socket.emit('JOIN', 'santa')
socket.emit('GET_WISHES', {queueId: 'wishlist'})

socket.on('NEWWISH', (payload) => grantWish(socket)(payload));

socket.on('CHRISTMASEVE', (payload) => onSleigh(socket)(payload));

socket.on('THANKSSANTA', (payload) => recieveThanks(socket)(payload));
