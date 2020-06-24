import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { RowComponent } from './components/row/row.component';
import { ListCellDirective } from './directive/cell.directive';
import { ListColumnDirective } from './directive/column.directive';
import { BodyComponent } from './components/body/body.component';
import { FileSizePipe } from './pipes/filesize.pipe';

/**
 * My super module for super component with super functionality
 */
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    RowComponent,
    ListCellDirective,
    ListColumnDirective,
    BodyComponent,
    FileSizePipe,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ListComponent, FileSizePipe],
})
export class AppModule {

  static variable = 1;

  /**
   * Must be imported once
   * @param config
   */
  static forRoot(config: any = {}): ModuleWithProviders<AppModule> {
    return {
      ngModule: AppModule,
      providers: [
      ]
    };
  }
}
