import * as mapper from './vuex/mapFormSate'
import _updateState from './vuex/updateState'

export const mapStates = mapper.mapStates
export const updateState = _updateState

export default {
  updateState,
  mapStates,
  install: mapper.installAsPlugin
}
