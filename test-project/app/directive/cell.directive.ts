import { Directive, Input } from '@angular/core';


@Directive({ selector: '[app-list-cell]' })
export class ListCellDirective {
  @Input()
  public colspan: number;

  @Input()
  public align: string;

  @Input('class')
  public className: string | string[];
}
