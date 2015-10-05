const cliclopts = require('cliclopts')
const minimist = require('minimist')

const main = require('app-main')

const opts = cliclopts([
  {
    name: 'help',
    abbr: 'h',
    boolean: true
  },
  {
    name: 'port',
    abbr: 'p',
    default: 1337
  }
])

const argv = minimist(process.argv.slice(2), opts.options())
main(argv)
