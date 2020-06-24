/** Document type for an entry-point. */
import { ModuleDoc } from './module-doc';
import {
  CategorizedClassDoc,
  PipeDocItem,
  TransformedParameter,
} from '../interfaces';
import { methodToJson } from '../common/to-json';
import { BaseDoc } from './base-doc';


export class PipeDoc<T extends PipeDocItem = PipeDocItem> extends BaseDoc<T> {

  /** Unique document type for Dgeni. */
  public docType = 'pipe';

  public selector: string;

  public declaredIn: ModuleDoc;
  public params: TransformedParameter[];

  constructor(original: CategorizedClassDoc) {
    super(original);
  }

  public init() {
    this._process();
  }

  public toJSON(): T {
    super.toJSON();

    this._result.selector = this.selector;
    this._result.declaredIn = this.declaredIn?.name;
    this._result.parameters = this.params;

    return this._result;
  }

  protected _process() {
    super._process();

    if (this.original.directiveMetadata) {
      this.selector = this.original.directiveMetadata.get('name');
    }

    const transformMethod = this.original.methods
      .find((m) => m.name === 'transform');

    if (transformMethod) {
      this.params = methodToJson(transformMethod)?.parameters;
    }
  }
}
