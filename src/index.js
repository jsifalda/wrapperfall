var waterfall = (...args) => { // list, init, wrapper
  var list = args.shift()
  var init = null
  var wrapper = null
  if (args.length === 1 && typeof args[0] === 'function') {
    wrapper = args.shift()
  } else if (args.length === 2) {
    init = args.shift()
    wrapper = args.shift()
  }

  return list.reduce((prev, current) => {
    return prev.then((x) => {
      if (typeof wrapper === 'function') {
        return wrapper(current)
      }

      return current(x)
    })
  }, Promise.resolve(init))
}

module.exports = waterfall
