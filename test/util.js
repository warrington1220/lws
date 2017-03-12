'use strict'
const TestRunner = require('test-runner')
const util = require('../lib/util')
const a = require('assert')
const request = require('req-then')

const runner = new TestRunner()

runner.test('.parseCommandLineOptions()', function () {
  process.argv = [ 'node', 'example.js', '--help' ]
  const cliOptions = util.parseCommandLineOptions()
  a.strictEqual(cliOptions._all.help, true)
})

runner.test('.parseCommandLineOptions(): with extra feature options', function () {
  process.argv = [ 'node', 'script.js', '--one' ]
  let options
  try {
    options = util.parseCommandLineOptions()
    throw new Error("shouldn't reach here")
  } catch (err) {
    a.strictEqual(err.name, 'UNKNOWN_OPTION')
  }

  process.argv = [ 'node', 'script.js', '--one', '--stack', 'test/fixture/feature.js' ]
  options = util.parseCommandLineOptions()
  a.strictEqual(options._all.one, true)
})