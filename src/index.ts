import { registerPlugin } from '@capacitor/core';

import type { GooglePayPlugin } from './definitions';

const GooglePay = registerPlugin<GooglePayPlugin>('GooglePay', {
  web: () => import('./web').then(m => new m.GooglePayWeb()),
});

export * from './definitions';
export { GooglePay };
