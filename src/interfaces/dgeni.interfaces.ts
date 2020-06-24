import { ClassLikeExportDoc } from 'dgeni-packages/typescript/api-doc-types/ClassLikeExportDoc';
import { MethodMemberDoc } from 'dgeni-packages/typescript/api-doc-types/MethodMemberDoc';
import { FunctionExportDoc } from 'dgeni-packages/typescript/api-doc-types/FunctionExportDoc';
import { ConstExportDoc } from 'dgeni-packages/typescript/api-doc-types/ConstExportDoc';
import { TypeAliasExportDoc } from 'dgeni-packages/typescript/api-doc-types/TypeAliasExportDoc';
import { PropertyMemberDoc } from 'dgeni-packages/typescript/api-doc-types/PropertyMemberDoc';
import { ParsedDecorator } from 'dgeni-packages/typescript/services/TsParser/getDecorators';
import { ClassExportDoc } from 'dgeni-packages/typescript/api-doc-types/ClassExportDoc';

export interface CategorizedClassLikeDoc extends ClassLikeExportDoc {
  methods: CategorizedMethodMemberDoc[];
  properties: CategorizedPropertyMemberDoc[];
  staticMethods: CategorizedMethodMemberDoc[];
  staticProperties: CategorizedPropertyMemberDoc[];
}

/** Extended Dgeni class document that includes extracted Angular metadata. */
export interface CategorizedClassDoc extends ClassExportDoc, CategorizedClassLikeDoc {
  isComponent: boolean;
  isDirective: boolean;
  isService: boolean;
  isNgModule: boolean;
  isPipe: boolean;
  isTestHarness: boolean;
  directiveExportAs?: string | null;
  directiveSelectors?: string[];
  directiveMetadata: Map<string, any> | null;
  extendedDoc: ClassLikeExportDoc | undefined;
  inheritedDocs: ClassLikeExportDoc[];
  description: string;
}

/** Extended Dgeni property-member document that includes extracted Angular metadata. */
export interface CategorizedPropertyMemberDoc extends PropertyMemberDoc {
  description: string;
  isDirectiveInput: boolean;
  isDirectiveOutput: boolean;
  directiveInputAlias: string;
  directiveOutputAlias: string;
}

  /** Extended Dgeni method-member document that simplifies logic for the Dgeni template. */
export interface CategorizedMethodMemberDoc extends MethodMemberDoc {}

/** Extended Dgeni function export document that simplifies logic for the Dgeni template. */
export interface CategorizedFunctionExportDoc extends FunctionExportDoc {}

/** Extended Dgeni const export document that simplifies logic for the Dgeni template. */
export interface CategorizedConstExportDoc extends ConstExportDoc {}

/** Extended Dgeni type alias document that includes more information when rendering. */
export interface CategorizedTypeAliasExportDoc extends TypeAliasExportDoc {}

/** Interface that describes Dgeni documents that have decorators. */
export interface HasDecoratorsDoc {
  decorators?: ParsedDecorator[] | undefined;
}
