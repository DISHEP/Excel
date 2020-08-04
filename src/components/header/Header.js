import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import * as actions from '@/redux/actions'
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'header-excel'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
          <a href="javascript:void(0);" data-action="delete" class="btn">
              <span class="material-icons">delete</span>
          </a>
          <a href="#" class="btn" data-action="exit">
              <span class="material-icons">exit_to_app</span>
          </a>
      </div>
    `
  }

  onInput(event) {
    const value = $(event.target).text()
    this.$dispatch(actions.tableName(value))
  }

  onClick(event) {
    let $target = $(event.target)
    if ($target !== 'a') {
      $target = $target.closest('a')
    }
    if ($target.$el !== null) {
      if ($target.data.action === 'delete') {
        const decision = confirm('Вы действительно хотите удалить эту таблицу?')
        if (decision) {
          localStorage.removeItem('excel:'+ActiveRoute.param)
          ActiveRoute.navigation('')
        }
      } else if ($target.data.action === 'exit') {
        ActiveRoute.navigation('')
      }
    }
  }
}