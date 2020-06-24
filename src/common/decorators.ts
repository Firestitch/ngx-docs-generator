import { PropertyMemberDoc } from 'dgeni-packages/typescript/api-doc-types/PropertyMemberDoc';
import { MemberDoc } from 'dgeni-packages/typescript/api-doc-types/MemberDoc';
import { ClassExportDoc } from 'dgeni-packages/typescript/api-doc-types/ClassExportDoc';
import { CategorizedClassDoc, HasDecoratorsDoc } from '../interfaces/dgeni.interfaces';

export function isMethod(doc: MemberDoc) {
  return doc.hasOwnProperty('parameters') && !doc.isGetAccessor && !doc.isSetAccessor;
}

export function isGenericTypeParameter(doc: MemberDoc) {
  if (doc.containerDoc instanceof ClassExportDoc) {
    return doc.containerDoc.typeParams && `<${doc.name}>` === doc.containerDoc.typeParams;
  }
  return false;
}


export function isProperty(doc: MemberDoc) {
  if (doc instanceof PropertyMemberDoc ||
    // The latest Dgeni version no longer treats getters or setters as properties.
    // From a user perspective, these are still properties and should be handled the same
    // way as normal properties.
    (!isMethod(doc) && (doc.isGetAccessor || doc.isSetAccessor))) {
    return !isGenericTypeParameter(doc);
  }
  return false;
}

export function isComponent(doc: ClassExportDoc) {
  return hasClassDecorator(doc, 'Component');
}

export function isDirective(doc: ClassExportDoc) {
  return hasClassDecorator(doc, 'Directive');
}

export function isService(doc: ClassExportDoc) {
  return hasClassDecorator(doc, 'Injectable');
}

export function isPipe(doc: ClassExportDoc) {
  return hasClassDecorator(doc, 'Pipe');
}

export function isNgModule(doc: ClassExportDoc) {
  return hasClassDecorator(doc, 'NgModule');
}


export function hasClassDecorator(doc: ClassExportDoc, decoratorName: string) {
  return doc.docType === 'class' && hasDecorator(doc, decoratorName);
}

export function hasDecorator(doc: HasDecoratorsDoc, decoratorName: string) {
  return !!doc.decorators &&
    doc.decorators.length > 0 &&
    doc.decorators.some(d => d.name === decoratorName);
}

export function hasMemberDecorator(doc: MemberDoc, decoratorName: string) {
  return doc.docType === 'member' && hasDecorator(doc, decoratorName);
}

export function getDirectiveSelectors(classDoc: CategorizedClassDoc) {
  if (classDoc.directiveMetadata) {
    const directiveSelectors: string = classDoc.directiveMetadata.get('selector');

    if (directiveSelectors) {
      return directiveSelectors.replace(/[\r\n]/g, '').split(/\s*,\s*/).filter(s => s !== '');
    }
  }
  return undefined;
}
