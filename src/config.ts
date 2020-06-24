import { resolve } from 'path';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import * as findUp from 'find-up';

// Load package json
const packagePath = findUp.sync(['package.json']);
const pkg = packagePath ? JSON.parse(readFileSync(packagePath, 'utf8')) : {};

// Load custom config
const configPath = findUp.sync(['docs-config.js']);
const config = configPath ? require(configPath) : {};

// Get output path
const outputPath = config?.output || 'docs';
let fullOutputPath = '';

if (pkg?.version) {
  fullOutputPath = `${outputPath}/${pkg.version}`;
}

export const PKG_VERSION = pkg.version;
export const OUTPUT_DIRECTORY = outputPath;
export const FULL_OUTPUT_PATH = fullOutputPath;
export const PROJECT_ROOT = config?.basePath || process.cwd();
export const TEMPLATES_PATH = resolve(__dirname, './templates/');

export const FILES_INCLUDED = config?.include || 'src/app/**/*.ts';
export const FILES_EXCLUDED = config?.exclude || 'src/**/*.spec.ts';

export function updateIndexFile() {
  const indexPath = outputPath + '/index.json';

  if (existsSync(indexPath)) {
    const content = JSON.parse(readFileSync(indexPath, 'utf8'));
    const versionExists = !!content?.versions
      .find((versionItem) => versionItem.version === PKG_VERSION);

    if (!versionExists) {
      content
        .versions
        .push({
          version: PKG_VERSION,
        });
    }
    writeFileSync(indexPath, JSON.stringify(content));
  } else {
    const content = { versions: [{version: PKG_VERSION}]};

    writeFileSync(indexPath, JSON.stringify(content));
  }
}
