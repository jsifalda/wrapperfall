var wrap = (wrapper, current) => {
  var result = null
  if (typeof wrapper === 'function') {
    result = wrapper(current)
  } else {
    result = current()
  }

  return Promise.resolve(result)
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
        resolve(wrap(wrapper, task)
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
