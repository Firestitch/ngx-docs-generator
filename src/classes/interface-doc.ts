/** Document type for an entry-point. */
import { BaseDoc } from './base-doc';
import {
  CategorizedClassDoc,
  CategorizedPropertyMemberDoc,
  TransformedInterface,
  InterfaceDocItem,
} from '../interfaces';
import { interfacePropertyToJson } from '../common/to-json';


export class InterfaceDoc<T extends InterfaceDocItem = InterfaceDocItem> extends BaseDoc<T> {

  /** Unique document type for Dgeni. */
  public docType = 'interface';

  public extends: string[];
  public properties: TransformedInterface[] = [];

  constructor(original: CategorizedClassDoc) {
    super(original);
  }

  public init() {
    this._process();
  }

  public toJSON(): T {
    super.toJSON();

    this._result.description = this.original.description;
    this._result.properties = this.properties;

    return this._result;
  }

  protected _process() {
    super._process();

    this.properties = this.original.properties
      .map((p) => interfacePropertyToJson(p as CategorizedPropertyMemberDoc));

    this.extends = this.original.extendsClauses.map((e) => e.doc?.name || e.text);
  }
}
