// Type definitions for non-npm package Google Pay API 0.6
// Project: https://developers.google.com/pay/api/web/
// Definitions by: Florian Luccioni <https://github.com/Fluccioni>,
//                 Radu Raicea <https://github.com/Radu-Raicea>,
//                 Filip Stanis <https://github.com/fstanis>
//                 Alexandre Couret <https://github.com/ozotek>
//                 Sergi Ferriz <https://github.com/mumpo>
//                 Soc Sieng <https://github.com/socsieng>
//                 Jose L Ugia <https://github.com/JlUgia>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Minimum TypeScript Version: 3.1
/**
 * Request for payment data.
 *
 * Contains several options to describe which information is being
 * requested and how it will be transferred.
 */
export interface PaymentDataRequest {
  /**
   * Detailed merchant information.
   *
   * This field is required.
   */
  merchantInfo: MerchantInfo;

  /**
   * Major API version.
   *
   * For this specification's version, this value should be 2.
   *
   * This field is required.
   */
  apiVersion: number;

  /**
   * Minor API version.
   *
   * For this specification's version, this value should be 0.
   *
   * This field is required.
   */
  apiVersionMinor: number;

  /**
   * Whether to collect the email from the buyer.
   *
   * The returned email can be retrieved from
   * PaymentData.email
   *
   * If omitted, defaults to `false`.
   *
   * @default false
   */
  emailRequired?: false | true | undefined;

  /**
   * Whether a shipping address is required from the buyer.
   *
   * The returned shipping address can be retrieved from
   * `Address`.
   *
   * If omitted, defaults to `false`.
   *
   * @default false
   */
  shippingAddressRequired?: false | true | undefined;

  /**
   * Optional shipping address parameters.
   *
   * If omitted, the default values specified in
   * `ShippingAddressParameters` will be
   * assumed.
   */
  shippingAddressParameters?: ShippingAddressParameters | undefined;

  /**
   * List of allowed payment methods.
   *
   * This field is required and must contain at least one
   * `PaymentMethodSpecification`.
   */
  allowedPaymentMethods: PaymentMethodSpecification[];

  /**
   * Detailed information about the transaction.
   *
   * This field is required.
   */
  transactionInfo: TransactionInfo;
}

/**
 * Request for the user's ability to display the Google Pay payment sheet
 * and provide at least one of the payment methods specified.
 *
 * A user's ability to pay may be tied to the capabilities of the current
 * context (browser/device) to display required components for the
 * specified payment methods including logging in to a Google Account and
 * providing one of the payment methods specified in
 * IsReadyToPayRequest`allowedPaymentMethods`
 *
 * Optionally provides a signal if one or more of the specified payment
 * methods exists for the current user.
 */
export interface IsReadyToPayRequest {
  /**
   * Major API version.
   *
   * For this specification's version, this value should be 2.
   *
   * Make sure this matches
   * `PaymentDataRequest.apiVersion` so
   * the `isReadyToPay` client method can correctly check whether the
   * specified API version is supported for the current context.
   *
   * This field is required.
   */
  apiVersion: number;

  /**
   * Minor API version.
   *
   * For this specification's version, this value should be 0.
   *
   * Make sure this matches
   * `PaymentDataRequest.apiVersionMinor`
   * so the `isReadyToPay` client method can correctly check whether the
   * specified API version is supported for the current context.
   *
   * This field is required.
   */
  apiVersionMinor: number;

  /**
   * List of allowed payment methods.
   *
   * This field is required and must contain at least one
   * allowed payment method.
   *
   * Check each filtering criteria within the payment method's
   * parameters field to see if the properties within are applicable for
   * `IsReadyToPayRequest`.
   */
  allowedPaymentMethods: IsReadyToPayPaymentMethodSpecification[];

  /**
   * If set to `true` then the
   * IsReadyToPayResponse.paymentMethodPresent
   * property will be populated with a boolean indicating the current
   * user's ability to pay with one or more of the payment methods
   * specified in
   * `IsReadyToPayRequest.allowedPaymentMethods`
   *
   * @default false
   */
  existingPaymentMethodRequired?: false | true | undefined;
}

/**
 * Payment data.
 *
 * Contains the payment data requested in
 * `PaymentDataRequest`
 */
export interface PaymentData {
  /**
   * Major API version.
   *
   * This value will match what was set in
   * PaymentDataRequest.apiVersion.
   */
  apiVersion: number;

  /**
   * Minor API version.
   *
   * This value will match what was set in
   * `PaymentDataRequest.apiVersionMinor`.
   */
  apiVersionMinor: number;

  /**
   * The buyer's email.
   *
   * This value will only be set if
   * `PaymentDataRequest.emailRequired`
   * was set to `true`.
   */
  email?: string | undefined;

  /**
   * The shipping address.
   *
   * This object will only be returned if
   * `PaymentDataRequest.shippingAddressRequired`
   * was set to `true`.
   */
  shippingAddress?: Address | undefined;

  /**
   * Data about the selected payment method.
   */
  paymentMethodData: PaymentMethodData;
}

