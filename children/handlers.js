'use strict';

const Chance = require('chance');
const chance = new Chance();

let presents = ['a PS5', 'a Lego Set', 'a puppy', 'a bike'];

const newWish = (socket) => () => {
  // make new Christmas List
  let payload = {
    name: chance.name(),
    queueId: 'wishlist',
    present: chance.pickone(presents),
    nOn: chance.pickone(['Naughty', 'Nice'])
  }
  console.log(`${payload.name} : This year for Christmas I want ${payload.present}!`)
  socket.emit('PLEASESANTA', payload);
}

const wakeUp = (socket) => (payload) => {
  // recieve present from santa
  console.log(`${payload.name} woke up to find ${payload.present} under the tree`)
  socket.emit('RECIEVED', payload)
}

module.exports = { newWish, wakeUp };