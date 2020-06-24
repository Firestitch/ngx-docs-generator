/** Document type for an entry-point. */
import { ComponentDoc } from './component-doc';


export class DirectiveDoc extends ComponentDoc {

  /** Unique document type for Dgeni. */
  public docType = 'directive';

  public init() {
    this._process();
  }

  // public toJSON(): string {
  //   return super.toJSON();
  // }
}
