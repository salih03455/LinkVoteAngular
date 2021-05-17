import { Pipe, PipeTransform } from '@angular/core';
import { Link } from './models/Link';

@Pipe({
  name: 'pager'
})
export class PagerPipe implements PipeTransform {

  transform(value: Link[], arg: number[]): Link[] {
    const links = [...value];
    return links.filter((_, index) => arg[0] <= index && index < arg[1]);
  }

}
