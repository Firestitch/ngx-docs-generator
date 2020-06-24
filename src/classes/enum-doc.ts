/** Document type for an entry-point. */
import { BaseDoc } from './base-doc';
import {
  CategorizedClassDoc,
  EnumDocItem,
  TransformedEnumMember,
} from '../interfaces';


export class EnumDoc<T extends EnumDocItem = EnumDocItem> extends BaseDoc<T> {

  /** Unique document type for Dgeni. */
  public docType = 'enum';

  public members: TransformedEnumMember[] = [];

  constructor(original: CategorizedClassDoc) {
    super(original);
  }

  public init() {
    this._process();
  }

  public toJSON(): T {
    super.toJSON();

    this._result.description = this.original.description;
    this._result.members = this.members;

    return this._result;
  }

  protected _process() {
    super._process();

    this.members = (this.original.members || [])
      .map((member) => {
        return {
          key: member.name,
          value: member.type,
          description: (member as any).description,
        };
      });
  }
}
