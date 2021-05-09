import { Action, createReducer, on }  from '@ngrx/store';
import {
  SetLinks,
  SetLink,
  UpVote,
  DownVote,
  DeleteLink
} from './links.actions';
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
  ),
  on(
    UpVote, (state, { payload }) => ([
      ...state.map(link => {
        if (link['linkId'] === payload) {
          if (link['linkVote'] < 10) {
            return {...link, linkVote: link.linkVote + 1};
          }
        }
        return link;
      })
    ])
  ),
  on(
    DownVote, (state, { payload }) => ([
      ...state.map(link => {
        if (link['linkId'] === payload) {
          if (link['linkVote'] > 1) {
            return {...link, linkVote: link.linkVote + -1};
          }
        }
        return link;
      })
    ])
  ),
  on(
    DeleteLink, (state, { payload }) => ([
      ...state.filter(link => link.linkId !== payload)
    ])
  )
);

 export function linkReducer(state: Link[] | undefined, action: Action) {
  return _linkReducer(state, action);
};