import { Processor } from 'dgeni';
import { ModuleDoc } from '../classes/module-doc';
import { ComponentDoc } from '../classes/component-doc';
import { DirectiveDoc } from '../classes/directive-doc';
import { ProviderDoc } from '../classes/provider-doc';
import { ClassDoc } from '../classes/class-doc';
import { TypeDoc } from '../classes/type-doc';
import { EnumDoc } from '../classes/enum-doc';
import { FunctionDoc } from '../classes/function-doc';
import { InterfaceDoc } from '../classes/interface-doc';
import { ConstDoc } from '../classes/const-doc';
import { PipeDoc } from '../classes/pipe-doc';
import { CategorizedClassDoc, CategorizedClassLikeDoc } from '../interfaces';


export class EntryPointGroupper implements Processor{
  name = 'entryPointGroupper';
  $runBefore = ['doc-to-json'];

  private modules = new Map<string, ModuleDoc>();
  private components = new Map<string, ComponentDoc>();
  private directives = new Map<string, DirectiveDoc>();
  private pipes = new Map<string, PipeDoc>();
  private providers = new Map<string, ProviderDoc>();

  $process(docs: any) {


    this._initComponents(docs.components);
    this._initDirectives(docs.directives);
    this._initPipes(docs.pipes);
    this._initProviders(docs.services);
    this._initModules(docs.modules);


    return [
      { docType: 'modules', data: Array.from(this.modules.values())},
      { docType: 'components', data: Array.from(this.components.values())},
      { docType: 'directives', data: Array.from(this.directives.values())},
      { docType: 'pipes', data: Array.from(this.pipes.values())},
      { docType: 'providers', data: Array.from(this.providers.values())},
      { docType: 'classes', data: docs.classes.map((c) => ClassDoc.new(c)) },
      { docType: 'interfaces', data: docs.interfaces.map((c) =>  InterfaceDoc.new(c))},
      { docType: 'types', data: docs.types.map((t) => TypeDoc.new(t))},
      { docType: 'enums', data: docs.enums.map((e) => EnumDoc.new(e))},
      { docType: 'functions', data: docs.functions.map((f) => FunctionDoc.new(f))},
      { docType: 'consts', data: docs.consts.map((c) => ConstDoc.new(c))},
    ];
  }

  private _initComponents(components: CategorizedClassDoc[]) {
    components.forEach((doc) => {
      const component = ComponentDoc.new(doc);

      this.components.set(doc.name, component);
    });
  }

  private _initDirectives(directives: CategorizedClassDoc[]) {
    directives.forEach((doc) => {
      const directive = DirectiveDoc.new(doc);

      this.directives.set(doc.name, directive);
    });
  }

  private _initPipes(pipes: CategorizedClassDoc[]) {
    pipes.forEach((doc) => {
      const pipe = PipeDoc.new(doc);

      this.pipes.set(doc.name, pipe);
    });
  }

  private _initProviders(providers: CategorizedClassDoc[]) {
    providers.forEach((doc) => {
      const provider = ProviderDoc.new(doc);

      this.providers.set(doc.name, provider);
    });
  }

  private _initModules(modules: CategorizedClassDoc[]) {
    modules.forEach((doc) => {
      const module = ModuleDoc.new(doc);

      module.declarations?.forEach((declaration) => {
        const docItem = this.components.get(declaration)
          || this.directives.get(declaration)
          || this.pipes.get(declaration);

        if (docItem) {
          module.linkDeclaredEntity(docItem);
        }
      });

      module.meta.providers?.forEach((provider) => {
        if (this.providers.has(provider)) {
          module.linkDeclaredEntity(this.providers.get(provider));
        }
      });

      this.modules.set(doc.name, module);
    });

    this.modules.forEach((module) => {
      module.exports?.forEach((declaration) => {
        if (module.members.has(declaration)) {
          module.linkExportedEntity(module.members.get(declaration));
        } else if (this.modules.has(declaration)) {
          module.linkExportedEntity(this.modules.get(declaration));
        } else {
          module.linkExternalExportedModule(declaration);
        }
      });
    });
  }

}
