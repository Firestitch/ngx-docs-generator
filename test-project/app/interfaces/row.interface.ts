import { CellConfig } from './cell.interface';


export interface Row extends CellConfig {
  id: number;
  name?: string;
}

export interface FsListColumnDisabledFn {
  (name: string): boolean;
}

