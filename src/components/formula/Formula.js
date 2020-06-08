import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'formula-excel'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
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
      this.$formula.text($cell.data.value)
    })
  }
  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }

  onInput(event) {
    const text = $(event.target).text()
    this.$emit('formula:input', text)
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