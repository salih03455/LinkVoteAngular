import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Notification } from '../../models/notification';

export const getNotification = createFeatureSelector<Notification>('notification');