class CacheObject {
  constructor(value, timer) {
    this.data = value
    this.timer = timer || false
  }
}

export default CacheObject