/**
 * Information about a user's ability to provide payment information
 * through the Google Pay payment sheet.
 *
 * @example
 * ```
 * // The current user is able to provide payment
 * // information through the Google Pay payment sheet.
 * {
 *   "result": true
 * }
 * ```
 */
export interface IsReadyToPayResponse {
  /**
   * Whether the user is able to provide payment information through the
   * Google Pay payment sheet.
   *
   * A user's ability to pay may be tied to the capabilities of the
   * current context (browser/device) to display required components for
   * the specified payment methods including logging in to a Google
   * Account and providing one of the payment methods specified in
   * `IsReadyToPayRequest.allowedPaymentMethods`.
   */
  result: boolean;

  /**
   * The current user's ability to pay with one or more of the payment
   * methods specified in
   * `IsReadyToPayRequest.allowedPaymentMethods`
   *
   * This property only exists if
   * `IsReadyToPayRequest.existingPaymentMethodRequired`
   * was set to `true`. The property value will always be `true` if the
   * `PaymentsClient` is configured for a test
   * environment.
   */
  paymentMethodPresent?: false | true | undefined;
}

/**
 * Callback result for a payment authorization update.
 */
export interface PaymentAuthorizationResult {
  /**
   * Error for the last PaymentData, will be displayed to the user.
   */
  error?: PaymentDataError | undefined;

  /**
   * Represents the state of the transaction after callback is performed.
   */
  transactionState: TransactionState;
}

/**
 * Optional shipping address parameters for the returned shipping address.
 */
export interface ShippingAddressParameters {
  /**
   * Allowed country codes for the shipping address.
   *
   * This list should be an array of ISO 3166-1 alpha-2 country codes
   * (e.g., `["US", "CA", "JP"]`).
   *
   * If omitted, a shipping address from any supported country may be
   * returned.
   */
  allowedCountryCodes: string[];

  /**
   * Whether a phone number is additionally required from the buyer for
   * the shipping address (the phone number will only be returned if an
   * address is required, otherwise this field has no effect).
   *
   * If omitted, defaults to `false`.
   *
   * @default false
   */
  phoneNumberRequired?: false | true | undefined;
}

/**
 * Description of a user's address.
 */
export interface Address {
  /**
   * Name of the recipient at this address.
   */
  name?: string | undefined;

  /**
   * The first line of the address.
   *
   * Will be set to empty string if the address does not have a first
   * line.
   *
   * @default ""
   */
  address1?: string | undefined;

  /**
   * The second line of the address.
   *
   * Will be set to empty string if the address does not have a second
   * line.
   *
   * @default ""
   */
  address2?: string | undefined;

  /**
   * The third line of the address.
   *
   * Will be set to empty string if the address does not have a third
   * line.
   *
   * @default ""
   */
  address3?: string | undefined;

  /**
   * The locality (e.g. city or town).
   */
  locality: string;

  /**
   * The administrative area (e.g. state or province).
   */
  administrativeArea: string;

  /**
   * The two-letter ISO-3166 country code.
   */
  countryCode: string;

  /**
   * The postal code (also known in some places as ZIP code).
   *
   * Note: some regions do not have postal codes. In those cases
   * this field will be set to an empty string.
   */
  postalCode: string;

  /**
   * The sorting code.
   *
   * Note: some regions do not have sorting codes. In those cases
   * this field will be set to an empty string.
   */
  sortingCode?: string | undefined;

  /**
   * The phone number.
   *
   * This field will only be present if the caller requested that a phone
   * number be returned.
   */
  phoneNumber?: string | undefined;
}

/**
 * Limited information about user address for developer callbacks.
 */
export interface IntermediateAddress {
  /**
   * The administrative area (e.g. state or province).
   */
  administrativeArea: string;

  /**
   * The two-letter ISO-3166 country code.
   */
  countryCode: string;

  /**
   * The postal code (also known in some places as ZIP code).
   *
   * Note: some regions do not have postal codes. In those cases
   * this field will be set to an empty string.
   *
   * Also note: The returned postal code may vary based on the user's
   * geographic region. For Canada and United Kingdom, this contains only
   * the first three characters. For US, this contains the first five
   * digits.
   */
  postalCode: string;

  /**
   * The locality (e.g. city or town).
   */
  locality: string;
}

/**
 * Specification of accepted payment method for use in `isReadyToPay`.
 */
export interface IsReadyToPayPaymentMethodSpecification {
  /**
   * Type of payment method.
   *
   * This field is required.
   */
  type: PaymentMethodType;

  /**
   * Payment method parameters.
   *
   * The parameters set here affect which payment methods will be
   * available for the user to choose from.
   */
  parameters: CardParameters;

  /**
   * Tokenization parameters.
   *
   * These parameters will be used to tokenize/transmit the
   * payment method returned to you in a format you can charge or
   * reference.
   */
  tokenizationSpecification?:
    | PaymentMethodTokenizationSpecification
    | undefined;
}

/**
 * Specification of accepted payment method for use in `loadPaymentData`.
 */
export interface PaymentMethodSpecification {
  /**
   * Type of payment method.
   *
   * This field is required.
   */
  type: PaymentMethodType;

