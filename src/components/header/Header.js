import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className = 'header-excel'
  toHTML() {
    return `
      <input type="text" class="header-excel__input" value="Новая таблица" />

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
}