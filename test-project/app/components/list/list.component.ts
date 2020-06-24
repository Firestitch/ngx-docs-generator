import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListFetch } from '../../interfaces/list.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  /** Just Disabled */
  @Input()
  public disabled = false;

  // Just fetch
  @Input()
  public fetch: ListFetch;

  // Just selected
  @Output()
  public selected: EventEmitter<boolean>;

  private _currentPage = 1;
  private _totalPages = 20;

  constructor() {}

  public get currentPage() {
    return this._currentPage;
  }

  public get totalPages() {
    return this._totalPages;
  }


  /**
   * Reload list data
   */
  public reload() {

  }

  /**
   * Go to specified page
   * @param page - just page?
   */
  public goTo(page: number) {

  }

  private _destroy() {

  }
}
