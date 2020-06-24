import { CategorizedClassDoc, BaseDocItem } from '../interfaces';


export class BaseDoc<T extends BaseDocItem = BaseDocItem> {
  /** Unique document type for Dgeni. */
  public docType: string;

  /** Name of the component group. */
  public name: string;

  public description: string;

  /** Display name of the entry-point. */
  public displayName: string;

  public original: CategorizedClassDoc;


  // @ts-ignore
  protected _result: T = {};

  public static new(original: CategorizedClassDoc) {
    const instance = new this(original) as InstanceType<any>;
    instance.init();

    return instance;
  }
  constructor(original: CategorizedClassDoc) {
    this.original = original;
  }

  public init() {}

  public toJSON(): T {
    this._result.docType = this.docType;
    this._result.name = this.name;
    this._result.description = this.description;

    return this._result;
  }

  protected _process() {
    this.name = this.original.name;
    this.description = this.original.description;
  }
}
