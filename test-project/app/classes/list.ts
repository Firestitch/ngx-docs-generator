import { ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Base } from './base';


export class List extends Base {
  public initialized$ = new BehaviorSubject(false);
  public loading$ = new BehaviorSubject(false);

  // public operation: Operation;
  public filtersQuery: any;

  public hasRowActions;


  public status = true;
  public chips = false;
  public filterInput = true;
  public queryParam = false;
  public restoreMode = false;

  public initialFetch = true;

  public onDestroy$ = new Subject();

  private _fsScrollSubscription: Subscription;

  constructor(
    private el: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
    this.initialized$.next(true);

    this.subscribe();

  }

  /**
   * Transform templates for using
   * @param templates test description
   */
  public tranformTemplatesToColumns(templates: string) {
  }

  public reload() {
    this.loading$.next(true);

  }

  /**
   * Watch page changes
   */
  public subscribe() {
  }

  /**
   * Toggle group mode status
   * @param value
   */
  public groupEnabled(value: boolean) {
  }

  public destroy() {
    if (this._fsScrollSubscription) {
      this._fsScrollSubscription.unsubscribe();
    }

    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  /**
   * Do initialization of table
   * @param config
   */
  private initialize(config: any = null) {
    this.initDefaultOptions(config);
    this.initReoder(config);
    this.initRestore();
    this.initActions(config.actions);
    this.initPaging(config.paging, config.loadMore);
  }

  /**
   * Just init options by default it it wasn't specified
   * @param config
   */
  private initDefaultOptions(config) {
    // We should prevent initial fetch in cases when it will be fetched in any case
    // As ex. scrollable or filter will do fetch in any cases
    if (config.initialFetch === false || config.scrollable) { // TODO fixme after tsmodel version update
      this.initialFetch = false;
    }
    if (config.status === false) {
      this.status = false;
    }
    if (config.chips) {
      this.chips = config.chips;
    }
    if (config.filterInput === false) {
      this.filterInput = false;
    }

    this.queryParam = (config.queryParam === void 0)
      ? true
      : config.queryParam;
  }

  /**
   * Init reorder action button (must be on first place)
   */
  private initReoder(config) {

  }

  /**
   * Init restore row action and append Show Deleted option into filters
   */
  private initRestore() {

  }

  /**
   * Init paging
   * @param pagingConfig
   * @param loadMore
   */
  private initPaging(pagingConfig: false, loadMore: boolean) {
  }

  /**
   * Split actions by categories
   */
  private initActions(actions) {
  }
}
