import { CategorizedClassLikeDoc } from './dgeni.interfaces';
import { TypeAliasExportDoc } from 'dgeni-packages/typescript/api-doc-types/TypeAliasExportDoc';
import { EnumExportDoc } from 'dgeni-packages/typescript/api-doc-types/EnumExportDoc';
import { FunctionExportDoc } from 'dgeni-packages/typescript/api-doc-types/FunctionExportDoc';
import { ConstExportDoc } from 'dgeni-packages/typescript/api-doc-types/ConstExportDoc';

export interface CategorizedDocs {
  modules: CategorizedClassLikeDoc[];
  components: CategorizedClassLikeDoc[];
  pipes: CategorizedClassLikeDoc[];
  directives: CategorizedClassLikeDoc[];
  services: CategorizedClassLikeDoc[];
  classes: CategorizedClassLikeDoc[];
  interfaces: CategorizedClassLikeDoc[];
  consts: ConstExportDoc[];
  types: TypeAliasExportDoc[];
  enums: EnumExportDoc[];
  functions: FunctionExportDoc[];
}

interface TransformedBase {
  docType: string | undefined;
  type: TransformedType;
  name: string;
  description: string;
}

export interface TransformedType {
  definition: string | undefined;
}

export interface TransformedProperty extends TransformedBase {
  accessibility: string;
  isGetter: boolean;
  isSetter: boolean;
  isStatic: boolean;
  isDirectiveInput: boolean;
  isDirectiveOutput: boolean;
  directiveInputAlias: string;
  directiveOutputAlias: string;
}

export interface TransformedMethod extends TransformedBase {
  accessibility: string;
  parameters: TransformedParameter[];
}

export interface TransformedParameter extends TransformedBase {
  isOptional: boolean;
}

export interface TransformedInterface extends TransformedBase {
  accessibility: string;
  isOptional: boolean;
}

export interface TransformedEnumMember {
  key: string;
  value: string;
  description: string;
}

