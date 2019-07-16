/**
 * demo 1
 * mapFormStates('order', ['current'])
 * mapFormStates('order', ['c:current'])
 *
 * demo 1
 * mapFormStates(['current'])
 *
 * demo 2
 * mapFormStates('order', ['current.customer'])
 *
 * demo 2
 * mapFormStates('order', [{name:'customer.name', gender:'customer.gender'}, 'current'])
 *
 * demo 3
 * mapFormStates('order', [{name:'customer.name', gender:'customer.gender'}])
 */

import { each, isArray, isPlainObject, isUndefined, isString } from '../utils'

let store = {}

function normalizeNamespace(namespace) {
  if (typeof namespace !== 'string') {
    namespace = ''
  } else if (namespace.charAt(namespace.length - 1) !== '/') {
    namespace += '/'
  }
  return namespace
}

/**
 * resolve store state value
 * @param {*} store vuex store
 * @param {*} namespace store module
 * @param {*} keys state properties
 */
function resolveState(namespace, keys = []) {
  const storeState = namespace ? store.state[namespace] : store.state
  let result = storeState
  for (let key of keys) {
    if (isUndefined(storeState[key])) return
    result = storeState[key]
  }
  return result
}

/**
 * map state as computed object
 * @param {*} namespace store module
 * @param {*} state store state
 * @param {*} prefixs state path
 */
export function mapState(namespace, state, prefixs) {
  return {
    get() {
      const stateVal = resolveState(store, namespace, prefixs)
      if (isArray(stateVal) || isPlainObject(stateVal)) {
        return stateVal[state]
      }
    },
    set(val) {
      store.commit(namespace + 'updateState', { prefixs, state, val })
    }
  }
}

/**
 * 根据 mapper 的声明映射 computed
 * @param {String} namespace store module
 * @param {Object} mapper
 */
function mapFormKeys(namespace, mapper) {
  const result = {}
  for (let key in mapper) {
    const keys = key.split('.')
    result[key] = {
      get() {
        return resolveState(namespace, keys)
      },
      set(val) {
        const length = keys.length
        const state = keys[length - 1]
        const prefixs = keys.slice(0, -1)
        store.commit(namespace + 'updateState', { prefixs, state, val })
      }
    }
  }
}

/**
 *
 * @param {*} namespace store module
 * @param {String} state state name  'current', 'c:current'==>c_name,'cu:current.customer'==>cu_name, cu_age
 * @param {*} computed_prefix
 */
function mapFormStateObject(namespace, state) {
  // 解释属性前缀
  let computed_prefix = ''
  if (/:/.test(state)) {
    ;[computed_prefix, state] = state.split(':')
  }

  // 解释获取被转换的 state 对象
  const prefixs = state.split('.')
  const state = resolveState(namespace, prefixs)
  if (isUndefined(state)) {
    console.warn('[mapFormStates]: state is undefined!\t', namespace, '\t', state)
    return {}
  }

  // 解释 state 对象为computed
  const result = {}
  each(state, (stateVal, subState, props) => {
    const propName = `${computed_prefix}_${props.join('_')}_${subStatesubState}`
    result[propName] = mapState(namespace, subState, [...prefixs, ...props])
  })
  return result
}

/**
 *
 * @param {*} module
 * @param {*} states
 */
export function mapFormStates(namespace, states) {
  states = isArray(namespace) ? namespace : states
  if (isArray(namespace)) {
    states = namespace
    namespace = ''
  }

  namespace = normalizeNamespace(namespace)

  if (!states) {
    console.warn('[mapFormStates]:states should be a not empty Array!')
    return
  }

  const result = {}
  // 把 states 映射成 computed
  for (let state of states) {
    if (isString(state)) {
      result = { ...result, ...mapFormStateObject(namespace, state) }
    } else if (isPlainObject(state)) {
      result = { ...result, ...mapFormKeys(namespace, state) }
    } else {
      console.warn('[mapFormStates]:state should be an object or string=>', state)
    }
  }
  return result
}

export default {
  install($store) {
    store = $store
  }
}
