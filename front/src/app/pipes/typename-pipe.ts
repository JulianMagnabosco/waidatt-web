import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typename',
})
export class TypenamePipe implements PipeTransform {
  transform(value: string|undefined, ...args: unknown[]): string {

    return  value?.replace(/_/g, ' ') || '';
  }
}
