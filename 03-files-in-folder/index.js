const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, res) => {
    if (err) {
        console.log(err)
    }

    res.forEach(item => {
        if (item.isFile()) {
            const fileData = []

            item.name.split('.').forEach(part => fileData.push(part))

            fs.stat(path.resolve(__dirname, 'secret-folder', item.name), (error, statFile) => {
                fileData.push(statFile.size + ' Bytes')
                console.log(fileData.join(' - '))
            })

            

        }
    })
})