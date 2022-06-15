import type {
  IsReadyToPayRequest,
  IsReadyToPayResponse,
  PaymentOptions,
  PaymentDataRequest,
  PaymentData,
} from '../types/index';

export interface GooglePayPlugin {
  /**
   * Initiates a Google Pay client along with environment configuration.
   * This function should be called once- before using the plugin.
   * @param paymentOptions - An object containing environment type that should be used.
   * @returns Promise<void> after the client is initialized.
   */
  initialize(paymentOptions: PaymentOptions): Promise<void>;

  /**
   * Indicates whether the device supports Google Pay and whether the user has an allowed payment method.
   * @param request - Contains supported payment methods
   * @returns Promise<IsReadyToPayResponse>
   */
  isReadyToPay(request: IsReadyToPayRequest): Promise<IsReadyToPayResponse>;

  /**
   * Initiates a payment base on PaymentDataRequest object.
   * @param request - PaymentDataRequest object that will be used for the payment.
   * @returns Promise<PaymentData> containing token and additional data.
   * Promise will be rejected in case of errors, or when the flow is interrupted.
   */
  loadPaymentData(request: PaymentDataRequest): Promise<PaymentData>;
}
