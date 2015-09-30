const test = require('tape')
const playgroundCodeGeneration = require('./')

test('should assert input types', function (t) {
  t.plan(1)
  t.throws(playgroundCodeGeneration)
})
