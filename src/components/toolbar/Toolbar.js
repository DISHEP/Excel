import {ExcelComponent} from '@core/ExcelComponent'

export class Toolbar extends ExcelComponent {
  static className = 'toolbar-excel'

  constructor($root) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click']
    });
  }
  toHTML() {
    return `
        <a href="#" class="btn">
            <span class="material-icons">format_align_left</span>
        </a>
        <a href="#" class="btn">
            <span class="material-icons">format_align_center</span>
        </a>
        <a href="#" class="btn">
            <span class="material-icons">format_align_right</span>
        </a>
        <a href="#" class="btn">
            <span class="material-icons">format_bold</span>
        </a>
        <a href="#" class="btn">
            <span class="material-icons">format_italic</span>
        </a>
        <a href="#" class="btn">
            <span class="material-icons">format_underlined</span>
        </a>
    `
  }

  onClick(event) {
    console.log(event.target)
  }
}