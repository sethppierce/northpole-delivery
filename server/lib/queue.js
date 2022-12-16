'use strict';

class Queue {
  constructor(){
    this.data = {};
  }

  store(key, value){
    this.data[key] = value;
    return key;
  }

  read(key){
    return this.data[key];
  }

  remove(key){
    console.log('data was removed');
    let value = this.data[key];
    delete this.data[key];
    return value;
  }
}

module.exports = Queue