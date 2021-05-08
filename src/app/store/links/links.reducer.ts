import { Action, createReducer, on }  from '@ngrx/store';
import { SetLinks, SetLink } from './links.actions';
import { Link } from '../../models/link';

export const initialState: Link[] = [];

const _linkReducer = createReducer(
  initialState,
  on(
    SetLinks, (state, { payload }) => (
      [...payload]
    )
  ),
  on(
    SetLink, (state, { payload }) => ([
      ...state,
      payload
    ])
  )
);

 export function linkReducer(state: Link[] | undefined, action: Action) {
  return _linkReducer(state, action);
};