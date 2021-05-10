import { createAction, props } from '@ngrx/store';
import { Link } from '../../models/Link';

export const SetLinks = createAction(
  '[Links] Added',
  props<{ payload: Link[] }>()
);

export const SetLink = createAction(
  '[Link] Added',
  props<{ payload: Link }>()
);

export const UpVote = createAction(
  '[Vote] Up',
  props<{ payload: number }>()
);

export const DownVote = createAction(
  '[Vote] Down',
  props<{ payload: number }>()
);

export const DeleteLink = createAction(
  '[Link] Delete',
  props<{ payload: Link[] }>()
);
