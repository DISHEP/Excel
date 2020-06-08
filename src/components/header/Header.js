import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import * as actions from '@/redux/actions'
import {debounce} from '@core/utils';

export class Header extends ExcelComponent {
  static className = 'header-excel'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      subscribe: ['tableName'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML(state) {
    const value = this.store.getState().tableName
    return `
      <input type="text" class="header-excel__input" value="${value}" />

      <div class="header-excel__buttons">
          <a href="#" class="btn">
              <span class="material-icons">delete</span>
          </a>
          <a href="#" class="btn">
              <span class="material-icons">exit_to_app</span>
          </a>
      </div>
    `
  }

  onInput(event) {
    const value = $(event.target).text()
    this.$dispatch(actions.tableName(value))
  }
}