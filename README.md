# Zombie Node Format

Zombie Node Format (znf) is the configuration format for [zombie nodes]().

The format describes nodes and their properties. The main purpose of this module is to provide tools and a validation schema for working with zombie nodes. It includes a JSON schema validator for the format. 

The format is extensible so other modules can expand it's capabilities and semantics.

## Install

```sh
npm install --save @zombiec0rn/zombie-node-format
```

## Use

```js
var znf = require('@zombiec0rn/zombie-node-format')

try {
  znf.validate(nodes)
} catch(e) {
  console.log(e instanceof znf.exception, e.trace)
}
```

## API

#### `validate(services)`

The main usecase for this module is to validate node configs. See usage example [above](#use). 

#### `random(num, opts)`

Generate random node configs. Useful for testing etc.

```js
var znf = require('@zombiec0rn/zombie-node-format')
var services = znf.random(5, { swarm: 'anklebiters' })
```

#### `schema`

The znf json schema.

#### `exception`

The znf exception throws if bad config.

## Format

```json
{
  "hostname" : "anklebiters-gateway",
  "swarm"    : "anklebiters",
  "engines"  : ["docker:4243"],
  "tags"     : ["google","gateway"],
  "memory": 1779699712,
  "cpus": [
    {
      "model": "Intel(R) Xeon(R) CPU @ 2.60GHz",
      "speed": 2600
    }
  ]
}
```

### `hostname`

The node `hostname`. Considered a unique identifier of te node.

### `swarm`

A swarm is a collection of nodes. A node can be part of a single swarm only.

### `engines` 

Engines is a list of supported service drivers on the node. 

### `tags` 

A list of tags.

### `memory`

The memory capacity of the node.

### `cpus` 

The cpu capacity of the node. A list of cpus.

## Changelog

### 1.0.0

* Initial release :tada:
