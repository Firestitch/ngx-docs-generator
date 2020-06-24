/** Document type for an entry-point. */
import { ClassDoc } from './class-doc';
import { ModuleDoc } from './module-doc';
import {
  CategorizedClassDoc,
  CategorizedPropertyMemberDoc,
  ComponentDocItem,
  TransformedProperty
} from '../interfaces';
import { propertyToJson } from '../common/to-json';


export class ComponentDoc<T extends ComponentDocItem = ComponentDocItem> extends ClassDoc<T> {

  /** Unique document type for Dgeni. */
  public docType = 'component';

  public selector: string;

  public declaredIn: ModuleDoc;

  public inputs: TransformedProperty[] = [];
  public outputs: TransformedProperty[] = [];

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

    this._result.inputs = this.inputs;

    this._result.outputs = this.outputs;

    return this._result;
  }

  protected _process() {
    super._process();

    if (this.original.directiveMetadata) {
      this.selector = this.original.directiveMetadata.get('selector');
    }

    this.inputs = this.original.properties
      .filter((property) => {
        return property.isDirectiveInput;
      })
      .map((p) => propertyToJson(p as CategorizedPropertyMemberDoc));

    this.outputs = this.original.properties
      .filter((property) => {
        return property.isDirectiveOutput;
      })
      .map((p) => propertyToJson(p as CategorizedPropertyMemberDoc));
  }
}
