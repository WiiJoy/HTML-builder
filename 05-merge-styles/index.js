const fs = require('fs');
const path = require('path');

const writeBundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'))

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, res) => {
    if (err) {
        console.log(err)
    }

    res.forEach(item => {

        if (item.isFile() && path.extname(item.name) === '.css') {
            fs.readFile(path.join(__dirname, `styles`, item.name), (err, data) => {
                writeBundle.write(data)
            })
        }
    })
})