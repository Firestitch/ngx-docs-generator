import { Dgeni } from 'dgeni';
import { ReadTypeScriptModules } from 'dgeni-packages/typescript/processors/readTypeScriptModules';

import { docsPackager } from './docs-packager';
import {
  FILES_EXCLUDED,
  FILES_INCLUDED,
  FULL_OUTPUT_PATH,
  PROJECT_ROOT,
  TEMPLATES_PATH,
  updateIndexFile
} from './config';

docsPackager
  .config(function (
    readTypeScriptModules: ReadTypeScriptModules,
    tsParser: any,
    templateFinder: any,
    writeFilesProcessor: any,
    readFilesProcessor
  ) {
    // Set logging level
    // log.level = 'info';

    // Set the base path for the "readFilesProcessor" to the execroot. This is necessary because
    // otherwise the "writeFilesProcessor" is not able to write to the specified output path.
    readFilesProcessor.basePath = PROJECT_ROOT;

    // Set the base path for parsing the TypeScript source files to the directory that includes
    // all sources (also known as the path to the current Bazel target). This makes it easier for
    // custom processors (such as the `entry-point-grouper) to compute entry-point paths.
    readTypeScriptModules.basePath = PROJECT_ROOT;

    readTypeScriptModules.sourceFiles = [
      {
        include: FILES_INCLUDED,
        exclude: FILES_EXCLUDED,
      }
    ];

    // Initialize the "tsParser" path mappings. These will be passed to the TypeScript program
    // and therefore use the same syntax as the "paths" option in a tsconfig.
    tsParser.options.paths = {};

    // Base URL for the `tsParser`. The base URL refer to the directory that includes all
    // package sources that need to be processed by Dgeni.
    tsParser.options.baseUrl = PROJECT_ROOT;


    // This is ensures that the Dgeni TypeScript processor is able to parse node modules such
    // as the Angular packages which might be needed for doc items. e.g. if a class implements
    // the "AfterViewInit" interface from "@angular/core". This needs to be relative to the
    // "baseUrl" that has been specified for the "tsParser" compiler options.
    // tsParser.options.paths!['*'] = [join(PROJECT_ROOT, 'node_modules/*')];

    // Add a folder to search for our own templates to use when rendering docs
    templateFinder.templateFolders = [TEMPLATES_PATH];

    // Specify where the writeFilesProcessor will write our generated doc files
    writeFilesProcessor.outputFolder = FULL_OUTPUT_PATH;
  });


new Dgeni([docsPackager])
  .generate()
  .then(() => {
    console.log('Docs successfully generated!');

    updateIndexFile();
  })
  .catch((e: any) => {
    console.error(e);
    process.exit(1);
  });

export * from './interfaces';
