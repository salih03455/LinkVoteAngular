import { Action, createReducer, on }  from '@ngrx/store';
import { UpdateNotification, UpdateNotificationStatus } from './notification.actions';
import { Notification } from '../../models/notification';

export const initialState: Notification = {
  status: false,
  title: '',
  function: '',
  type: '',
};

const _notificationReducer = createReducer(
  initialState,
  on(
    UpdateNotification, (state, { payload }) => ({
      status: payload.status,
      title: payload.title,
      function: payload.function,
      type: payload.type
    })
  ),
  on(
    UpdateNotificationStatus, (state, { payload }) => ({
      ...state,
      status: payload
    })
  )
);

 export function notificationReducer(state: Notification | undefined, action: Action) {
  return _notificationReducer(state, action);
};