  /**
   * Payment method parameters.
   *
   * The parameters set here affect which payment methods will be
   * available for the user to choose from.
   */
  parameters: CardParameters;

  /**
   * Tokenization parameters.
   *
   * These parameters will be used to tokenize/transmit the
   * payment method returned to you in a format you can charge or
   * reference.
   */
  tokenizationSpecification: PaymentMethodTokenizationSpecification;
}

/**
 * Payment gateway tokenization parameters.
 *
 * These parameters will be used to tokenize/transmit the
 * payment method returned to you in a format you can charge or reference.
 */
export interface PaymentGatewayTokenizationSpecification {
  /**
   * The type of payment method tokenization to apply to the selected
   * payment method.
   */
  type: 'PAYMENT_GATEWAY';

  /**
   * Specific parameters used for payment gateway tokenization.
   */
  parameters: PaymentGatewayTokenizationParameters;
}

/**
 * Direct tokenization parameters.
 *
 * These parameters will be used to tokenize/transmit the direct
 * payment method returned to you in a format you can charge or reference.
 */
export interface DirectTokenizationSpecification {
  /**
   * The type of payment method tokenization to apply to the selected
   * payment method.
   */
  type: 'DIRECT';

  /**
   * Specific parameters used for direct tokenization.
   */
  parameters: DirectTokenizationParameters;
}

/**
 * Specific tokenization parameters used for
 * `PaymentMethodTokenizationType.DIRECT`.
 *
 * Depending on the payment method you may be required to receive the
 * sensitive data in an encrypted and signed format.
 *
 * Currently the following payment methods require encryption:
 *
 * - PaymentMethodType.CARD
 *
 * See [Payment data
 * cryptography](https://developers.google.com/pay/api/payment-data-cryptography")
 * for more information on how to perform signature
 * verification and decryption of a payment response.
 */
export interface DirectTokenizationParameters {
  /**
   * The version of the encryption/signature protocol being used.
   *
   * This field is required when the payment method requires encryption.
   * Unless you were already using an older `protocolVersion`, you
   * should be using the latest version defined in
   * https://developers.google.com/pay/api/web/payment-data-cryptography.
   */
  protocolVersion: string;

  /**
   * Elliptic Curve public key suitable for using with the NIST P-126
   * curve. This public key will be used to encrypt the sensitive payment
   * method information.
   *
   * This field is required when the payment method requires encryption.
   */
  publicKey: string;
}

/**
 * Specific tokenization parameters used for
 * `PaymentMethodTokenizationType.PAYMENT_GATEWAY`
 *
 * This object will generally have the following format:
 *
 * ```
 * {
 *   "gateway": "nameOfTheGateway",
 *   "param1": "value1",
 *   "param2": "value2",
 *   ...
 * }
 * ```
 *
 * The specific keys that you must set will depend on the gateway you
 * have specified. Please consult your gateway or processor documentation
 * on which parameters must be specified in this object.
 *
 * All values must be strings.
 */
export interface PaymentGatewayTokenizationParameters {
  /**
   * All keys must be strings.
   *
   * All values must be strings.
   */
  [key: string]: string;
}

/**
 * Optional billing address parameters for the returned billing address.
 */
export interface BillingAddressParameters {
  /**
   * Billing address format.
   *
   * If omitted, defaults to BillingAddressFormat.MIN.
   *
   * Note: you should only set format to BillingAddressFormat.FULL
   * when it is required to process the order. Additional form entry or
   * customer data requests can increase friction during the checkout
   * process and can lead to a lower conversion rate.
   */
  format: BillingAddressFormat;

  /**
   * Whether billing phone number required.
   *
   * If omitted, defaults to `false`.
   *
   * Note: you should only set this to `true` when a phone number
   * is required to process the order. Additional form entry or customer
   * data requests can increase friction during the checkout process and
   * can lead to a lower conversion rate.
   *
   * @default false
   */
  phoneNumberRequired?: false | true | undefined;
}

/**
 * Parameters for PaymentMethodType.CARD.
 *
 * The parameters specified here affect which payment methods are
 * available for users to choose from. For example, the list of supported
 * card networks can be filtered by setting the
 * CardParameters.allowedCardNetworks property.
 */
export interface CardParameters {
  /**
   * Allowed authentication methods.
   *
   * This field specifies what set of fields or your gateway/processor
   * supports for authenticating a card transaction. Please note that some
   * of your processor's capabilities may vary by market, so consult your
   * processor to determine the authentication forms they support.
   *
   * In general, you should list/support as many authentication methods
   * possible as to increase the chances that a user will be able to
   * complete a purchase. Not all cards support all authentication
   * methods, so the more methods you or your processor support the
   * better.
   *
   * This field is required.
   */
  allowedAuthMethods: CardAuthMethod[];

