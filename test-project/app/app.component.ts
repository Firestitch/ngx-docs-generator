import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Input()
  public test = 123;

  title = 'ng';

  /**
   * @name helloWorld
   * @description This function returns a string.
   *
   * @returns {string} This string has the value 'Hello World'.
   */
  public helloWorld() {

  }
}
