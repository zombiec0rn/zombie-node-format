var randomString = require('random-string')
var randomNumber = require('random-number')
var bytes        = require('bytes')

var tags = [
  'google',
  'aws',
  'digitalocean',
  'gateway',
  'worker',
  'database',
  'api',
  'iot'
]

var engines = [
  'docker:4243'
]

var memory = [
  '500MB',
  '1GB',
  '2GB',
  '7GB'
]

var cpus = [
  {
    'model': 'Intel(R) Xeon(R) CPU @ 2.60GHz',
    'speed': 2600
  }
]

function randomInt(min, max) {
  return randomNumber({
    min: min,
    max: max,
    integer: true
  })
}

function randomFromArray(arr, process) {
  process = process || function(i) { return i }
  return process(arr[Math.floor(Math.random() * arr.length)])
}

function randomsFromArray(arr, num, process) {
  return Array.apply(null, { length: num }).map(function() {
    return randomFromArray(arr, process)
  })
}

function randomExampleNode(opts) {
  var port = randomNumber({ min: 1000, max: 5000, integer: true })
  var path = randomString()
  return {
    'hostname' : randomString(),
    'swarm'    : randomString(),
    'engines'  : [randomFromArray(engines)],
    'tags'     : randomsFromArray(tags, randomInt(1,3)),
    'memory'   : randomFromArray(memory, bytes),
    'cpus'     : randomsFromArray(cpus, randomInt(1,3))
  }
}

module.exports = {
  randomExampleNode: randomExampleNode
}
