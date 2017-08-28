var wrap = (wrapper, current) => {
  if (typeof wrapper === 'function') {
    return wrapper(current)
  }

  return current()
}

var waterfall = (list, wrapper) => {
  var getTask = () => {
    return (list || []).shift()
  }

  var exec = () => {
    return new Promise((resolve, reject) => {
      var task = getTask()
      if (task) {
        resolve(Promise.resolve(wrap(wrapper, task))
        .then(() => {
          return exec()
        }))
      } else {
        resolve()
      }
    })
  }

  return exec()
}

module.exports = waterfall
