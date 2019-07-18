import _ from '../utils'

let store = {}
export function setStore(_store) {
  store = _store
}

export function commit(name, playload) {
  store.commit(name, playload)
}

export function dispatch(name, playload) {
  store.dispatch(name, playload)
}

/**
 * resolve store state value
 * @param {*} store vuex store
 * @param {*} namespace store module
 * @param {*} keys state properties
 */
export function resolveState(namespace, keys = []) {
  const storeState = namespace ? store.state[namespace] : store.state
  let result = storeState
  for (let key of keys) {
    result = result[key]
    if (_.isUndefined(result)) break
  }
  return result
}
