/** Document type for an entry-point. */
import { ComponentDoc } from './component-doc';
import { ProviderDoc } from './provider-doc';
import { DirectiveDoc } from './directive-doc';
import { ClassDoc } from './class-doc';
import { ModuleDocItem, CategorizedClassDoc } from '../interfaces';
import { PipeDoc } from './pipe-doc';


export class ModuleDoc<T extends ModuleDocItem = ModuleDocItem> extends ClassDoc<T> {

  /** Unique document type for Dgeni. */
  public docType = 'module';

  public members:
    Map<string, ComponentDoc | DirectiveDoc | PipeDoc | ProviderDoc | ModuleDoc> = new Map();

  public components: Map<string, ComponentDoc> = new Map();
  public directives: Map<string, DirectiveDoc> = new Map();
  public pipes: Map<string, PipeDoc> = new Map();
  public providers: Map<string, ProviderDoc> = new Map();


  public declarations: string[];
  public exports: string[];

  public meta: any = {
    declarations: {
      components: [],
      directives: [],
      pipes: [],
    },
    exports: {
      components: [],
      directives: [],
      pipes: [],
      modules: [],
    },
    imports: [],
    providers: [],
  };

  constructor(original: CategorizedClassDoc) {
    super(original);
  }

  public init() {
    this._process();
  }

  public linkDeclaredEntity(doc) {
    doc.declaredIn = this;

    switch (doc.docType) {
      case 'component': {
        this._linkEntity(this.meta.declarations.components, doc);
      } break;

      case 'directive': {
        this._linkEntity(this.meta.declarations.directives, doc);
      } break;

      case 'pipe': {
        this._linkEntity(this.meta.declarations.pipes, doc);
      } break;
    }

    this.members.set(doc.name, doc);
  }



  public linkExportedEntity(doc) {
    switch (doc.docType) {
      case 'component': {
        this._linkEntity(this.meta.exports.components, doc);
      } break;

      case 'directive': {
        this._linkEntity(this.meta.exports.directives, doc);
      } break;

      case 'pipe': {
        this._linkEntity(this.meta.exports.pipes, doc);
      } break;

      case 'module': {
        this.meta.exports.modules.push({
          name: doc.name,
          internal: true
        });
      } break;
    }
  }

  public linkExternalExportedModule(moduleName: string) {
    this.meta.exports.modules.push({
      name: moduleName,
      internal: false,
    });
  }

  public toJSON(): T {
    super.toJSON();

    this._result.declarations = this.meta.declarations;
    this._result.imports = this.meta.imports;
    this._result.exports = this.meta.exports;
    this._result.providers = this.meta.providers;

    return this._result;
  }

  protected _process() {
    super._process();

    this._parseArguments();
  }

  private _parseArguments() {
    const ngModule = this.original.decorators!
      .find((d) => d.name === 'NgModule');

    if (ngModule) {
      const decoratedInfo = ngModule.argumentInfo![0] as any;

      // Declarations might contain modules/components/directives/pipes
      // and must be sorted in meta.
      this.declarations = [...decoratedInfo.declarations];
      this.exports = [...decoratedInfo.exports];

      this.meta.imports = [...decoratedInfo.imports];
      this.meta.providers = [...decoratedInfo.providers];
    }
  }

  private _linkEntity(collection: any[], entity) {
    collection.push({
      name: entity.name,
      selector: entity.selector,
    });
  }
}
