'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/northpole');
const {grantWish, onSleigh, recieveThanks} = require('./handlers');

socket.emit('JOIN', 'santa')
socket.emit('GET_WISHES', {queueId: 'wishlist'})

socket.on('NEWWISH', grantWishTimeOut);

socket.on('CHRISTMASEVE', onSleighTimeOut);

socket.on('THANKSSANTA', (payload) => recieveThanks(socket)(payload));

function grantWishTimeOut(payload){
  setTimeout(() => {
    grantWish(socket)(payload)
  }, 3000)
};

function onSleighTimeOut(payload){
  setTimeout(() => {
    onSleigh(socket)(payload)
  }, 3000)
};
