import {Processor} from 'dgeni';

/**
 * Processor to filter out symbols that should not be shown in the Material docs.
 */
export class ConvertToJson implements Processor {
  name = 'doc-to-json';
  $runAfter = ['entryPointGroupper'];
  $runBefore = ['docs-processed'];

  $process(docs: any): any {
    const content = {
      data: docs.map((doc) => {
        return { type: doc.docType, data: doc.data.map((d) => d.toJSON()) };
      })
    };

    return [{
      docType: 'docs',
      renderedContent: content
    }];
  }
}
