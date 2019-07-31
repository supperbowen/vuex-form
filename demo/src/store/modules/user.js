import { updateState } from '../../../../src/index'
export default {
  namespaced: true,
  state: {
    current: {
      name: 'bowen',
      age: 18,
      gender: 'male',
      job: 'FE'
    }
  },
  mutations: {
    updateState: updateState
  }
}
