const fs = require('fs');
const path = require('path');

const newWriteStream = fs.createWriteStream(path.join(__dirname, 'output.txt'))

process.stdout.write('Hello! Enter text:')

process.on('SIGINT', () => {
    process.stdout.write('Goodbuy!')
    process.exit()
})

process.stdin.on('data', text => {
    if (text.toString().trim() === 'exit') {
        process.stdout.write('Goodbuy!')
        process.exit()
    }

    newWriteStream.write(text)
})

