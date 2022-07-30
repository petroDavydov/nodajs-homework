const fs = require('node:fs')
const argv = process.argv
const { arch } = require('node:process')

console.log(argv)
console.log(`This process architecture ${arch}`)