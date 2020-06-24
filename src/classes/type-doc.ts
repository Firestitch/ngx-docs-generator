/** Document type for an entry-point. */
import { BaseDoc } from './base-doc';
import { PropertyMemberDoc } from 'dgeni-packages/typescript/api-doc-types/PropertyMemberDoc';
import {
  CategorizedClassDoc,
} from '../interfaces';
import { TypeDocItem } from '../interfaces';

export class TypeDoc<T extends TypeDocItem = TypeDocItem> extends BaseDoc<T> {

  /** Unique document type for Dgeni. */
  public docType = 'type';

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
    this._result.definition = (this.original as any).typeDefinition;

    return this._result;
  }

  protected _process() {
    super._process();
  }
}
