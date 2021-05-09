import { createAction, props } from '@ngrx/store';
import { Template } from '../../models/template';

export const UpdateNotification = createAction(
  '[Notification] Save',
  props<{ payload: Template }>()
);

export const UpdateNotificationStatus = createAction(
  '[Notification] Status Change',
  props<{ payload: boolean }>()
);
