/** Document type for an entry-point. */
import { CategorizedClassDoc } from '../interfaces';
import { ModuleDoc } from './module-doc';
import { ClassDoc } from './class-doc';


export class ProviderDoc extends ClassDoc {

  /** Unique document type for Dgeni. */
  public docType = 'povider';

  public declaredIn: ModuleDoc;

  constructor(original: CategorizedClassDoc) {
    super(original);
  }

  public init() {
    this._process();
  }

  protected _process() {
    super._process();
  }
}
