const fs = require('fs');
const path = require('path');

fs.rm(path.join(__dirname, 'project-dist'), {force: true, recursive: true}, (err) => {
    if (err) console.log(err)

    fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
        if (err) console.log(err)

        mkdirAndCopy('assets')

        createStyleBundle()

        createHtml()
    })
})

function mkdirAndCopy(dirName, ...dirPath) {
    fs.rm(path.join(__dirname, 'project-dist', ...dirPath, dirName), {force: true}, () => {
        fs.mkdir(path.join(__dirname, 'project-dist', ...dirPath, dirName), {recursive: true}, () => {
            fs.readdir(path.join(__dirname, ...dirPath, dirName), {withFileTypes: true}, (err, res) => {
                if (err) {
                    console.log(err)
                }
        
                res.forEach(item => {
                    if (item.isFile()) {
                        fs.copyFile(path.join(__dirname, ...dirPath, dirName, item.name), path.join(__dirname, 'project-dist', ...dirPath, dirName, item.name), () => {})
                    }

                    if (item.isDirectory()) {
                        mkdirAndCopy(item.name, ...dirPath, dirName)
                    }
                })
            })
        })
    })
}

function createStyleBundle() {
    const writeStyle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'))

    fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, res) => {
        if (err) {
            console.log(err)
        }

        res.forEach(item => {

            if (item.isFile() && path.extname(item.name) === '.css') {
                fs.readFile(path.join(__dirname, `styles`, item.name), (err, data) => {
                    if (err) console.log(err)
                    writeStyle.write(data)
                    writeStyle.write('\n')
                })
            }
        })
    })
}

function createHtml() {
    let htmlText = ''

    const newReadStream = fs.createReadStream(path.join(__dirname, 'template.html'))

    newReadStream.on('data', res => {
        htmlText = res.toString()

        fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (err, res) => {
            if (err) console.log(err)

            res.forEach(item => {

                if (item.isFile() && path.extname(item.name) === '.html') {
                    fs.readFile(path.join(__dirname, `components`, item.name), (err, data) => {
                        if (err) console.log(err)
                        
                        htmlText = htmlText.replace(`{{${item.name.slice(0, -5)}}}`, data.toString())

                        const newHtml = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'))
                        newHtml.write(htmlText)
                    })
                }
            })
        })

    })
}