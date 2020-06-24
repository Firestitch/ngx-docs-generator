import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Row } from '../../classes/row';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
})
export class BodyComponent {
  @Input()
  public rows: Row[];
}
