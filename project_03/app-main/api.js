const stream = require('readable-stream')
const json = require('JSONStream')
const level = require('level')

const db = level('/tmp/project_03')

module.exports = api

function api (req, res) {
  if (req.method === 'POST') return create(req, res)
  if (req.method === 'GET') return read(req, res)
  if (req.method === 'UPDATE') return update(req, res)
  if (req.method === 'DELETE') return del(req, res)
}

function create () {
  const ws = new stream.PassThrough()

  db.put('foo', 'bar', function (err, res) {
    const js = json.stringify()
    js.pipe(ws)

    if (err) return js.end({ status: 'notOK' })
    js.end({ status: 'ok' })
  })

  return ws
}

function read () {
  return db.createReadStream()
    .pipe(json.stringify())
}

function update () {

}

function del () {

}
