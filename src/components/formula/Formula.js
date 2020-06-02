import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'formula-excel'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  toHTML() {
    return `
    <div class="formula-excel__info">fx</div>
    <div class="formula-excel__input" 
         contenteditable 
         spellcheck="false" 
         data-el="formula"
    ></div>
    `
  }

  init() {
    super.init()
    this.$formula = $('[data-el="formula"]')
    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }


  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
    ]
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}