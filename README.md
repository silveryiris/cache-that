# cache-that

[![dev packages](https://david-dm.org/silveryiris/cache-that.svg)](https://david-dm.org/silveryiris/cache-that?type=dev)

- Save data on the RAM.

- The data size and quantities that can save on RAM is not well tested yet. 

- Simple node server side cache for small project or tests.

- Use the `Window.localStorage` on browser like function names for readability.

- Zero dependency on distribute.

# Install
````
npm i cache-that
````

# Usage

````javascript

import CacheThat from "cache-that"
const cache = new CacheThat()

const testData =  { message: "Hi there" }

// Save data
cache.setItem("customKey", testData)

// get saved data
cache.getItem("customKey")

````
### setItem( key , data , expiredTime )
Default data keep time is forever, but you can modify this by class constructor or `setItem` parameter.

````javascript

import CacheThat from "cache-that"

// Give default data expired time (milliseconds)
const cache = new CacheThat(5566000)

cache.setItem("foo", "Will clear the item after 5566 seconds by default.")

// Can define each item expired time
cache.setItem("bar", "I will be clean out after 1 hour", "1h")

````

## Time format support

````javascript

// Integer only

cache.setItem("Take your time", "ok", 1000)
cache.setItem("Take your time", "ok", "1000")
cache.setItem("Take your time", "ok", "1s")
cache.setItem("Take your time", "ok", "1S")
cache.setItem("Take your time", "ok", "1m")
cache.setItem("Take your time", "ok", "1M")
cache.setItem("Take your time", "ok", "1h")
cache.setItem("Take your time", "ok", "1H")
cache.setItem("Take your time", "ok", "1d")
cache.setItem("Take your time", "ok", "1H")
````

## Display saved keys

````javascript

cache.setItem("Don't", "test")
cache.setItem("stop", "test")
cache.setItem("me", "test")
cache.setItem("now", "test")
cache.setItem("!", "test")

// `keys` sould be [ "Don't", "stop", "me", "now", "!" ]
const keys = cache.listKeys()
````

## Count saved keys

````javascript

cache.setItem("Happy", "test")
cache.setItem("every", "test")
cache.setItem("after", "test")

// `counts` should be 3 
const counts = cache.countItems()
````

## Remove Items

````javascript
cache.setItem("t", "Every")
cache.setItem("t", "day")
cache.setItem("t", "is")
cache.setItem("t", "exactly")
cache.setItem("t", "the")
cache.setItem("t", "same")

// Clear all saved items
cache.clear()

cache.setItem("what I've lost already", "reset")
cache.setItem("gray memory", "reset")
cache.setItem("our future", "reset")

// Only remove the specific one
cache.removeItem("gray memory")
````

# Test

````
npm test
````

# License
Copyright (c) 2019 Wen-Wei Chang, contributors.

Released under the ISC license.
