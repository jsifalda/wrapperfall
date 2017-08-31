var wrap = (wrapper, current) => {
  if (typeof wrapper === 'function') {
    return wrapper(current)
  }

  return current()
}

var waterfall = (list, wrapper) => {
  var tasks = (list || []).slice(0)
  var getTask = () => {
    return tasks.shift()
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
