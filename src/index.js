import * as mapper from './vuex/mapFormSate'
import _updateState from './vuex/updateState'

export const mapFormStates = mapper.mapFormStates
export const updateState = _updateState

export default {
  mapFormStates,
  updateState,
  install: mapper.install
}
