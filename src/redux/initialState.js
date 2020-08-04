import {defaultStyles, defaultTitle} from '@/constants'
import {clone} from '@core/utils';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  tableName: defaultTitle,
  tableOpen: new Date().toJSON(),
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
  tableOpen: new Date().toJSON()
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}