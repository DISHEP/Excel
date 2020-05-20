import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'formula-excel'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    })
  }

  toHTML() {
    return `
    <div class="formula-excel__info">fx</div>
    <div class="formula-excel__input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    console.log(this.$root)
    console.log('Formula: onInput', event.target.textContent.trim())
  }

  onClick() {
    console.log('click')
  }
}