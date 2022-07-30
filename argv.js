// const fs = require('node:fs')
// const argv = process.argv
// const { arch } = require('node:process')
// const { argv } = require('node:process')

// argv.forEach((val, index) => {
//     console.log(`${val} - ${index}`)
// })

// console.log(argv)
// console.log(`This process architecture ${arch}`)

// ===========================

const fs = require('node:fs/promises')

const argv = process.argv

const main = async () => {
    let data
    try {
        data = await (fs.readFile('data.json', 'utf-8'))
    } catch {
        data = '[]'
    }
    const content = JSON.parse(data)
    if (argv[2] === '--list') {
        console.table(content)
    } else if (argv[2] === void 0) {
        console.log('Unknown command')
    } else {
        const name = argv[2]
        const age = argv[3]
        content.push({ name, age })
        await fs.writeFile('data.json', JSON.stringify(content, null, 2))
    }

}

main()