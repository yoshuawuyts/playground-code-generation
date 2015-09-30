const typekit = require('inject-typekit-script-stream')
const lrScript = require('inject-lr-script-stream')
const watchifyRequest = require('watchify-request')
const toServer = require('wayfarer-to-server')
const sendError = require('send-data/error')
const boleStream = require('bole-stream')
const httpNdjson = require('http-ndjson')
const summary = require('server-summary')
const html = require('simple-html-index')
const browserify = require('browserify')
const sendCss = require('send-data/css')
const match = require('pathname-match')
const wayfarer = require('wayfarer')
const watchify = require('watchify')
const json = require('JSONStream')
const npm = require('rework-npm')
const rework = require('rework')
const myth = require('myth')
const bole = require('bole')
const http = require('http')
const bl = require('bl')
const fs = require('fs')

bole.output({ level: 'info', stream: process.stdout })

const router = toServer(wayfarer('404'))
const staticRouter = toServer(wayfarer())
const logger = bole('server')

// 404
router.on('static', staticRouter)
router.on('404', {
  all: function (req, res) {
    res.statusCode = 404
    res.end()
  }
})

// html
const htmls = html({
  title: 'GIANT SPHERE',
  entry: 'static/bundle.js',
  css: 'static/bundle.css'
})
const htmlBuf = htmls
  .pipe(typekit({ kitId: 'ohj8vea' }))
  .pipe(lrScript())
  .pipe(bl())
router.on('/', { get: (req, res) => htmlBuf.duplicate().pipe(res) })

// js
var b = browserify({
  cache: {},
  packageCache: {},
  entries: [ require.resolve('client-main') ],
  fullPaths: true
})
if (process.env.NODE_ENV === 'development') b = watchify(b)
const handler = watchifyRequest(b)
staticRouter.on('/bundle.js', {
  get: (req, res) => handler(req, res, (err, body) => {
    if (err) {
      logger.error(err)
      return sendError(req, res, { body: 'browserify error' })
    }
    res.end(body)
  })
})

// css
staticRouter.on('/bundle.css', {
  get: (req, res, params) => {
    const source = require.resolve('client-main/index.css')
    fs.readFile(source, 'utf8', function (err, data) {
      if (err) return console.error(err)

      const css = rework(data, {source: source})
        .use(npm({root: source}))
        .use(myth({source: source}))
        .toString()
      sendCss(req, res, css)
    })
  }
})

// create server
const server = http.createServer(function (req, res) {
  httpNdjson(req, res)
    .pipe(json.parse())
    .pipe(boleStream({ level: 'info' }))
  router(match(req.url), req, res)
})

server.listen(1337, summary(server))