  /**
   * Allowed card networks.
   *
   * This field specifies what set of card networks your gateway/processor
   * supports for a card transaction.
   *
   * Note: Some cards may contain multiple brands and be processed across
   * different networks. In particular when
   * TransactionInfo.countryCode is set
   * to
   * "BR", users will be prompted to choose whether to process the
   * transaction over a debit network or credit network, and you should use
   * this field to know which network to process the transaction with. For
   * all other markets, this field will be set to a suggestion of a card
   * network to use for processing, but you or your processor may choose
   * to use different rails.
   *
   * This card network value **should not** be displayed.
   *
   * This field is required.
   */
  allowedCardNetworks: CardNetwork[];

  /**
   * Whether a prepaid card may be used for this transaction.
   *
   * If omitted, defaults to `true`.
   *
   * @default true
   */
  allowPrepaidCards?: false | true | undefined;

  /**
   * Whether a credit card may be used for this transaction.
   *
   * If omitted, defaults to `true`.
   *
   * @default true
   */
  allowCreditCards?: false | true | undefined;

  /**
   * Set to `true` to request assuranceDetails.
   *
   * If omitted, defaults to `false`.
   *
   * You may set if you need object provides information about the validation performed on the returned payment data.
   *
   * @default false
   */
  assuranceDetailsRequired?: boolean | undefined;

  /**
   * Whether a billing address is required from the buyer.
   *
   * If omitted, defaults to `false`.
   *
   * Note: you should only set this field to `true` when billing
   * address is required to process the order. Additional form entry or
   * customer data requests can increase friction during the checkout
   * process and can lead to a lower conversion rate.
   *
   * @default false
   */
  billingAddressRequired?: false | true | undefined;

  /**
   * Optional billing address parameters.
   *
   * If omitted, the default values specified in
   * BillingAddressParameters will be
   * assumed.
   */
  billingAddressParameters?: BillingAddressParameters | undefined;

  /**
   * List of card network parameters.
   *
   * This field is optional. You may set it when network specific
   * parameters are needed to complete a transaction.
   */
  cardNetworkParameters?: CardNetworkParameters[] | undefined;
}

/**
 * Assurance details about what validation has been performed on the returned payment credentials so that appropriate instrument risk checks can be applied.
 *
 *  Note: If both cardHolderAuthenticated and accountVerified are true, you don’t need to step up the returned credentials.
 *  If both aren’t, we recommend you to run the same risk checks and , authentication including 3D Secure flow if applicable.
 */
export interface AssuranceDetails {
  /**
   * If true, indicates that Cardholder possession validation has been performed on returned payment credential.
   */
  accountVerified?: boolean | undefined;

  /**
   * If true, indicates that identification and verifications (ID&V) was performed on the returned payment credential.
   *
   * If false, the same risk-based authentication can be performed as you would for card transactions.
   * This risk-based authentication can include, but not limited to, step-up with 3D Secure protocol if applicable.
   */
  cardHolderAuthenticated?: boolean | undefined;
}

/**
 * Parameters for card networks that can be used in this request.
 *
 * This should only be set for PaymentMethodType.CARD.
 */
export interface CardNetworkParameters {
  /**
   * Type of card network parameters. Currently only
   * CardNetwork.VISA and CardNetwork.MASTERCARD are
   * supported.
   *
   * This field is required.
   */
  cardNetwork: CardNetwork;

  /**
   * Acquiring institution identification code as assigned by the DS
   * receiving the AReq message for the given card network.
   *
   * This is an optional field. We recommend setting this field to allow
   * SCA challenges to be done for the given card network.
   */
  acquirerBin?: string | undefined;

  /**
   * Acquirer-assigned Merchant identifier for VISA.
   *
   * This is an optional field. We recommend setting this field to allow
   * SCA challenges to be done for the given card network.
   */
  acquirerMerchantId?: string | undefined;
}

/**
 * Detailed information about the merchant.
 */
export interface MerchantInfo {
  /**
   * A user visible merchant name.
   *
   * This name may be shown to the user in Google Pay to describe who the
   * user made a transaction with.
   *
   * This field is optional. If not set, the Business name in your Google
   * Pay Developer Profile will be used.
   */
  merchantName?: string | undefined;
}

/**
 * Detailed information about the transaction.
 */
export interface TransactionInfo {
  /**
   * Correlation ID to refer to this transaction.
   *
   * This field is optional. It is generated by the merchant and is used
   * for referring to this transaction later on (e.g. for debugging issues
   * when communicating with Google).
   */
  transactionId?: string | undefined;

  /**
   * ISO 4217 alphabetic currency code of the transaction.
   *
   * This is a required field.
   */
  currencyCode: string;

  /**
   * ISO 3166-1 alpha-2 country code for the country where the transaction
   * will be completed/processed.
   *
   * This is an optional field. We recommend setting this field to allow
   * country-specific customizations (for example, in some countries we
   * may need to provide extra information to you or your processor in
   * order to complete a transaction).
   */
  countryCode?: string | undefined;

  /**
   * Total price of this transaction.
   *
   * The format of this string should follow the regular expression
   * format:
   * `[0-9]+(\.[0-9][0-9])?` (e.g., `"10.45"`)
   *
   * This field is required if
   * CheckoutOption.TransactionInfo.totalPriceStatus
   * is set to
   * TotalPriceStatus.ESTIMATED or
   * TotalPriceStatus.FINAL.
   */
  totalPrice: string;

