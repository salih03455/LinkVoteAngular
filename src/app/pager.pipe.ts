import { Pipe, PipeTransform } from '@angular/core';
import { Link } from './models/Link';

@Pipe({
  name: 'pager'
})
export class PagerPipe implements PipeTransform {

  transform(value: Link[], args: unknown[]): unknown {
    const links = [...value];
    return value.filter((link: Link, index) => {
      return link;
    });
  }

}
