'use strict';

const grantWish = (socket) => (payload) => {
  console.log('New Wish recieved', payload);
  if(payload.nOn === 'Naughty'){
    payload.present = 'Coal';
  }
  socket.emit('CHECKITTWICE', payload);
};

const onSleigh = (socket) => (payload) => {
  console.log('Now dash away! Dash away! Dash away all');
  payload.queueId = 'delivered';
  socket.emit('DOWNTHECHIMNEY', payload)
}

const recieveThanks = (socket) => (payload) => {
  if(payload.nOn === 'Naughty'){
    console.log(`Sorry ${payload.name}, you were naughty this year`)
  } else {
    console.log(`You're welcome ${payload.name}, have fun with your ${payload.present}`)
  }
}

module.exports = {grantWish, onSleigh, recieveThanks}