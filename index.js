var env = require('jjv')()
var assign = require('object.assign')
var utils = require('./utils')
var schema = require('./schema.json')

var ZNFException = function(message, trace) {
	this.message  = message
	this.trace    = trace
	this.toString = function() {
		return this.message + '. Details in e.trace.'
	}
}

env.addSchema('znf', schema)
env.addSchema('znf-multiple', {
	type  : 'array',
	items : {
		'$ref' : "#/definitions/znf"
	},
	definitions : {
		"znf" : schema
	}
})

module.exports = {
	schema : schema,
	validate : function(config) {
		if (!(typeof config == 'object')) config = JSON.parse(config)
		var _config = (config instanceof Array) ? config : [config]
		var err = env.validate('znf-multiple', _config)
		if (err) throw new ZNFException('Invalid config', err)
		return config
	},
	exception : ZNFException,
  random: function(num, opts) {
    opts = opts || {}
    return Array.apply(null, {length: num}).map(function(value, index){
      var c = utils.randomExampleNode()
      assign(c, opts)
      return c
    })
  }
}
