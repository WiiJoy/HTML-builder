const fs = require('fs');
const path = require('path');

const styles = []
const writeBundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'))

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, res) => {
    if (err) {
        console.log(err)
    }

    res.forEach(item => {
        console.log(item.name)
        // if (item.isFile()) {
        //     fs.copyFile(path.join(__dirname, 'files', item.name), path.join(__dirname, 'files-copy', item.name), () => {})
        // }

        if (item.isFile() && path.extname(item.name) === '.css') {
            fs.readFile(path.join(__dirname, `styles`, item.name), (err, data) => {
                writeBundle.write(data)
                // console.log(data.toString())
                // styles.push(data.toString())
                // console.log(styles)
            })
        }
    })

    // console.log(styles)
})