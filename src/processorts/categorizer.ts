import {DocCollection, Processor} from 'dgeni';
import {
  CategorizedClassDoc,
  CategorizedClassLikeDoc, CategorizedFunctionExportDoc,
  CategorizedMethodMemberDoc, CategorizedPropertyMemberDoc
} from '../interfaces/dgeni.interfaces';
import {
  isComponent,
  isService,
  isNgModule,
  isDirective,
  isMethod,
  isProperty,
  getDirectiveSelectors,
  isPipe
} from '../common/decorators';
import { getDirectiveMetadata } from '../common/directive-metadata';
import { getInputBindingData, getOutputBindingData } from '../common/property-bindings';
import { normalizeFunctionParameters } from '../common/normalize-function-parameters';
import { CategorizedDocs } from '../interfaces/categorized.interfaces';

/**
 * Processor to filter out symbols that should not be shown in the Material docs.
 */
export class Categorizer implements Processor {
  public name = 'doc-categorizer';
  public $runBefore = ['docs-processed', 'entryPointGroupper'];

  private _categories: CategorizedDocs = {
    components: [],
    directives: [],
    services: [],
    modules: [],
    classes: [],
    interfaces: [],
    enums: [],
    functions: [],
    consts: [],
    types: [],
    pipes: [],
  };

  public $process(docs: DocCollection): any {
    this._categorizeClassLikeDocs(docs);
    this._categorizeConstLikeDocs(docs);
    this._categorizeEnumLikeDocs(docs);
    this._categorizeFunctionsLikeDocs(docs);
    this._categorizeTypeLikeDocs(docs);

    return this._categories;
  }

  private _categorizeClassLikeDocs(docs: DocCollection) {
    const classes = docs.filter(doc => doc.docType === 'class' || doc.docType === 'interface');
    classes.forEach((doc) => {
      this._decorateClassLikeDoc(doc);

      if (doc.isDirective) {
        this._categories.directives.push(doc);
      } else if (doc.isComponent) {
        this._categories.components.push(doc);
      } else if (doc.isPipe) {
        this._categories.pipes.push(doc);
      } else if (doc.isService) {
        this._categories.services.push(doc);
      } else if (doc.isNgModule) {
        this._categories.modules.push(doc);
      } else if (doc.docType === 'class') {
        this._categories.classes.push(doc);
      } else if (doc.docType === 'interface') {
        this._categories.interfaces.push(doc);
      }
    });
  }

  private _categorizeEnumLikeDocs(docs: DocCollection) {
    this._categories.enums = docs.filter(doc => doc.docType === 'enum');
  }

  private _categorizeFunctionsLikeDocs(docs: DocCollection) {
    this._categories.functions =  docs.filter(doc => doc.docType === 'function');
  }

  private _categorizeConstLikeDocs(docs: DocCollection) {
    this._categories.consts = docs.filter(doc => doc.docType === 'const');
  }

  private _categorizeTypeLikeDocs(docs: DocCollection) {
    this._categories.types = docs.filter(doc => doc.docType === 'type-alias');
  }

  private _decorateClassLikeDoc(doc: CategorizedClassLikeDoc) {
    doc.methods = doc.members.filter(isMethod) as CategorizedMethodMemberDoc[];
    doc.properties = doc.members.filter(isProperty) as CategorizedPropertyMemberDoc[];

    if (doc.docType === 'class') {
      doc.staticMethods = (doc as CategorizedClassDoc).statics.filter(isMethod) as CategorizedMethodMemberDoc[];
      doc.staticProperties = (doc as CategorizedClassDoc).statics.filter(isProperty) as CategorizedPropertyMemberDoc[];
      this._decorateClassDoc(doc as CategorizedClassDoc);
    }

    // Call decorate hooks that can modify the method and property docs.
    doc.methods.forEach(d => this._decorateMethodDoc(d));
    doc.properties.forEach(d => this._decoratePropertyDoc(d));
  }

  private _decorateClassDoc(classDoc: CategorizedClassDoc) {
    // Classes can only extend a single class. This means that there can't be multiple extend
    // clauses for the Dgeni document. To make the template syntax simpler and more readable,
    // store the extended class in a variable.
    // classDoc.extendedDoc = classDoc.extendsClauses[0] ? classDoc.extendsClauses[0].doc! : undefined;
    classDoc.directiveMetadata = getDirectiveMetadata(classDoc);
    // classDoc.inheritedDocs = getInheritedDocsOfClass(classDoc, this._exportSymbolsToDocsMap);

    // In case the extended document is not public, we don't want to print it in the
    // rendered class API doc. This causes confusion and also is not helpful as the
    // extended document is not part of the docs and cannot be viewed.
    // if (classDoc.extendedDoc !== undefined && !isPublicDoc(classDoc.extendedDoc)) {
    //   classDoc.extendedDoc = undefined;
    // }

    // Categorize the current visited classDoc into its Angular type.
    if (isDirective(classDoc) && classDoc.directiveMetadata) {
      classDoc.isDirective = true;
      classDoc.directiveExportAs = classDoc.directiveMetadata.get('exportAs');
      classDoc.directiveSelectors = getDirectiveSelectors(classDoc);
    } else if (isComponent(classDoc) && classDoc.directiveMetadata) {
      classDoc.isComponent = true;
      classDoc.directiveExportAs = classDoc.directiveMetadata.get('exportAs');
      classDoc.directiveSelectors = getDirectiveSelectors(classDoc);
    } else if (isPipe(classDoc)) {
      classDoc.isPipe = true;
    } else if (isService(classDoc)) {
      classDoc.isService = true;
    } else if (isNgModule(classDoc)) {
      classDoc.isNgModule = true;
    }
  }

  /**
   * Method that will be called for each method doc. The parameters for the method-docs
   * will be normalized, so that they can be easily used inside of dgeni templates.
   */
  private _decorateMethodDoc(methodDoc: CategorizedMethodMemberDoc) {
    normalizeFunctionParameters(methodDoc);
  }

  /**
   * Method that will be called for each property doc. Properties that are Angular inputs or
   * outputs will be marked. Aliases for the inputs or outputs will be stored as well.
   */
  private _decoratePropertyDoc(propertyDoc: CategorizedPropertyMemberDoc) {
    const metadata = propertyDoc.containerDoc.docType === 'class' ?
      (propertyDoc.containerDoc as CategorizedClassDoc).directiveMetadata :
      null;

    const inputMetadata = metadata ? getInputBindingData(propertyDoc, metadata) : null;
    const outputMetadata = metadata ? getOutputBindingData(propertyDoc, metadata) : null;

    propertyDoc.isDirectiveInput = !!inputMetadata;
    propertyDoc.directiveInputAlias = (inputMetadata && inputMetadata.alias) || '';

    propertyDoc.isDirectiveOutput = !!outputMetadata;
    propertyDoc.directiveOutputAlias = (outputMetadata && outputMetadata.alias) || '';
  }

  /**
   * Method that will be called for each function export doc. The parameters for the functions
   * will be normalized, so that they can be easily used inside of Dgeni templates.
   */
  private _decorateFunctionExportDoc(functionDoc: CategorizedFunctionExportDoc) {
    normalizeFunctionParameters(functionDoc);
  }
}
