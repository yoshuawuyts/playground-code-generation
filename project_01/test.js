const test = require('tape')
const project01 = require('./')

test('should assert input types', function (t) {
  t.plan(1)
  t.throws(project01)
})
