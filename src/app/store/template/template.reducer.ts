import { Action, createReducer, on }  from '@ngrx/store';
import {
  UpdateNotification,
  UpdateNotificationStatus,
  SetModalAction
} from './template.actions';
import { Template } from '../../models/template';

export const initialState: Template = {};

const _templateReducer = createReducer(
  initialState,
  on(
    UpdateNotification, (state, { payload }) => ({
      ...state,
      notificationStatus: payload.notificationStatus,
      notificationTitle: payload.notificationTitle,
      notificationFunction: payload.notificationFunction,
      notificationType: payload.notificationType
    })
  ),
  on(
    UpdateNotificationStatus, (state, { payload }) => ({
      ...state,
      status: payload
    })
  ),
  on(
    SetModalAction, (state, { payload }) => (
      {
        ...state,
        modalStatus: payload.modalStatus,
        modalContinue: payload.modalContinue
      }
    )
  )
);

 export function templateReducer(state: Template | undefined, action: Action) {
  return _templateReducer(state, action);
};