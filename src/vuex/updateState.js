/**
 *  更新mutation,与 mapFormState配套使用
 */
import _ from '../utils'
export default function updateState($state, { prefixs, state, val }) {
  let target = $state
  for (const prefix of prefixs) {
    target = target[prefix]
    if (!_.isPlainObject(target)) break
  }

  if (_.isPlainObject(target)) {
    target[state] = val
  }
}
