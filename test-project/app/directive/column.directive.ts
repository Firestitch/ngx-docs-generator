import {
  ContentChild,
  Directive,
  Input,
  TemplateRef
} from '@angular/core';

import { ListCellDirective } from './cell.directive';
import { CellConfig } from '../interfaces/cell.interface';


@Directive({
  selector: 'app-list-column'
})
export class ListColumnDirective {

  /** just title */
  @Input()
  public title: string;

  /** just name */
  @Input()
  public name: string;

  /** just show */
  @Input()
  public show = true;

  /** just customize */
  @Input()
  public customize = true;

  /** just sortable */
  @Input()
  public sortable: boolean;

  /** just direction */
  @Input()
  public direction: 'asc' | 'desc';

  @Input()
  public align: string;

  @Input()
  public width: string;

  @Input('class')
  public className: string | string[];

  /**
   * cell template desc
   */
  @ContentChild(ListCellDirective, { read: TemplateRef, static: true })
  public cellTemplate: TemplateRef<any>;

  /**
   * cell config desc
   */
  @ContentChild(ListCellDirective, { static: true })
  public cellConfigs: CellConfig;
}
