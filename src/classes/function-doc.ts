/** Document type for an entry-point. */
import { BaseDoc } from './base-doc';
import { PropertyMemberDoc } from 'dgeni-packages/typescript/api-doc-types/PropertyMemberDoc';
import {
  CategorizedClassDoc,
  FunctionDocItem,
} from '../interfaces';
import { parameterToJson } from '../common/to-json';


export class FunctionDoc<T extends FunctionDocItem = FunctionDocItem> extends BaseDoc<T> {

  /** Unique document type for Dgeni. */
  public docType = 'function';

  public members: PropertyMemberDoc[] = [];

  constructor(original: CategorizedClassDoc) {
    super(original);
  }

  public init() {
    this._process();
  }

  public toJSON(): T {
    super.toJSON();

    this._result.description = this.original.description;

    if ((this.original as any).params) {
      this._result.parameters = (this.original as any).params.map((p) => parameterToJson(p));
    }

    return this._result;
  }

  protected _process() {
    super._process();
  }
}
