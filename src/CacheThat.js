import CacheObject from "./CacheObject.js"
import timeHandler from "./helper/timeHandler.js"

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
