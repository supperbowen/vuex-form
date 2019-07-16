import isFunction from './isFunction'
import isPlainObject from './isPlainObject'

function eachObject(obj, handler, prefixs) {
  for (let key in obj) {
    const subProp = obj[key]
    if (isPlainObject(obj)) {
      each(subProp, handler, [...prefixs, key])
    } else {
      handler(subProp, key, prefixs) // prop, key, prefixs
    }
  }
}

export default function each(obj, handler, prefixs = []) {
  if (!isFunction(handler)) return
  if (!isPlainObject(obj)) return

  eachObject(obj, handler, prefixs)
}
