import formStore from '../src/index.js'

let { mapFormStates, updateState } = formStore

const store = (states = {}) => ({
  namespace: 'order',
  state: {
    current: {
      name: 'bowen',
      age: 18,
      gender: 'male',
      ...states
    }
  },
  mutations: {
    updateState
  }
})

const Store = (states = {}) => {
  const $store = store(states)
  return {
    state: {
      [$store.namespace]: $store.state
    },
    commit(name, playload) {
      const [namespace, mutation] = name.split('/')
      $store.mutations[mutation].call($store, $store.state, playload)
    }
  }
}

let $store = {}

describe('test default mapper', () => {
  beforeEach(() => {
    mapFormStates = mapFormStates.bind({ $store, store })
  })

  test("mapFormStates('order', ['current'])", () => {
    formStore.install(Store())
    const result = mapFormStates('order', ['current'])
    expect(result.name.get()).toBe('bowen')
    expect(result.age.get()).toBe(18)
  })

  test("commit:mapFormStates('order', ['current'])", () => {
    formStore.install(Store())
    const result = mapFormStates('order', ['current'])
    result.name.set('supperbowen')
    result.age.set(19)
    expect(result.name.get()).toBe('supperbowen')
    expect(result.age.get()).toBe(19)
  })

  test("mapFormStates('order', ['c:current'])", () => {
    formStore.install(Store())
    const result = mapFormStates('order', ['c:current'])
    expect(result.c_name.get()).toBe('bowen')
    expect(result.c_age.get()).toBe(18)
  })

  test("commit:mapFormStates('order', ['c:current'])", () => {
    formStore.install(Store())
    const result = mapFormStates('order', ['c:current'])
    result.c_name.set('supperbowen')
    result.c_age.set(22)
    expect(result.c_name.get()).toBe('supperbowen')
    expect(result.c_age.get()).toBe(22)
  })


  test("mapFormStates('order', [{name:'current.name', gender:'current.gender'])", () => {
    formStore.install(Store())
    const result = mapFormStates('order', [{ name: 'current.name', gender: 'current.gender' }])
    expect(result.name.get()).toBe('bowen')
    expect(result.gender.get()).toBe('male')
  })

  test("commit:mapFormStates('order', [{name:'current.name', gender:'current.gender'])", () => {
    formStore.install(Store())
    const result = mapFormStates('order', [{ name: 'current.name', gender: 'current.gender' }])
    result.name.set('supperbowen')
    result.gender.set('femal')
    expect(result.name.get()).toBe('supperbowen')
    expect(result.gender.get()).toBe('femal')
  })

  test("mapFormStates('order', ['cust:current.customer'])", () => {
    formStore.install(Store({ customer: { name: 'allen', age: 22 } }))
    const result = mapFormStates('order', ['cust:current.customer'])
    expect(result.cust_name.get()).toBe('allen')
    expect(result.cust_age.get()).toBe(22)
  })

  test("commit:mapFormStates('order', ['cust:current.customer'])", () => {
    formStore.install(Store({ customer: { name: 'allen', age: 22 } }))
    const result = mapFormStates('order', ['cust:current.customer'])
    result.cust_name.set('supperbowen')
    result.cust_age.set(18)
    expect(result.cust_name.get()).toBe('supperbowen')
    expect(result.cust_age.get()).toBe(18)
  })

  test("mapFormStates('order', [{name:'customer.name', gender:'customer.gender'}, { cname: current.name }])", () => {
    formStore.install(Store({ customer: { name: 'allen', age: 22 } }))
    const result = mapFormStates('order', [
      { name: 'current.customer.name', age: 'current.customer.age' },
      { cname: 'current.name' }
    ])
    expect(result.name.get()).toBe('allen')
    expect(result.age.get()).toBe(22)
    expect(result.cname.get()).toBe('bowen')
  })

  test("commit:mapFormStates('order', [{name:'customer.name', gender:'customer.gender'}, { cname: current.name }])", () => {
    formStore.install(Store({ customer: { name: 'allen', age: 22 } }))
    const result = mapFormStates('order', [
      { name: 'current.customer.name', age: 'current.customer.age' },
      { cname: 'current.name' }
    ])

    result.name.set('supperbowen')
    result.age.set(18)
    result.cname.set('sssbowen')

    expect(result.name.get()).toBe('supperbowen')
    expect(result.age.get()).toBe(18)
    expect(result.cname.get()).toBe('sssbowen')
  })
})
