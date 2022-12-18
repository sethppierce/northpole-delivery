'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/northpole');
const inquirer = require('inquirer');
const Chance = require('chance');
const chance = new Chance();

let interval;

socket.emit('JOIN', 'wishlist');

const newPrompt = async () => {
  await inquirer.prompt([
    {
      type: 'input',
      message: 'Dear Santa, My name is :',
      name: 'name'
    },
    {
      type: 'input',
      message: 'For Christmas I would like',
      name: 'present'
    },
  ]).then((answers) => {
    answers.queueId = 'wishlist'
    answers.nOn = chance.pickone(['Naughty', 'Nice'])
    console.log(answers);
    socket.emit('PLEASESANTA', answers)
    let zzz = 'ZZZ'
    interval = setInterval(() => {
      console.log(zzz);
      zzz += 'ZZZ'
    }, 1000);
  })
  .catch((e) => {
    if (e.isTtyError) {
      return;
    } else {
      console.log(e.message);
    }
  });
}

newPrompt();



socket.on('CHRISTMASDAY', (payload) => {
  clearInterval(interval);
  console.log(christmas)
  console.log(`${payload.name} woke up to find ${payload.present} under the tree`)
  socket.emit('RECIEVED', payload);
  process.exit();
});

let christmas = `         |\r\n        -+-\r\n         A\r\n        \/=\\               \/\\  \/\\    ___  _ __  _ __ __    __\r\n      i\/ O \\i            \/  \\\/  \\  \/ _ \\| \'__|| \'__|\\ \\  \/ \/\r\n      \/=====\\           \/ \/\\  \/\\ \\|  __\/| |   | |    \\ \\\/ \/\r\n      \/  i  \\           \\ \\ \\\/ \/ \/ \\___\/|_|   |_|     \\  \/\r\n    i\/ O * O \\i                                       \/ \/\r\n    \/=========\\        __  __                        \/_\/    _\r\n    \/  *   *  \\        \\ \\\/ \/        \/\\  \/\\    __ _  ____  | |\r\n  i\/ O   i   O \\i       \\  \/   __   \/  \\\/  \\  \/ _ |\/ ___\\ |_|\r\n  \/=============\\       \/  \\  |__| \/ \/\\  \/\\ \\| (_| |\\___ \\  _\r\n  \/  O   i   O  \\      \/_\/\\_\\      \\ \\ \\\/ \/ \/ \\__,_|\\____\/ |_|\r\ni\/ *   O   O   * \\i\r\n\/=================\\\r\n       |___|`