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

import _ from '../utils'
import { resolveState, setStore, commit } from './store'

function normalizeNamespace(namespace) {
  if (typeof namespace !== 'string') {
    namespace = ''
  } else if (namespace.charAt(namespace.length - 1) !== '/') {
    namespace += '/'
  }
  return namespace
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
      const stateVal = resolveState(namespace, prefixs)
      if (_.isArray(stateVal) || _.isPlainObject(stateVal)) {
        return stateVal[state]
      }
    },
    set(val) {
      commit(normalizeNamespace(namespace) + 'updateState', { prefixs, state, val })
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
  for (const key in mapper) {
    const props = mapper[key].split('.')
    const state = props.pop()
    result[key] = mapState(namespace, state, props)
  }
  return result
}

/**
 * map object properties as computed
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
  const stateValue = resolveState(namespace, prefixs)
  if (_.isUndefined(stateValue)) {
    console.warn('[mapFormStates]: state is undefined!\t', namespace, '\t', stateValue)
    return {}
  }

  // 解释 state 对象为computed
  const result = {}
  _.each(stateValue, (stateVal, subState, props) => {
    const postfix = str => (str ? str + '_' : '')
    const propName = `${postfix(computed_prefix)}${postfix(props.join('_'))}${subState}`
    result[propName] = mapState(namespace, subState, [...prefixs, ...props])
  })
  return result
}

/**
 * 对外暴露的映射方法
 * @param {*} namespace
 * @param {*} states
 */
export function mapStates(namespace, states) {
  states = _.isArray(namespace) ? namespace : states
  if (_.isArray(namespace)) {
    states = namespace
    namespace = ''
  }

  if (!states) {
    console.warn('[mapFormStates]:states should be a not empty Array!')
    return
  }

  const validStates = []
  // 把 states 映射成 computed
  for (let state of states) {
    if (_.isString(state) || _.isPlainObject(state)) {
      validStates.push({ namespace, computed: state })
    } else {
      console.warn('[mapFormStates]:state should be an object or string=>', state)
    }
  }

  return {
    $mapFormStateObject() {
      return validStates
    }
  }
}

/**
 * 把 $mapFormStateObject 声明转换成 computeds
 * @param {vue} vueInstance VUE 实例
 */
function updateComputedsOnCreate(vueInstance, options) {
  const computed = vueInstance.$options.computed || {}
  const states = computed.$mapFormStateObject && computed.$mapFormStateObject()
  if (!states) return {}

  setStore(vueInstance.$store)
  let storeComputeds = {}
  for (const state of states) {
    if (_.isString(state.computed)) {
      storeComputeds = { ...storeComputeds, ...mapFormStateObject(state.namespace, state.computed) }
    } else if (_.isPlainObject(state.computed)) {
      storeComputeds = { ...storeComputeds, ...mapFormKeys(state.namespace, state.computed) }
    }
  }

  vueInstance.$delete(computed, '$mapFormStateObject')
  vueInstance.$options.computed = { ...computed, ...storeComputeds }
}

/**
 * 作为 vue 插件引入
 */
export function installAsPlugin(Vue, options) {
  Vue.mixin({
    beforeCreate() {
      updateComputedsOnCreate(this, options)
    }
  })
}
