import { Package } from 'dgeni';
import { ReadTypeScriptModules } from 'dgeni-packages/typescript/processors/readTypeScriptModules';
import { Categorizer } from './processorts/categorizer';
import { EntryPointGroupper } from './processorts/entry-point-groupper';
import { ConvertToJson } from './processorts/convert-to-json';

// Dgeni packages that the Material docs package depends on.
const jsdocPackage = require('dgeni-packages/jsdoc');
const nunjucksPackage = require('dgeni-packages/nunjucks');
const typescriptPackage = require('dgeni-packages/typescript');


export const docsPackager = new Package('package-doc', [jsdocPackage, nunjucksPackage, typescriptPackage]);

docsPackager.processor(new Categorizer());
docsPackager.processor(new EntryPointGroupper());
docsPackager.processor(new ConvertToJson());

// Configure the log level of the API docs dgeni package.
// docsPackager.config(function (log: any) {
//   return log.level = 'warning';
// });

docsPackager.config(function (computePathsProcessor: any) {
  computePathsProcessor.pathTemplates = [{
    docTypes: ['docs'],
    pathTemplate: '${docType}',
    outputPathTemplate: '${docType}.json',
  }];

  // computePathsProcessor.pathTemplates = [{
  //   docTypes: ['modules', 'components', 'directives', 'classes', 'providers',
  //              'interfaces', 'enums', 'types', 'functions', 'consts'],
  //   pathTemplate: '${docType}',
  //   outputPathTemplate: '${docType}.json',
  // }];
});

docsPackager.config(function (readTypeScriptModules: ReadTypeScriptModules) {
  readTypeScriptModules.hidePrivateMembers = true;
});

docsPackager.config(function (readFilesProcessor) {
  // Disabled since we only use the "readTypeScriptModules" processor
  readFilesProcessor.$enabled = false;
});

// Configure processor for finding nunjucks templates.
docsPackager.config(function (templateFinder: any, templateEngine: any) {
  // Standard patterns for matching docs to templates

  templateFinder.templatePatterns = [
    'common.template.json',
  ];
  //
  // // Dgeni disables autoescape by default, but we want this turned on.
  // templateEngine.config.autoescape = true;
  //
  // // Nunjucks and Angular conflict in their template bindings so change Nunjucks
  // templateEngine.config.tags = {
  //   variableStart: '{$',
  //   variableEnd: '$}',
  // };

  // templateEngine.tags.push(new HighlightNunjucksExtension());
});

