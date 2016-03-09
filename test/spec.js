var assert   = require('assert')
var clone    = require('clone')
var znf      = require('../index')

describe('Zombie Node Format', function() {

	it('can validate a valid a single object', function() {
    var config = znf.random(1)[0]
    try {
		  assert(znf.validate(config) == config)
    } catch(e) {
      console.log(JSON.stringify(e.trace))
    }
	})

	it('can validate a valid json string', function() {
    var config = znf.random(1)[0]
		assert(typeof znf.validate(JSON.stringify(config)) == 'object')
	})

	it('can validate multiple', function() {
    var multiple = znf.random(5)
		assert(znf.validate(multiple) == multiple)
		assert(typeof znf.validate(JSON.stringify(multiple)) == 'object')
	})

	it('will not validate hostnames with invalid chars', function() {
    var config = znf.random(1)[0]
		config.hostname  = "yo lo"
		try { znf.validate(config) } catch(e) { assert(e instanceof znf.exception) }
		config.hostname  = "☃"
		try { znf.validate(config) } catch(e) { assert(e instanceof znf.exception) }
	})

	it('will not validate swarm as anything but a string', function() {
		var config = znf.random(1)[0] 
		config.swarm = 2
		try { znf.validate(config) } catch(e) { 
			assert(e instanceof znf.exception) 
			assert(e.trace.validation[0].schema.swarm.type == 'string')
		}
	})

	it('will not validate engines as anything but an array', function() {
		var config = znf.random(1)[0] 
		config.engines = false
		try { 
      znf.validate(config) 
      assert(false)
    } catch(e) {
			assert(e instanceof znf.exception) 
			assert(e.trace.validation[0].schema.engines.type == 'array')
		}
	})

	it('will not validate tags as anything but an array', function() {
		var config = znf.random(1)[0] 
		config.tags = 2
		try { 
      znf.validate(config) 
      assert(false)
    } catch(e) {
			assert(e instanceof znf.exception) 
			assert(e.trace.validation[0].schema.tags.type == 'array')
		}
	})

	it('will not validate memory as anything but an integer', function() {
		var config = znf.random(1)[0] 
		config.memory = "yolo"
		try { 
      znf.validate(config) 
      assert(false)
    } catch(e) {
			assert(e instanceof znf.exception) 
			assert(e.trace.validation[0].schema.memory.type == 'integer')
		}
	})

	it('will not validate cpus as anything but an array', function() {
		var config = znf.random(1)[0] 
		config.cpus = false
		try { 
      znf.validate(config) 
      assert(false)
    } catch(e) {
			assert(e instanceof znf.exception) 
			assert(e.trace.validation[0].schema.cpus.type == 'array')
		}
	})

	it('will not validate 0 cpus', function() {
		var config = znf.random(1)[0] 
		config.cpus = [] 
		try { 
      znf.validate(config) 
      assert(false)
    } catch(e) {
			assert(e instanceof znf.exception) 
			assert(e.trace.validation[0].schema.cpus.minItems == true)
		}
	})

	it('will not validate cpus without speed', function() {
		var config = znf.random(1)[0] 
		config.cpus = [{}] 
		try { 
      znf.validate(config) 
      assert(false)
    } catch(e) {
			assert(e instanceof znf.exception) 
		}
	})

  it('can generate random test nodes', function() {
    var nodes = znf.random(5, { swarm: 'anklebiters' })
    assert(nodes instanceof Array)
    assert(nodes.length == 5)
    nodes.forEach(function(c) {
      assert(c.swarm == 'anklebiters')
    })
  })

})
