import { resolve } from 'path';
import { readFileSync } from 'fs';
import * as findUp from 'find-up';

// Load package json
const packagePath = findUp.sync(['package.json']);
const pkg = packagePath ? JSON.parse(readFileSync(packagePath, 'utf8')) : {};

// Load custom config
const configPath = findUp.sync(['docs-config.js']);
const config = configPath ? require(configPath) : {};

// Get output path
let outputPath = config?.output || 'docs';

if (pkg?.version) {
  outputPath = `${outputPath}/${pkg.version}`;
}

export const OUTPUT_FOLDER = outputPath;
export const PROJECT_ROOT = config?.basePath || process.cwd();
export const TEMPLATES_PATH = resolve(__dirname, './templates/');

export const FILES_INCLUDED = config?.include || 'src/app/**/*.ts';
export const FILES_EXCLUDED = config?.exclude || 'src/**/*.spec.ts';
