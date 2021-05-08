import { Action, createReducer, on }  from '@ngrx/store';
import { SetLinks } from './links.actions';
import { Link } from '../../models/link';

export const initialState: Link[] = [{
  linkName: '',
  linkUrl: '',
  linkVote: 5,
}];

const _linkReducer = createReducer(
  initialState,
  on(
    SetLinks, (state, { payload }) => (
      [...payload]
    )
  ),
  // on(
  //   UpdateNotificationStatus, (state, { payload }) => ({
  //     ...state,
  //     status: payload
  //   })
  // )
);

 export function linkReducer(state: Link[] | undefined, action: Action) {
  return _linkReducer(state, action);
};