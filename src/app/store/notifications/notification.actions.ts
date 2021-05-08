import { createAction, props } from '@ngrx/store';
import { Notification } from '../../models/Notification';

export const UpdateNotification = createAction(
  '[Notification] Save',
  props<{ payload: Notification }>()
);

export const UpdateNotificationStatus = createAction(
  '[Notification] Status Change',
  props<{ payload: boolean }>()
);