  /**
   * Total price label of this transaction.
   *
   * The string will be shown as the total price label on the cart modal
   * dialog page.
   *
   * This field is optional, but required if developer wants to show cart
   * information. Otherwise, the cart modal dialog will not be rendered
   * even if transactionInfo.displayItems is set.
   */
  totalPriceLabel?: string | undefined;

  /**
   * Status of this transaction's total price.
   *
   * This field is required.
   *
   * Note: some payment methods require that this field be set to
   * [TotalPriceStatus|`FINAL`] and that
   * the total price to be specified and final.
   */
  totalPriceStatus: TotalPriceStatus;

  /**
   * Optional checkout option parameter. Whether to use the 'Continue' or
   * the 'Pay Now' button for a buy flow.
   *
   * If omitted, defaults to CheckoutOption.DEFAULT and renders
   * the 'Continue' button for a buy flow.
   *
   * @default "DEFAULT"
   */
  checkoutOption?: CheckoutOption | undefined;
}

/**
 * Data for a payment method.
 */
export interface PaymentMethodData {
  /**
   * Type of payment method.
   */
  type: PaymentMethodType;

  /**
   * Payment method information.
   *
   * The definition of this field depends
   * on which payment method type was set in
   * PaymentMethodData.
   *
   * - For PaymentMethodType.CARD, this field
   *   will be an object conforming to CardInfo.
   */
  info?: CardInfo | undefined;

  /**
   * User-facing message to describe the payment method funding this
   * transaction.
   *
   * You are required to show this message to the buyer as confirmation of
   * their funding source. Please refer to the
   * [documentation](https://developers.google.com/pay/api/|documentation)
   * for more information.
   *
   * **IMPORTANT:** Do not attempt to parse the contents of this string as
   * the format, contents, and length may change at any time. If you need
   * additional details, see
   * PaymentMethodData.info.
   */
  description?: string | undefined;

  /**
   * Tokenization data for the payment method.
   */
  tokenizationData: PaymentMethodTokenizationData;
}

/**
 * Data for a PaymentMethodType.CARD payment
 * method.
 */
export interface CardInfo {
  /*
   *  AssuranceDetails
   *
   *  This object provides information about what validation
   *  has been performed on the returned payment credentials
   *  so that appropriate instrument risk checks can be applied.
   *
   *  To receive this object, set assuranceDetailsRequired: true inside CardParameters
   */
  assuranceDetails?: AssuranceDetails | undefined;

  /**
   * The card network.
   *
   * This card network value **should not** be displayed to
   * the buyer, but can be used when the details of a buyer's card are
   * needed. An example would be for customer support to help the buyer
   * identify the card used for this transaction. For a user-visible
   * description, use
   * `PaymentMethodData.description`
   * instead.
   */
  cardNetwork: CardNetwork;

  /**
   * The details about the card.
   *
   * This value will be generally the last 4 digits of the card.
   *
   * These details **should not** be displayed to the buyer,
   * but can be used when the details of a buyer's card are needed. An
   * example would be for customer support to help the buyer identify the
   * card used for this transaction. For a user-visible description, use
   * `PaymentMethodData.description`
   * instead.
   */
  cardDetails: string;

  /**
   * The billing address associated with the card.
   *
   * Note this billing address will only be populated when billing address
   * is set as required through
   * `CardParameters.billingAddressRequired`.
   */
  billingAddress?: Address | undefined;
}

/**
 * Tokenization data for the payment method.
 *
 * @see PaymentMethodTokenizationSpecification
 */
export interface PaymentMethodTokenizationData {
  /**
   * The type of tokenization to be applied to the selected payment
   * method.
   *
   * This value will match the
   * `PaymentMethodTokenizationSpecification.type`
   * specified in the request.
   */
  type: PaymentMethodTokenizationType;

  /**
   * The generated payment method token.
   *
   * The contents of this token and how it should be used will depend on
   * the selected
   * `PaymentMethodTokenizationSpecification.type`.
   */
  token: string;
}

/**
 * Definition of an error in PaymentData.
 */
export interface PaymentDataError {
  /**
   * Predefined error reason
   *
   * This field is required.
   */
  reason: ErrorReason;

  /**
   * Intent of where the error occurs. Only data that specified in the
   * callback intent will be returned so an exception will be thrown if
   * the intent does not fall into one of the provided intents in
   * PaymentRequest.
   *
   * This field is required.
   */
  intent: CallbackIntent;

  /**
   * Custom user visible error that will be displayed in a dialog.
   *
   * This field is required.
   */
  message: string;
}

/**
 * Payment method type enum string.
 *
 * Options:
 *
 * - `CARD`:
 *   CARD payment method.
 *
 *   Note that the payment method information that may be returned to you
 *   or your processor for a credit card transaction is meant to be used
 *   only once. If you need to charge the user again you must call the
 *   APIs to obtain new payment credentials.
 *
 *   Also note that when we transfer information like PAN (personal
 *   account number) to either you or your gateway/processor, they may not
 *   correspond to the user's physical card. For support purposes, please
 *   use user's card info returned in [CardInfo|`CardInfo`] instead.
 *
 * - `PAYPAL`:
 *   PAYPAL payment method.
 */
