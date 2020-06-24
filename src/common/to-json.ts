import { CategorizedPropertyMemberDoc } from '../interfaces/dgeni.interfaces';
import { ParameterDoc } from 'dgeni-packages/typescript/api-doc-types/ParameterDoc';
import {
  TransformedInterface,
  TransformedMethod,
  TransformedParameter,
  TransformedProperty
} from '../interfaces/categorized.interfaces';

export function methodToJson(doc: any): TransformedMethod {
  return {
    docType: doc.docType,
    type: { definition: doc.type },
    accessibility: doc.accessibility,
    name: doc.name,
    description: doc.description,
    parameters: doc.params && doc.params.map((p) => parameterToJson(p))
  };
}


export function propertyToJson(doc: CategorizedPropertyMemberDoc): TransformedProperty {
  return {
    docType: doc.docType,
    type: { definition: doc.type },
    accessibility: doc.accessibility,
    name: doc.name,
    description: doc.description,
    isGetter: doc.isGetAccessor,
    isSetter: doc.isSetAccessor,
    isStatic: doc.isStatic,
    isDirectiveInput: doc.isDirectiveInput,
    isDirectiveOutput: doc.isDirectiveOutput,
    directiveInputAlias: doc.directiveInputAlias,
    directiveOutputAlias: doc.directiveOutputAlias,
  };
}

export function interfacePropertyToJson(doc: CategorizedPropertyMemberDoc): TransformedInterface {
  return {
    docType: doc.docType,
    type: { definition: doc.type },
    accessibility: doc.accessibility,
    name: doc.name,
    description: doc.description,
    isOptional: doc.isOptional,
  };
}

export function parameterToJson(doc: ParameterDoc): TransformedParameter {
  return {
    docType: doc.docType,
    type: { definition: doc.type },
    name: doc.name,
    description: doc.description,
    isOptional: doc.isOptional
  };
}
