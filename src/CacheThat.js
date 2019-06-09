class CacheObject {
  constructor(value, timer) {
    this.data = value
    this.timer = timer || false
  }
}

function timeHandler(time) {
  if (typeof time === "number") {
    if (time < 0) {
      throw new Error(`CacheThat => Paramter of expired time ( ${time} ) is invaild!`)
    }
    return time
  }
  // Not handle date for now
  else if (typeof time === "string") {
    const regexForTime = /^[1-9]\d+/
    const regexForSeconds = /^[1-9][0-9]+[sS]$/
    const regexForMinutes = /^[1-9][0-9]+[mM]$/
    const regexForHours = /^[1-9][0-9]+[hH]$/
    const regexForDays = /^[1-9][0-9]+[dD]$/

    if (regexForTime.test(time)) {
      return parseInt(time)
    } else if (regexForSeconds.test(time)) {
      return parseInt(time.slice(0, -1)) * 1000
    } else if (regexForMinutes.test(time)) {
      return parseInt(time.slice(0, -1)) * 60 * 1000
    } else if (regexForHours.test(time)) {
      return parseInt(time.slice(0, -1)) * 60 ** 2 * 1000
    } else if (regexForDays.test(time)) {
      return parseInt(time.slice(0, -1)) * 60 ** 2 * 24 * 1000
    } else {
      throw new Error(`CacheThat => Paramter of expired time ( ${time} ) is invaild!`)
    }
  }
}

class CacheThat {
  constructor(expiredTime = false) {
    this.storage = new Map()
    this.defaultExpiredTime = expiredTime === false ? false : timeHandler(expiredTime)
    this.expireCacheHandler = key => {
      this.removeItem(key)
    }
  }

  setItem(key, data, expiredTime) {
    if (expiredTime === false) {
      this.storage.set(key, new CacheObject(data, false))
    } else {
      let time = null

      if (expiredTime === undefined) {
        time = this.defaultExpiredTime
      } else {
        time = timeHandler(expiredTime)
      }

      const timer = setTimeout(() => {
        this.expireCacheHandler(key)
      }, time)

      this.storage.set(key, new CacheObject(data, timer))
    }
  }

  removeItem(key) {
    const target = this.getCacheObject(key)
    if (target !== undefined) {
      clearTimeout(target.timer)
      this.storage.delete(key)
    }
  }

  getCacheObject(key) {
    return this.storage.get(key)
  }

  getItem(key) {
    const obj = this.storage.get(key)
    return obj === undefined ? obj : obj.data
  }

  clear() {
    for (const key of this.storage.keys()) {
      this.removeItem(key)
    }
  }

  countItems() {
    return this.storage.size
  }

  listKeys() {
    return Array.from(this.storage.keys())
  }
}

export default CacheThat
