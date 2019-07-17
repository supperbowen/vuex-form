/**
 *  更新mutation,与 mapFormState配套使用
 */
export default function updateState($state, { prefixs, state, val }) {
  let target = $state
  for (const prefix of prefixs) {
    target = target[prefix]
    if (!isPlainObject(target)) break
  }

  if (isPlainObject) {
    target[state] = val
  }
}
