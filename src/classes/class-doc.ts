/** Document type for an entry-point. */
import { BaseDoc } from './base-doc';
import {
  CategorizedClassDoc,
  ClassDocItem,
  TransformedMethod,
  TransformedProperty
} from '../interfaces';
import { methodToJson, propertyToJson } from '../common/to-json';


export class ClassDoc<T extends ClassDocItem = ClassDocItem> extends BaseDoc<T> {

  /** Unique document type for Dgeni. */
  public docType = 'class';

  public methods: TransformedMethod[] = [];
  public properties: TransformedProperty[] = [];

  public staticMethods: TransformedMethod[] = [];
  public staticProperties: TransformedProperty[] = [];

  public extends: string[];

  constructor(original: CategorizedClassDoc) {
    super(original);
  }

  public init() {
    this._process();
  }

  public toJSON(): T {
    super.toJSON();

    // Methods
    this._result.methods = this.methods;
    this._result.staticMethods = this.staticMethods;

    // Properties
    this._result.properties = this.properties;
    this._result.staticProperties = this.staticProperties;

    this._result.extends = this.extends;

    return this._result;
  }

  protected _process() {
    super._process();

    // Methods
    this.methods = this.original.methods
      .map((m) => methodToJson(m));

    this.staticMethods = this.original.staticMethods
      .map((m) => methodToJson(m));

    // Properties
    this.properties = this.original.properties
      .map((p) => propertyToJson(p));

    this.staticProperties = this.original.staticProperties
      .map((p) => propertyToJson(p));

    // Extends
    this.extends = this.original.extendsClauses.map((e) => e.doc?.name || e.text);
  }
}
