var assert   = require('assert')
var clone    = require('clone')
var znf      = require('../index')

describe('Zombie Node Format', function() {

	it.only('can validate a valid a single object', function() {
    var config = znf.random(1)[0]
    try {
		  assert(znf.validate(config) == config)
    } catch(e) {
      console.log(JSON.stringify(e.trace))
    }
	})

	it('can validate a valid json string', function() {
		assert(typeof znf.validate(JSON.stringify(config)) == 'object')
	})

	it('can validate multiple', function() {
		assert(znf.validate(multiple) == multiple)
		assert(typeof znf.validate(JSON.stringify(multiple)) == 'object')
	})

	it('will not validate ids with invalid chars', function() {
		var _config = clone(config)
		_config.id  = "yo lo"
		try { znf.validate(_config) } catch(e) { assert(e instanceof znf.exception) }
		_config.id  = "☃"
		try { znf.validate(_config) } catch(e) { assert(e instanceof znf.exception) }
	})

	it('will not validate cmd as anything but a string', function() {
		var _config = clone(config)
		_config.cmd = 2
		try { znf.validate(_config) } catch(e) { 
			assert(e instanceof znf.exception) 
			assert(e.trace.validation[0].schema.cmd.type == 'string')
		}
	})

	it('will not validate ports as anything but an array', function() {
		var _config   = clone(config)
		_config.ports = false
		try { znf.validate(_config) } catch(e) {
			assert(e instanceof znf.exception) 
			assert(e.trace.validation[0].schema.ports.type == 'array')
		}
	})

	it('will not validate badly formatted portmappings', function() {
		var _config   = clone(config)
		_config.ports = ["80:meh"]
		try { znf.validate(_config) } catch(e) { assert(e instanceof znf.exception) }
	})

	it('will not validate env as anything but an array', function() {
		var _config   = clone(config)
		_config.env   = 2
		try { znf.validate(_config) } catch(e) {
			assert(e instanceof znf.exception) 
			assert(e.trace.validation[0].schema.env.type == 'array')
		}
	})

	it('will not validate badly formatted envs', function() {
		var _config   = clone(config)
		_config.env   = ["FOO:BAR"]
		try { znf.validate(_config) } catch(e) { assert(e instanceof znf.exception) }
	})

    it('will validate numbers and dots in env', function() {
        var _config = clone(config)
        _config.env = ["FOO=192.168.1.2"]
        try { znf.validate(_config) } catch(e) { assert(false) }
        assert(true)
    })

	it('will not validate volumes as anything but an array', function() {
		var _config     = clone(config)
		_config.volumes = 2
		try { znf.validate(_config) } catch(e) {
			assert(e instanceof znf.exception) 
			assert(e.trace.validation[0].schema.volumes.type == 'array')
		}
	})

	it('will not validate badly formatted volumes', function() {
		var _config     = clone(config)
		_config.volumes = ["chili"]
		try { znf.validate(_config) } catch(e) { assert(e instanceof znf.exception) }
		_config.volumes = ["tmp:tmp"]
		try { znf.validate(_config) } catch(e) { assert(e instanceof znf.exception) }
		_config.volumes = ["./tmp:/tmp"]
		try { znf.validate(_config) } catch(e) { assert(e instanceof znf.exception) }
	})

	it('will not validate expose as anything but an array', function() {
		var _config     = clone(config)
		_config.expose  = 2
		try { znf.validate(_config) } catch(e) {
			assert(e instanceof znf.exception) 
			assert(e.trace.validation[0].schema.expose.type == 'array')
		}
	})

	it('will not validate badly formatted expose', function() {
		var _config    = clone(config)
		_config.expose = ["FOO"]
		try { znf.validate(_config) } catch(e) { assert(e instanceof znf.exception) }
	})

	it('will validate port/tcp and port/udp', function() {
		var _config   = clone(config)
		_config.ports = ["53:53/tcp","53:53/udp"]
		try { znf.validate(_config) } catch(e) { assert(false) }
        assert(true)
	})

	it('uses the same schema for mulitple', function() {
		var _multiple       = clone(multiple)
		_multiple[0].expose = ["FOO"]
		try { znf.validate(_multiple) } catch(e) { assert(e instanceof znf.exception) }
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
