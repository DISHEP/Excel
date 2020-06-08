import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

const CODES = {
  A: 65,
  Z: 90
}
function toCell(row, state) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const text = state.dataState[id] || ''
    const styles = `${toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })};`
    return `
      <div 
        class="cell" 
        contenteditable 
        data-col="${col}"
        data-type="cell"
        data-id="${id}"
        data-value="${text}"
        ${width}
        style="${styles}"
      >${parse(text)}</div>
    `
  }
}

function toColumn(state) {
  return function(col, index,) {
    const width = getWidth(state, index)
    return `
    <div class="column" 
         data-type="resizable" 
         data-col="${index}"
         ${width}
         >
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
  }
}

function createRow(index, content, state) {
  const height = getHeight(state, index)
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" 
         data-type="resizable" 
         ${index ? `data-row="${index}"` : ''}
         ${height}
        >
        <div class="row-info">
            ${index ? index : ''}
            ${resize}
         </div>
        <div class="row-data">${content}</div>
    </div>
  `
}

function getWidth(state, index) {
  return state[index]
      ? `style="width: ${state[index]}px"`
      : ''
}

function getHeight(state, index) {
  return state[index]
      ? `style="height: ${state[index]}px"`
      : ''
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn(state.colState))
      .join('')
  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state))
        .join('')
    rows.push(createRow(row + 1, cells, state.rowState))
  }
  return rows.join('')
}