/** Document type for an entry-point. */
import { BaseDoc } from './base-doc';
import {
  CategorizedClassDoc,
  ConstDocItem,
} from '../interfaces';


export class ConstDoc<T extends ConstDocItem = ConstDocItem> extends BaseDoc<T> {

  /** Unique document type for Dgeni. */
  public docType = 'const';

  constructor(original: CategorizedClassDoc) {
    super(original);
  }

  public init() {
    this._process();
  }

  public toJSON(): T {
    super.toJSON();

    this._result.type = (this.original as any).type;

    return this._result;
  }

  protected _process() {
    super._process();
  }
}
