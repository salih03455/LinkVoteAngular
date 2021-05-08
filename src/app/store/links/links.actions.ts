import { createAction, props } from '@ngrx/store';
import { Link } from '../../models/Link';

export const SetLinks = createAction(
  '[Links] Save',
  props<{ payload: Link[] }>()
);
