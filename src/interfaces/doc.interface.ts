import {
  TransformedEnumMember, TransformedInterface,
  TransformedMethod, TransformedParameter,
  TransformedProperty
} from './categorized.interfaces';

export interface BaseDocItem {
  docType?: string;
  name?: string;
  description?: string;
}

export interface ClassDocItem extends BaseDocItem {
  methods?: TransformedMethod[];
  staticMethods?: TransformedMethod[];
  properties?: TransformedProperty[];
  staticProperties?: TransformedProperty[];
  extends?: string[];
}

export interface ComponentDocItem extends ClassDocItem {
  declaredIn?: string;
  selector?: string;
  inputs?: TransformedProperty[];
  outputs?: TransformedProperty[];
}

export interface PipeDocItem extends ClassDocItem {
  declaredIn?: string;
  selector?: string;
  parameters?: TransformedParameter[];
}


export interface ConstDocItem extends BaseDocItem {
  type?: string;
}

export interface EnumDocItem extends BaseDocItem {
  members?: TransformedEnumMember[];
}

export interface FunctionDocItem extends BaseDocItem {
  parameters?: TransformedParameter[];
}

export interface InterfaceDocItem extends BaseDocItem {
  properties?: TransformedInterface[];
}

export interface ModuleDocItem extends BaseDocItem {
  imports?: string[];
  providers?: string[];
  declarations?: ModuleDeclaredItem;
  exports?: ModuleExportedItem;
}

export interface ModuleDeclaredItem {
  components?: { name: string, selector: string }[];
  directives?: { name: string, selector: string }[];
  pipes?: { name: string, selector: string }[];
}

export interface ModuleExportedItem {
  components?: { name: string, selector: string }[];
  directives?: { name: string, selector: string }[];
  pipes?: { name: string, selector: string }[];
  modules?: { name: string, internal: boolean }[];
}

export interface TypeDocItem extends BaseDocItem {
  definition?: string;
}
