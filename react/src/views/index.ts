import { lazy } from 'react';
export * from './auth/auth.router';
export * from './home/home.router';
export * from './account/account.route';
export * from './marketing/marketing.route';
export * from './rewards/reward.route';
export * from './sales/sale.route';
export * from './admin/admin.route';
export const notfound = lazy(() => import('./notfound.component'));
