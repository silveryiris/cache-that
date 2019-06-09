function timeHandler(time) {
  if (typeof time === "number") {
    if (time < 0) {
      throw new Error(`CacheThat => Paramter of expired time ( ${time} ) is invaild!`)
    }
    return time
  }
 
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

export default timeHandler
