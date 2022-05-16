const fs = require('fs');
const path = require('path');

fs.rm(path.join(__dirname, 'files-copy'), {force: true}, () => {
    fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, () => {
        fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, res) => {
            if (err) {
                console.log(err)
            }
    
            res.forEach(item => {
                if (item.isFile()) {
                    fs.copyFile(path.join(__dirname, 'files', item.name), path.join(__dirname, 'files-copy', item.name), () => {})
                }
            })
        })
    })

    
})