type PaymentMethodType = 'CARD' | 'PAYPAL';

/**
 * Tokenization parameters.
 *
 * These parameters will be used to tokenize/transmit the
 * payment method returned to you in a format you can charge or reference.
 */
type PaymentMethodTokenizationSpecification =
  | PaymentGatewayTokenizationSpecification
  | DirectTokenizationSpecification;

/**
 * Payment method tokenization type enum string.
 *
 * Options:
 *
 * - `PAYMENT_GATEWAY`:
 *   Tokenize a payment response to be consumed or charged by a specified
 *   third-party gateway service.
 *
 * - `DIRECT`:
 *   Tokenize to be consumed/charged directly by the merchant.
 */
type PaymentMethodTokenizationType = 'PAYMENT_GATEWAY' | 'DIRECT';

/**
 * Card network enum string.
 *
 * Options:
 *
 * - `AMEX`:
 *   American Express card network.
 *
 * - `DISCOVER`:
 *   Discover card network.
 *
 * - `ELECTRON`:
 *   Visa's Electron card network.
 *
 *   Note that this option can only be set when
 *   TransactionInfo.countryCode is set
 *   to `"BR"`, and CardParameters.allowedCardNetworks
 *   must also contain CardNetwork.VISA
 *
 *   For processing purposes, you should use this as an indication that
 *   the card must be processed through the Electron debit network.
 *
 * - `ELO`:
 *   Elo card network.
 *
 *   Note that this option can only be set when
 *   TransactionInfo.countryCode is set
 *   to `"BR"`.
 *
 * - `ELO_DEBIT`:
 *   Elo's debit network rail.
 *
 *   Note that this option can only be set when
 *   TransactionInfo.countryCode is set
 *   to
 *   `"BR"`, and
 *   CardParameters.allowedCardNetworks
 *   must also contain CardNetwork.ELO
 *
 *   For processing purposes, you should use this as an indication that
 *   the card must be processed through the ELO debit network.
 *
 * - `INTERAC`:
 *   Interac card network.
 *
 * - `JCB`:
 *   JCB card network.
 *
 * - `MAESTRO`:
 *   Maestro card network.
 *
 *   Note that this option can only be set when
 *   TransactionInfo.countryCode is set
 *   to `"BR"`, and CardParameters.allowedCardNetworks
 *   must also contain CardNetwork.MASTERCARD
 *
 *   For processing purposes, you should use this as an indication that
 *   the card must be processed through the Maestro debit network.
 *
 * - `MASTERCARD`:
 *   Mastercard card network.
 *
 * - `VISA`:
 *   Visa card network.
 */
type CardNetwork =
  | 'AMEX'
  | 'DISCOVER'
  | 'ELECTRON'
  | 'ELO'
  | 'ELO_DEBIT'
  | 'INTERAC'
  | 'JCB'
  | 'MAESTRO'
  | 'MASTERCARD'
  | 'VISA';

/**
 * Card authentication method enum string.
 *
 * Options:
 *
 * - `PAN_ONLY`:
 *   Authenticate using a PAN (personal account number) only.
 *
 *   Note: in addition to the PAN (personal account number) there will
 *   also be an expiration month and year.
 *
 *   If you are using PaymentMethodTokenizationType.PAYMENT_GATEWAY,
 *   you will not need to handle this sensitive data as it will be
 *   delivered to your gateway.
 *
 *   Warning: do not rely on the PAN returned being stable or being able
 *   to be used to reauthorize new transactions as the PAN is meant for
 *   one-time use only. Authorization for new transactions may fail if you
 *   reuse the credential across unrelated transactions.
 *
 * - `CRYPTOGRAM_3DS`:
 *   Authenticate using the 3-D Secure (3DS) cryptogram.
 *
 *   Note: in addition to the 3DS cryptogram there will also be an
 *   associated PAN (personal account number), expiration month and year,
 *   and Electronic Commerce Indicator for certain card networks.
 *
 *   If you are using PaymentMethodTokenizationType.PAYMENT_GATEWAY,
 *   you will not need to handle this sensitive data as it will be
 *   delivered to your gateway.
 *
 *   Warning: do not rely on the PAN returned being stable or being able
 *   to be used to reauthorize new transactions as the PAN and associated
 *   3DS cryptogram are meant for one-time use only. Authorization for new
 *   transactions may fail if you reuse the credential across unrelated
 *   transactions.
 */
type CardAuthMethod = 'PAN_ONLY' | 'CRYPTOGRAM_3DS';

