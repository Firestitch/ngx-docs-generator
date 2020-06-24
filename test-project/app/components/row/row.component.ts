import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Row } from '../../interfaces/row.interface';


@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
})
export class RowComponent {
  @Input()
  public row: Row;

  @Output()
  public expanded: EventEmitter<void>;

  constructor() {}

  /**
   * Just description for toggle function
   * @param open - just description for param
   */
  public toggle(open: boolean) {

  }
}
