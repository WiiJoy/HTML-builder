const fs = require('fs');
const path = require('path');

const newReadStream = fs.createReadStream(path.join(__dirname, 'text.txt'))

newReadStream.on('data', res => console.log(res.toString()))
  