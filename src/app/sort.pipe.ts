import { Pipe, PipeTransform } from '@angular/core';
import { Link } from './models/Link';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Link[], arg: any): Link[] {
    const linkList: Link[] = [...value];
    // son eklenen en ustte
    if (parseInt(arg) === 0) {
      return linkList.sort((a: any, b: any) => {
        return b.linkId - a.linkId;
      })
    }
    // yuksek puandan dusuge, esitse son eklenen ustte
    if (parseInt(arg) === 1) {
      return linkList.sort((a: any, b: any) => {
        if (a.linkVote === b.linkVote) {
          return b.linkId - a.linkId;
        } else {
          return b.linkVote - a.linkVote;
        }
      })
    }
    // dusuk puandan yuksege, esitse son eklenen ustte
    if (parseInt(arg) === 2) {
      return linkList.sort((a: any, b: any) => {
        if (a.linkVote === b.linkVote) {
          return b.linkId - a.linkId;
        } else {
          return a.linkVote - b.linkVote;
        }
      });
    }
  }
}