/**
 * Billing address format enum string.
 *
 * Options:
 *
 * - `MIN`:
 *   Minimal billing address
 *
 *   When this format is used, the billing address returned will only
 *   contain the following fields:
 *
 *   - Address.name
 *   - Address.countryCode
 *   - Address.postalCode
 *   - Address.phoneNumber if BillingAddressParameters.phoneNumberRequired is set to `true`.
 *
 *   Note: some countries do not use postal codes. The postal code field
 *   will be empty in those countries.
 *
 * - `FULL`:
 *   Full billing address
 *
 *   All the fields in [Address|`Address`] will
 *   be returned, with the possible exception of
 *   Address.phoneNumber which will only be
 *   returned if BillingAddressParameters.phoneNumberRequired
 *   is set to `true`.
 *
 *   Only select this format when it is required to process the order.
 *   Additional form entry or customer data requests can increase friction
 *   during the checkout process and can lead to a lower conversion rate.
 */
type BillingAddressFormat = 'MIN' | 'FULL';

/**
 * The status of the total price used.
 *
 * Options:
 *
 * - `NOT_CURRENTLY_KNOWN`:
 *   The total price is not known currently.
 *
 * - `ESTIMATED`:
 *   The total price provided is an estimated price. The final price may
 *   change depending on the selected shipping address or billing address,
 *   if requested.
 *
 * - `FINAL`:
 *   The total price is the final total price of the transaction, and will
 *   not change based on selections made by the buyer.
 */
type TotalPriceStatus = 'NOT_CURRENTLY_KNOWN' | 'ESTIMATED' | 'FINAL';

/**
 * The options for checkout.
 *
 * Options:
 *
 * - `DEFAULT`:
 *   The default option for checkout. Use the 'Continue' button for a buy
 *   flow in the payments sheet. Once loadPaymentData completes, the
 *   integrator should show an order confirmation screen to finalize the
 *   purchase.
 *
 * - `COMPLETE_IMMEDIATE_PURCHASE`:
 *   Use the 'Pay' button to indicate a buy flow without a confirmation in
 *   the payments sheet to indicate that no further confirmation will be
 *   shown and the transaction will be processed once the user confirms
 *   only if TransactionInfo.totalPriceStatus is set to TotalPriceStatus.FINAL. Otherwise,
 *   a payment data request will fail.
 */
type CheckoutOption = 'DEFAULT' | 'COMPLETE_IMMEDIATE_PURCHASE';

/**
 * Enum string of a display item.
 *
 * Options:
 *
 * - `LINE_ITEM`:
 *   Regular line item.
 *
 * - `SUBTOTAL`:
 *   Subtotal of all regular items.
 *
 * - `TAX`:
 *   Item for the collected tax.
 *
 * - `DISCOUNT`:
 *   Item for a discount.
 *
 * - `SHIPPING_OPTION`:
 *   Item for shipping option.
 */
type DisplayItemType =
  | 'LINE_ITEM'
  | 'SUBTOTAL'
  | 'TAX'
  | 'DISCOUNT'
  | 'SHIPPING_OPTION';

/**
 * Enum string of a display item status.
 *
 * Options:
 *
 * - `FINAL`:
 *   DisplayItem is final and the item displays the value in price.
 *
 * - `PENDING`:
 *   DisplayItem does not display value in price but instead display as
 *   "pending".
 */
type DisplayItemStatus = 'FINAL' | 'PENDING';

/**
 * Enum string for the callback intents.
 *
 * Options:
 *
 * - `OFFER`:
 *   Callback occurs when offer info is changed.
 *
 * - `SHIPPING_ADDRESS`:
 *   Callback occurs when shipping address is changed.
 *
 * - `SHIPPING_OPTION`:
 *   Callback occurs when shipping option is changed.
 *
 *   If this callback intent is set, then
 *   [PaymentDataRequest.shippingOptionRequired|`PaymentDataRequest.shippingOptionRequired`]
 *   must be set to true.
 *
 *   [PaymentDataRequest.shippingOptionParameters|`PaymentDataRequest.shippingOptionParameters`]
 *   can optionally be set, if omitted, we will render a placeholder
 *   shipping option named "Shipping option pending" with id
 *   "shipping_option_unselected".
 *
 *   If developers receive a
 *   [IntermediatePaymentData.shippingOptionData|`IntermediatePaymentData.shippingOptionData`]
 *   with id "shipping_option_unselected", it means they need to populate
 *   valid
 *   [PaymentDataRequest.shippingOptionParameters|`PaymentDataRequest.shippingOptionParameters`]
 *   in the
 *   [PaymentDataRequestUpdate.newShippingOptionParameters|`PaymentDataRequestUpdate.newShippingOptionParameters`].
 *
 * - `PAYMENT_AUTHORIZATION`:
 *   Callback occurs when user authorized payment and
 *   [PaymentData|`PaymentData`] will be returned.
 *
 * - `PAYMENT_METHOD`:
 *   Callback occurs when payment method is changed.
 *
 *   Developer will receive callback data in
 *   [IntermediatePaymentData.paymentMethodData|`IntermediatePaymentData.paymentMethodData`]
 */
type CallbackIntent =
  | 'OFFER'
  | 'SHIPPING_ADDRESS'
  | 'SHIPPING_OPTION'
  | 'PAYMENT_AUTHORIZATION'
  | 'PAYMENT_METHOD';

