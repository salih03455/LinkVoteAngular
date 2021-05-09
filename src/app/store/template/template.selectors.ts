import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Template } from '../../models/template';

export const GetTemplate = createFeatureSelector<Template>('template');