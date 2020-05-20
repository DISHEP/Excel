import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'

export class Table extends ExcelComponent {
  static className = 'table-excel'
  toHTML() {
    return createTable(20)
  }
}