/**
 * Enum string for the callback trigger.
 *
 * Options:
 *
 * - `OFFER`:
 *   Callback occurs after offer info is changed.
 *
 * - `SHIPPING_ADDRESS`:
 *   Callback occurs after shipping address is changed.
 *
 * - `SHIPPING_OPTION`:
 *   Callback occurs after shipping option is changed.
 *
 * - `INITIALIZE`:
 *   Callback occurs on initialize, every field specified by callback
 *   intent would be returned in
 *   [IntermediatePaymentData|`IntermediatePaymentData`] if applicable.
 *
 *   Note that this callback trigger may be triggered multiple times along
 *   a single call to loadPaymentData, so you must make sure you can
 *   handle multiple calls to it. For example, when the user changes
 *   accounts, we will call initialize again with data from the new
 *   account.
 */
type CallbackTrigger =
  | 'OFFER'
  | 'SHIPPING_ADDRESS'
  | 'SHIPPING_OPTION'
  | 'INITIALIZE';

/**
 * Enum string for error reason.
 *
 * Options:
 *
 * - `SHIPPING_ADDRESS_INVALID`:
 *   Error when the provided shipping address is an invalid address.
 *
 * - `SHIPPING_ADDRESS_UNSERVICEABLE`:
 *   Error when the provided shipping address cannot be served
 *   for this request.
 *
 * - `SHIPPING_OPTION_INVALID`:
 *   Error when the provided shipping option is not applicable to the
 *   current request. An example would be shipping option cannot be used
 *   for the selected shipping address.
 *
 * - `OFFER_INVALID`:
 *   Error when the provided offer info is invalid.
 *
 * - `PAYMENT_DATA_INVALID`:
 *   Error when the provided payment data is invalid. e.g. Payment token
 *   cannot be charged.
 *
 * - `OTHER_ERROR`:
 *   A catch-all for error not fitting anywhere else.
 */
type ErrorReason =
  | 'SHIPPING_ADDRESS_INVALID'
  | 'SHIPPING_ADDRESS_UNSERVICEABLE'
  | 'SHIPPING_OPTION_INVALID'
  | 'OFFER_INVALID'
  | 'PAYMENT_DATA_INVALID'
  | 'OTHER_ERROR';

/**
 * Enum strings for the state of the transaction.
 *
 * Options:
 *
 * - `SUCCESS`:
 *   Indicates the transaction was successful and the payment sheet should
 *   be dismissed.
 *
 * - `ERROR`:
 *   Indicates there's an error in the flow.
 *
 *   The Google Pay UI will show the merchant error message and allow user
 *   to retry.
 */
type TransactionState = 'SUCCESS' | 'ERROR';

/**
 * Configure this object for a production environment once you've tested
 * your implementation and you're ready to receive payments from shoppers.
 *
 * Example:
 *
 * ```js
 * {
 *   environment: "TEST",
 * }
 * ```
 */
export interface PaymentOptions {
  /**
   * This value specifies which Google Pay environment to target
   *
   * @default "TEST"
   */
  environment?: Environment | undefined;
}

/**
 * This object contains details about errors returned by client JavaScript
 * methods. Errors might not be displayed in a user-facing dialog.
 */
export interface PaymentsError {
  /**
   * Short code that describes the type of error.
   */
  statusCode: PaymentsErrorStatusCode | string;

  /**
   * Developer-facing message that describes the error encountered and
   * possible steps to correct it.
   */
  statusMessage: string;
}

/**
 * Supported environment names to run Google Pay.
 *
 * Options:
 *
 * - `PRODUCTION`:
 *   Used to return chargeable payment methods when a valid Google
 *   merchant ID is specified and configured for the domain.
 *
 * - `TEST`:
 *   Dummy payment methods that are suitable for testing (default).
 */
type Environment = 'PRODUCTION' | 'TEST';

/**
 * This object contains details about errors returned by client JavaScript
 * methods. Errors might not be displayed in a user-facing dialog.
 *
 * Options:
 *
 * - `BUYER_ACCOUNT_ERROR`:
 *   The current Google user is unable to provide payment information.
 *
 * - `DEVELOPER_ERROR`:
 *   A passed parameter is improperly formatted. An [error message may
 *   appear in the browser
 *   console](https://developer.mozilla.org/en-US/docs/Web/API/Console/error)
 *   for all configured environments.
 *
 * - `MERCHANT_ACCOUNT_ERROR`:
 *   The site accessing the Google Pay API does not have the right
 *   permission. This could be due to either an incorrect configuration or
 *   an incorrect merchant identifier set in the request. Check the
 *   `statusMessage` field for more details. If you continue to have
 *   trouble, please [contact
 *   support](https://developers.google.com/pay/api/web/support/how-to-get-help).
 *
 * - `INTERNAL_ERROR`:
 *   General server error.
 */
type PaymentsErrorStatusCode =
  | 'BUYER_ACCOUNT_ERROR'
  | 'DEVELOPER_ERROR'
  | 'MERCHANT_ACCOUNT_ERROR'
  | 'INTERNAL_ERROR';
