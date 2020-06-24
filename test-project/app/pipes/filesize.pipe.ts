import { Pipe, PipeTransform } from '@angular/core';

/**
 * Description for pipe
 */
@Pipe({ name: 'filesize' })
export class FileSizePipe implements PipeTransform {
  /**
   * @param size
   * @param extension - some description for additional param
   */
  transform(size: number, extension: string = 'MB') {
    return (size / (1024 * 1024)).toFixed(2) + extension;
  }
}
