import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Link } from '../../models/link';

export const GetLinks = createFeatureSelector<Link[]>('link');