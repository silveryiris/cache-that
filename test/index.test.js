import CacheThat from "../src/CacheThat.js"
import CacheThatCJS from "../dist/CacheThat.cjs.js"
import CacheThatESM from "../dist/CacheThat.esm.js"
import { expect } from "chai"

describe("Test cjs version distribution", () => {
  it("Can save items", () => {
    const cache = new CacheThatCJS("1m")
    cache.setItem("test", {})
    cache.clear()
  })
})

describe("Test esm version distribution", () => {
  it("Can save items", () => {
    const cache = new CacheThatESM("1m")
    cache.setItem("test", {})
    cache.clear()
  })
})

describe("Cache to system memory", () => {
  it("Can save items", () => {
    const cache = new CacheThat()
    const key = "test"
    const value = "Happy Ever After."
    cache.setItem(key, value)
    const result = cache.getItem(key)

    expect(result).equal(value)
    cache.clear()
  })

  it("Can delete item by key", () => {
    const cache = new CacheThat()

    const key = "test1"
    cache.setItem(key, "forever")
    cache.removeItem(key)
    const counts = cache.countItems()

    expect(counts).equal(0)
  })

  it("Can safely handle remove not exist key", () => {
    const cache = new CacheThat()

    const key = "I'm a bad key."
    cache.removeItem(key)
    const counts = cache.countItems()

    expect(counts).equal(0)
  })

  it("Can clean out data by default expired time", done => {
    const cache = new CacheThat(2000)
    const delayedTime = 3000
    cache.setItem("test1", "expired after a while")
    expect(cache.countItems()).equal(1)

    setTimeout(() => {
      expect(cache.countItems()).equal(0)
      done()
    }, delayedTime)
  })

  it("Can list all saved keys", () => {
    const cache = new CacheThat()
    cache.setItem("test1", "Don't")
    cache.setItem("test2", "stop")
    cache.setItem("test3", "me")
    cache.setItem("test4", "now!")
    const keys = cache.listKeys()

    expect(keys).members(["test1", "test2", "test3", "test4"])
    cache.clear()
  })

  it("Can count how many not expired items saved on memory", () => {
    const cache = new CacheThat()
    cache.setItem("test1", "Every")
    cache.setItem("test2", "day")
    cache.setItem("test3", "is")
    cache.setItem("test4", "exactly")
    cache.setItem("test5", "the")
    cache.setItem("test6", "same")

    const counts = cache.countItems()

    expect(counts).equal(6)
    cache.clear()
  })

  it("Can clear all items at once", () => {
    const cache = new CacheThat()
    cache.setItem("test1", "Take")
    cache.setItem("test2", "me")
    cache.setItem("test3", "home")
    cache.setItem("test4", "contry")
    cache.setItem("test5", "road")

    cache.clear()
    const counts = cache.countItems()

    expect(counts).equal(0)
  })
})
