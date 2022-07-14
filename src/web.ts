/* eslint-disable @typescript-eslint/no-unused-vars */
import { WebPlugin } from '@capacitor/core';

import type {
  IsReadyToPayRequest,
  IsReadyToPayResponse,
  PaymentData,
  PaymentDataRequest,
  PaymentOptions,
} from '../types';

import type { GooglePayPlugin } from './definitions';

export class GooglePayWeb extends WebPlugin implements GooglePayPlugin {
  initialize(_paymentOptions: PaymentOptions): Promise<void> {
    throw new Error('Method not implemented.');
  }
  isReadyToPay(_request: IsReadyToPayRequest): Promise<IsReadyToPayResponse> {
    throw new Error('Method not implemented.');
  }
  loadPaymentData(_request: PaymentDataRequest): Promise<PaymentData> {
    throw new Error('Method not implemented.');
  }
}
