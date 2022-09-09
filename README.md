# @fresha/capacitor-plugin-googlepay

This Google Pay plugin provides interfaces that allow you to initiate a Google Pay payment sheet based on provided PaymentOptions. When transaction is authorized, PaymentData response is returned along with payment details and more importantly- a payment token that you should pass to your backend.

The API is a subset of Google Pay for Web. Necessary typescript types has been extracted from [DefinitelyTyped/googlepay](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/googlepay).

The docs for payload scheme are available at [Google Pay docs](https://developers.google.com/pay/api/android/reference/request-objects?hl=pl).

## Install

```bash
npm install @fresha/capacitor-plugin-googlepay
npx cap sync
```

## Configuration

Before using this plugin, make sure that your project is correctly configured. Usually your Payment Services Processor will provide detailed instructions, so please read their docs first. The plugin configures your `AndroidManifest.xml` automatically with the following meta entry:

```xml
<meta-data
android:name="com.google.android.gms.wallet.api.enabled"
android:value="true"
/>
```

## Testing

To test the integration, use Google's Test Cards Suite: [Google Tutorial](https://developers.google.com/pay/api/android/guides/resources/test-card-suite)

## API

<docgen-index>

* [`initialize(...)`](#initialize)
* [`isReadyToPay(...)`](#isreadytopay)
* [`loadPaymentData(...)`](#loadpaymentdata)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### initialize(...)

```typescript
initialize(paymentOptions: PaymentOptions) => Promise<void>
```

Initiates a Google Pay client along with environment configuration.
This function should be called once: before using the plugin.

| Param                | Type                                                      | Description                                                  |
| -------------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| **`paymentOptions`** | <code><a href="#paymentoptions">PaymentOptions</a></code> | - An object containing environment type that should be used. |

--------------------


### isReadyToPay(...)

```typescript
isReadyToPay(request: IsReadyToPayRequest) => Promise<IsReadyToPayResponse>
```

Indicates whether the device supports Google Pay and whether the user has an allowed payment method.

| Param         | Type                                                                | Description                          |
| ------------- | ------------------------------------------------------------------- | ------------------------------------ |
| **`request`** | <code><a href="#isreadytopayrequest">IsReadyToPayRequest</a></code> | - Contains supported payment methods |

**Returns:** <code>Promise&lt;<a href="#isreadytopayresponse">IsReadyToPayResponse</a>&gt;</code>

--------------------


### loadPaymentData(...)

```typescript
loadPaymentData(request: PaymentDataRequest) => Promise<PaymentData>
```

Initiates a payment base on <a href="#paymentdatarequest">PaymentDataRequest</a> object.

| Param         | Type                                                              | Description                                                                                      |
| ------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **`request`** | <code><a href="#paymentdatarequest">PaymentDataRequest</a></code> | - <a href="#paymentdatarequest">PaymentDataRequest</a> object that will be used for the payment. |

**Returns:** <code>Promise&lt;<a href="#paymentdata">PaymentData</a>&gt;</code>

--------------------


### Interfaces


#### PaymentOptions

Configure this object for a production environment once you've tested
your implementation and you're ready to receive payments from shoppers.

Example:

```js
{
  environment: "TEST",
}
```

| Prop              | Type                                                | Description                                                 | Default             |
| ----------------- | --------------------------------------------------- | ----------------------------------------------------------- | ------------------- |
| **`environment`** | <code><a href="#environment">Environment</a></code> | This value specifies which Google Pay environment to target | <code>"TEST"</code> |


#### IsReadyToPayResponse

Information about a user's ability to provide payment information
through the Google Pay payment sheet.

| Prop                       | Type                 | Description                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`result`**               | <code>boolean</code> | Whether the user is able to provide payment information through the Google Pay payment sheet. A user's ability to pay may be tied to the capabilities of the current context (browser/device) to display required components for the specified payment methods including logging in to a Google Account and providing one of the payment methods specified in `IsReadyToPayRequest.allowedPaymentMethods`. |
| **`paymentMethodPresent`** | <code>boolean</code> | The current user's ability to pay with one or more of the payment methods specified in `IsReadyToPayRequest.allowedPaymentMethods` This property only exists if `IsReadyToPayRequest.existingPaymentMethodRequired` was set to `true`. The property value will always be `true` if the `PaymentsClient` is configured for a test environment.                                                              |


#### IsReadyToPayRequest

Request for the user's ability to display the Google Pay payment sheet
and provide at least one of the payment methods specified.

A user's ability to pay may be tied to the capabilities of the current
context (browser/device) to display required components for the
specified payment methods including logging in to a Google Account and
providing one of the payment methods specified in
IsReadyToPayRequest`allowedPaymentMethods`

Optionally provides a signal if one or more of the specified payment
methods exists for the current user.

| Prop                                | Type                                                  | Description                                                                                                                                                                                                                                                                                      | Default            |
| ----------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| **`apiVersion`**                    | <code>number</code>                                   | Major API version. For this specification's version, this value should be 2. Make sure this matches `PaymentDataRequest.apiVersion` so the `isReadyToPay` client method can correctly check whether the specified API version is supported for the current context. This field is required.      |                    |
| **`apiVersionMinor`**               | <code>number</code>                                   | Minor API version. For this specification's version, this value should be 0. Make sure this matches `PaymentDataRequest.apiVersionMinor` so the `isReadyToPay` client method can correctly check whether the specified API version is supported for the current context. This field is required. |                    |
| **`allowedPaymentMethods`**         | <code>IsReadyToPayPaymentMethodSpecification[]</code> | List of allowed payment methods. This field is required and must contain at least one allowed payment method. Check each filtering criteria within the payment method's parameters field to see if the properties within are applicable for `IsReadyToPayRequest`.                               |                    |
| **`existingPaymentMethodRequired`** | <code>boolean</code>                                  | If set to `true` then the IsReadyToPayResponse.paymentMethodPresent property will be populated with a boolean indicating the current user's ability to pay with one or more of the payment methods specified in `IsReadyToPayRequest.allowedPaymentMethods`                                      | <code>false</code> |


#### IsReadyToPayPaymentMethodSpecification

Specification of accepted payment method for use in `isReadyToPay`.

| Prop                            | Type                                                                                                      | Description                                                                                                                                             |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`type`**                      | <code><a href="#paymentmethodtype">PaymentMethodType</a></code>                                           | Type of payment method. This field is required.                                                                                                         |
| **`parameters`**                | <code><a href="#cardparameters">CardParameters</a></code>                                                 | Payment method parameters. The parameters set here affect which payment methods will be available for the user to choose from.                          |
| **`tokenizationSpecification`** | <code><a href="#paymentmethodtokenizationspecification">PaymentMethodTokenizationSpecification</a></code> | Tokenization parameters. These parameters will be used to tokenize/transmit the payment method returned to you in a format you can charge or reference. |


#### CardParameters

Parameters for <a href="#paymentmethodtype">PaymentMethodType</a>.CARD.

The parameters specified here affect which payment methods are
available for users to choose from. For example, the list of supported
card networks can be filtered by setting the
CardParameters.allowedCardNetworks property.

| Prop                           | Type                                                                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Default            |
| ------------------------------ | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **`allowedAuthMethods`**       | <code>CardAuthMethod[]</code>                                                 | Allowed authentication methods. This field specifies what set of fields or your gateway/processor supports for authenticating a card transaction. Please note that some of your processor's capabilities may vary by market, so consult your processor to determine the authentication forms they support. In general, you should list/support as many authentication methods possible as to increase the chances that a user will be able to complete a purchase. Not all cards support all authentication methods, so the more methods you or your processor support the better. This field is required.                                                                                                                              |                    |
| **`allowedCardNetworks`**      | <code>CardNetwork[]</code>                                                    | Allowed card networks. This field specifies what set of card networks your gateway/processor supports for a card transaction. Note: Some cards may contain multiple brands and be processed across different networks. In particular when TransactionInfo.countryCode is set to "BR", users will be prompted to choose whether to process the transaction over a debit network or credit network, and you should use this field to know which network to process the transaction with. For all other markets, this field will be set to a suggestion of a card network to use for processing, but you or your processor may choose to use different rails. This card network value **should not** be displayed. This field is required. |                    |
| **`allowPrepaidCards`**        | <code>boolean</code>                                                          | Whether a prepaid card may be used for this transaction. If omitted, defaults to `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | <code>true</code>  |
| **`allowCreditCards`**         | <code>boolean</code>                                                          | Whether a credit card may be used for this transaction. If omitted, defaults to `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>true</code>  |
| **`assuranceDetailsRequired`** | <code>boolean</code>                                                          | Set to `true` to request assuranceDetails. If omitted, defaults to `false`. You may set if you need object provides information about the validation performed on the returned payment data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>false</code> |
| **`billingAddressRequired`**   | <code>boolean</code>                                                          | Whether a billing address is required from the buyer. If omitted, defaults to `false`. Note: you should only set this field to `true` when billing address is required to process the order. Additional form entry or customer data requests can increase friction during the checkout process and can lead to a lower conversion rate.                                                                                                                                                                                                                                                                                                                                                                                                 | <code>false</code> |
| **`billingAddressParameters`** | <code><a href="#billingaddressparameters">BillingAddressParameters</a></code> | Optional billing address parameters. If omitted, the default values specified in BillingAddressParameters will be assumed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                    |
| **`cardNetworkParameters`**    | <code>CardNetworkParameters[]</code>                                          | List of card network parameters. This field is optional. You may set it when network specific parameters are needed to complete a transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |                    |


#### BillingAddressParameters

Optional billing address parameters for the returned billing address.

| Prop                      | Type                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                          | Default            |
| ------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **`format`**              | <code><a href="#billingaddressformat">BillingAddressFormat</a></code> | Billing address format. If omitted, defaults to <a href="#billingaddressformat">BillingAddressFormat</a>.MIN. Note: you should only set format to <a href="#billingaddressformat">BillingAddressFormat</a>.FULL when it is required to process the order. Additional form entry or customer data requests can increase friction during the checkout process and can lead to a lower conversion rate. |                    |
| **`phoneNumberRequired`** | <code>boolean</code>                                                  | Whether billing phone number required. If omitted, defaults to `false`. Note: you should only set this to `true` when a phone number is required to process the order. Additional form entry or customer data requests can increase friction during the checkout process and can lead to a lower conversion rate.                                                                                    | <code>false</code> |


#### CardNetworkParameters

Parameters for card networks that can be used in this request.

This should only be set for <a href="#paymentmethodtype">PaymentMethodType</a>.CARD.

| Prop                     | Type                                                | Description                                                                                                                                                                                                                                      |
| ------------------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`cardNetwork`**        | <code><a href="#cardnetwork">CardNetwork</a></code> | Type of card network parameters. Currently only CardNetwork.VISA and <a href="#cardnetwork">CardNetwork</a>.MASTERCARD are supported. This field is required.                                                                                    |
| **`acquirerBin`**        | <code>string</code>                                 | Acquiring institution identification code as assigned by the DS receiving the AReq message for the given card network. This is an optional field. We recommend setting this field to allow SCA challenges to be done for the given card network. |
| **`acquirerMerchantId`** | <code>string</code>                                 | Acquirer-assigned Merchant identifier for VISA. This is an optional field. We recommend setting this field to allow SCA challenges to be done for the given card network.                                                                        |


#### PaymentGatewayTokenizationSpecification

Payment gateway tokenization parameters.

These parameters will be used to tokenize/transmit the
payment method returned to you in a format you can charge or reference.

| Prop             | Type                                                                                                  | Description                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`type`**       | <code>'PAYMENT_GATEWAY'</code>                                                                        | The type of payment method tokenization to apply to the selected payment method. |
| **`parameters`** | <code><a href="#paymentgatewaytokenizationparameters">PaymentGatewayTokenizationParameters</a></code> | Specific parameters used for payment gateway tokenization.                       |


#### PaymentGatewayTokenizationParameters

Specific tokenization parameters used for
`PaymentMethodTokenizationType.PAYMENT_GATEWAY`

This object will generally have the following format:

```
{
  "gateway": "nameOfTheGateway",
  "param1": "value1",
  "param2": "value2",
  ...
}
```

The specific keys that you must set will depend on the gateway you
have specified. Please consult your gateway or processor documentation
on which parameters must be specified in this object.

All values must be strings.


#### DirectTokenizationSpecification

Direct tokenization parameters.

These parameters will be used to tokenize/transmit the direct
payment method returned to you in a format you can charge or reference.

| Prop             | Type                                                                                  | Description                                                                      |
| ---------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`type`**       | <code>'DIRECT'</code>                                                                 | The type of payment method tokenization to apply to the selected payment method. |
| **`parameters`** | <code><a href="#directtokenizationparameters">DirectTokenizationParameters</a></code> | Specific parameters used for direct tokenization.                                |


#### DirectTokenizationParameters

Specific tokenization parameters used for
`PaymentMethodTokenizationType.DIRECT`.

Depending on the payment method you may be required to receive the
sensitive data in an encrypted and signed format.

Currently the following payment methods require encryption:

- <a href="#paymentmethodtype">PaymentMethodType</a>.CARD

See [Payment data
cryptography](https://developers.google.com/pay/api/payment-data-cryptography")
for more information on how to perform signature
verification and decryption of a payment response.

| Prop                  | Type                | Description                                                                                                                                                                                                                                                                                                       |
| --------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`protocolVersion`** | <code>string</code> | The version of the encryption/signature protocol being used. This field is required when the payment method requires encryption. Unless you were already using an older `protocolVersion`, you should be using the latest version defined in https://developers.google.com/pay/api/web/payment-data-cryptography. |
| **`publicKey`**       | <code>string</code> | Elliptic Curve public key suitable for using with the NIST P-126 curve. This public key will be used to encrypt the sensitive payment method information. This field is required when the payment method requires encryption.                                                                                     |


#### PaymentData

Payment data.

Contains the payment data requested in
`PaymentDataRequest`

| Prop                    | Type                                                            | Description                                                                                                                |
| ----------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **`apiVersion`**        | <code>number</code>                                             | Major API version. This value will match what was set in PaymentDataRequest.apiVersion.                                    |
| **`apiVersionMinor`**   | <code>number</code>                                             | Minor API version. This value will match what was set in `PaymentDataRequest.apiVersionMinor`.                             |
| **`email`**             | <code>string</code>                                             | The buyer's email. This value will only be set if `PaymentDataRequest.emailRequired` was set to `true`.                    |
| **`shippingAddress`**   | <code><a href="#address">Address</a></code>                     | The shipping address. This object will only be returned if `PaymentDataRequest.shippingAddressRequired` was set to `true`. |
| **`paymentMethodData`** | <code><a href="#paymentmethoddata">PaymentMethodData</a></code> | Data about the selected payment method.                                                                                    |


#### Address

Description of a user's address.

| Prop                     | Type                | Description                                                                                                                                                     | Default         |
| ------------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| **`name`**               | <code>string</code> | Name of the recipient at this address.                                                                                                                          |                 |
| **`address1`**           | <code>string</code> | The first line of the address. Will be set to empty string if the address does not have a first line.                                                           | <code>""</code> |
| **`address2`**           | <code>string</code> | The second line of the address. Will be set to empty string if the address does not have a second line.                                                         | <code>""</code> |
| **`address3`**           | <code>string</code> | The third line of the address. Will be set to empty string if the address does not have a third line.                                                           | <code>""</code> |
| **`locality`**           | <code>string</code> | The locality (e.g. city or town).                                                                                                                               |                 |
| **`administrativeArea`** | <code>string</code> | The administrative area (e.g. state or province).                                                                                                               |                 |
| **`countryCode`**        | <code>string</code> | The two-letter ISO-3166 country code.                                                                                                                           |                 |
| **`postalCode`**         | <code>string</code> | The postal code (also known in some places as ZIP code). Note: some regions do not have postal codes. In those cases this field will be set to an empty string. |                 |
| **`sortingCode`**        | <code>string</code> | The sorting code. Note: some regions do not have sorting codes. In those cases this field will be set to an empty string.                                       |                 |
| **`phoneNumber`**        | <code>string</code> | The phone number. This field will only be present if the caller requested that a phone number be returned.                                                      |                 |


#### PaymentMethodData

Data for a payment method.

| Prop                   | Type                                                                                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`type`**             | <code><a href="#paymentmethodtype">PaymentMethodType</a></code>                         | Type of payment method.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **`info`**             | <code><a href="#cardinfo">CardInfo</a></code>                                           | Payment method information. The definition of this field depends on which payment method type was set in PaymentMethodData. - For <a href="#paymentmethodtype">PaymentMethodType</a>.CARD, this field will be an object conforming to <a href="#cardinfo">CardInfo</a>.                                                                                                                                                                                                              |
| **`description`**      | <code>string</code>                                                                     | User-facing message to describe the payment method funding this transaction. You are required to show this message to the buyer as confirmation of their funding source. Please refer to the [documentation](https://developers.google.com/pay/api/\|documentation) for more information. **IMPORTANT:** Do not attempt to parse the contents of this string as the format, contents, and length may change at any time. If you need additional details, see PaymentMethodData.info. |
| **`tokenizationData`** | <code><a href="#paymentmethodtokenizationdata">PaymentMethodTokenizationData</a></code> | Tokenization data for the payment method.                                                                                                                                                                                                                                                                                                                                                                                                                                            |


#### CardInfo

Data for a <a href="#paymentmethodtype">PaymentMethodType</a>.CARD payment
method.

| Prop                   | Type                                                          | Description                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`assuranceDetails`** | <code><a href="#assurancedetails">AssuranceDetails</a></code> |                                                                                                                                                                                                                                                                                                                                                                                                     |
| **`cardNetwork`**      | <code><a href="#cardnetwork">CardNetwork</a></code>           | The card network. This card network value **should not** be displayed to the buyer, but can be used when the details of a buyer's card are needed. An example would be for customer support to help the buyer identify the card used for this transaction. For a user-visible description, use `PaymentMethodData.description` instead.                                                             |
| **`cardDetails`**      | <code>string</code>                                           | The details about the card. This value will be generally the last 4 digits of the card. These details **should not** be displayed to the buyer, but can be used when the details of a buyer's card are needed. An example would be for customer support to help the buyer identify the card used for this transaction. For a user-visible description, use `PaymentMethodData.description` instead. |
| **`billingAddress`**   | <code><a href="#address">Address</a></code>                   | The billing address associated with the card. Note this billing address will only be populated when billing address is set as required through `CardParameters.billingAddressRequired`.                                                                                                                                                                                                             |


#### AssuranceDetails

Assurance details about what validation has been performed on the returned payment credentials so that appropriate instrument risk checks can be applied.

 Note: If both cardHolderAuthenticated and accountVerified are true, you don’t need to step up the returned credentials.
 If both aren’t, we recommend you to run the same risk checks and , authentication including 3D Secure flow if applicable.

| Prop                          | Type                 | Description                                                                                                                                                                                                                                                                                                                        |
| ----------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`accountVerified`**         | <code>boolean</code> | If true, indicates that Cardholder possession validation has been performed on returned payment credential.                                                                                                                                                                                                                        |
| **`cardHolderAuthenticated`** | <code>boolean</code> | If true, indicates that identification and verifications (ID&V) was performed on the returned payment credential. If false, the same risk-based authentication can be performed as you would for card transactions. This risk-based authentication can include, but not limited to, step-up with 3D Secure protocol if applicable. |


#### PaymentMethodTokenizationData

Tokenization data for the payment method.

| Prop        | Type                                                                                    | Description                                                                                                                                                              |
| ----------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`type`**  | <code><a href="#paymentmethodtokenizationtype">PaymentMethodTokenizationType</a></code> | The type of tokenization to be applied to the selected payment method. This value will match the `PaymentMethodTokenizationSpecification.type` specified in the request. |
| **`token`** | <code>string</code>                                                                     | The generated payment method token. The contents of this token and how it should be used will depend on the selected `PaymentMethodTokenizationSpecification.type`.      |


#### PaymentDataRequest

Request for payment data.

Contains several options to describe which information is being
requested and how it will be transferred.

| Prop                            | Type                                                                            | Description                                                                                                                                            | Default            |
| ------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| **`merchantInfo`**              | <code><a href="#merchantinfo">MerchantInfo</a></code>                           | Detailed merchant information. This field is required.                                                                                                 |                    |
| **`apiVersion`**                | <code>number</code>                                                             | Major API version. For this specification's version, this value should be 2. This field is required.                                                   |                    |
| **`apiVersionMinor`**           | <code>number</code>                                                             | Minor API version. For this specification's version, this value should be 0. This field is required.                                                   |                    |
| **`emailRequired`**             | <code>boolean</code>                                                            | Whether to collect the email from the buyer. The returned email can be retrieved from PaymentData.email If omitted, defaults to `false`.               | <code>false</code> |
| **`shippingAddressRequired`**   | <code>boolean</code>                                                            | Whether a shipping address is required from the buyer. The returned shipping address can be retrieved from `Address`. If omitted, defaults to `false`. | <code>false</code> |
| **`shippingAddressParameters`** | <code><a href="#shippingaddressparameters">ShippingAddressParameters</a></code> | Optional shipping address parameters. If omitted, the default values specified in `ShippingAddressParameters` will be assumed.                         |                    |
| **`allowedPaymentMethods`**     | <code>PaymentMethodSpecification[]</code>                                       | List of allowed payment methods. This field is required and must contain at least one `PaymentMethodSpecification`.                                    |                    |
| **`transactionInfo`**           | <code><a href="#transactioninfo">TransactionInfo</a></code>                     | Detailed information about the transaction. This field is required.                                                                                    |                    |


#### MerchantInfo

Detailed information about the merchant.

| Prop               | Type                | Description                                                                                                                                                                                                                               |
| ------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`merchantName`** | <code>string</code> | A user visible merchant name. This name may be shown to the user in Google Pay to describe who the user made a transaction with. This field is optional. If not set, the Business name in your Google Pay Developer Profile will be used. |


#### ShippingAddressParameters

Optional shipping address parameters for the returned shipping address.

| Prop                      | Type                  | Description                                                                                                                                                                                                                      | Default            |
| ------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **`allowedCountryCodes`** | <code>string[]</code> | Allowed country codes for the shipping address. This list should be an array of ISO 3166-1 alpha-2 country codes (e.g., `["US", "CA", "JP"]`). If omitted, a shipping address from any supported country may be returned.        |                    |
| **`phoneNumberRequired`** | <code>boolean</code>  | Whether a phone number is additionally required from the buyer for the shipping address (the phone number will only be returned if an address is required, otherwise this field has no effect). If omitted, defaults to `false`. | <code>false</code> |


#### PaymentMethodSpecification

Specification of accepted payment method for use in `loadPaymentData`.

| Prop                            | Type                                                                                                      | Description                                                                                                                                             |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`type`**                      | <code><a href="#paymentmethodtype">PaymentMethodType</a></code>                                           | Type of payment method. This field is required.                                                                                                         |
| **`parameters`**                | <code><a href="#cardparameters">CardParameters</a></code>                                                 | Payment method parameters. The parameters set here affect which payment methods will be available for the user to choose from.                          |
| **`tokenizationSpecification`** | <code><a href="#paymentmethodtokenizationspecification">PaymentMethodTokenizationSpecification</a></code> | Tokenization parameters. These parameters will be used to tokenize/transmit the payment method returned to you in a format you can charge or reference. |


#### TransactionInfo

Detailed information about the transaction.

| Prop                   | Type                                                          | Description                                                                                                                                                                                                                                                                                                                                   | Default                |
| ---------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| **`transactionId`**    | <code>string</code>                                           | Correlation ID to refer to this transaction. This field is optional. It is generated by the merchant and is used for referring to this transaction later on (e.g. for debugging issues when communicating with Google).                                                                                                                       |                        |
| **`currencyCode`**     | <code>string</code>                                           | ISO 4217 alphabetic currency code of the transaction. This is a required field.                                                                                                                                                                                                                                                               |                        |
| **`countryCode`**      | <code>string</code>                                           | ISO 3166-1 alpha-2 country code for the country where the transaction will be completed/processed. This is an optional field. We recommend setting this field to allow country-specific customizations (for example, in some countries we may need to provide extra information to you or your processor in order to complete a transaction). |                        |
| **`totalPrice`**       | <code>string</code>                                           | Total price of this transaction. The format of this string should follow the regular expression format: `[0-9]+(\.[0-9][0-9])?` (e.g., `"10.45"`) This field is required if CheckoutOption.<a href="#transactioninfo">TransactionInfo</a>.totalPriceStatus is set to TotalPriceStatus.ESTIMATED or TotalPriceStatus.FINAL.                    |                        |
| **`totalPriceLabel`**  | <code>string</code>                                           | Total price label of this transaction. The string will be shown as the total price label on the cart modal dialog page. This field is optional, but required if developer wants to show cart information. Otherwise, the cart modal dialog will not be rendered even if transactionInfo.displayItems is set.                                  |                        |
| **`totalPriceStatus`** | <code><a href="#totalpricestatus">TotalPriceStatus</a></code> | Status of this transaction's total price. This field is required. Note: some payment methods require that this field be set to [TotalPriceStatus\|`FINAL`] and that the total price to be specified and final.                                                                                                                                |                        |
| **`checkoutOption`**   | <code><a href="#checkoutoption">CheckoutOption</a></code>     | Optional checkout option parameter. Whether to use the 'Continue' or the 'Pay Now' button for a buy flow. If omitted, defaults to <a href="#checkoutoption">CheckoutOption</a>.DEFAULT and renders the 'Continue' button for a buy flow.                                                                                                      | <code>"DEFAULT"</code> |


### Type Aliases


#### Environment

Supported environment names to run Google Pay.

Options:

- `PRODUCTION`:
  Used to return chargeable payment methods when a valid Google
  merchant ID is specified and configured for the domain.

- `TEST`:
  Dummy payment methods that are suitable for testing (default).

<code>'PRODUCTION' | 'TEST'</code>


#### PaymentMethodType

Payment method type enum string.

Options:

- `CARD`:
  CARD payment method.

  Note that the payment method information that may be returned to you
  or your processor for a credit card transaction is meant to be used
  only once. If you need to charge the user again you must call the
  APIs to obtain new payment credentials.

  Also note that when we transfer information like PAN (personal
  account number) to either you or your gateway/processor, they may not
  correspond to the user's physical card. For support purposes, please
  use user's card info returned in [CardInfo|`CardInfo`] instead.

- `PAYPAL`:
  PAYPAL payment method.

<code>'CARD' | 'PAYPAL'</code>


#### CardAuthMethod

Card authentication method enum string.

Options:

- `PAN_ONLY`:
  Authenticate using a PAN (personal account number) only.

  Note: in addition to the PAN (personal account number) there will
  also be an expiration month and year.

  If you are using <a href="#paymentmethodtokenizationtype">PaymentMethodTokenizationType</a>.PAYMENT_GATEWAY,
  you will not need to handle this sensitive data as it will be
  delivered to your gateway.

  Warning: do not rely on the PAN returned being stable or being able
  to be used to reauthorize new transactions as the PAN is meant for
  one-time use only. Authorization for new transactions may fail if you
  reuse the credential across unrelated transactions.

- `CRYPTOGRAM_3DS`:
  Authenticate using the 3-D Secure (3DS) cryptogram.

  Note: in addition to the 3DS cryptogram there will also be an
  associated PAN (personal account number), expiration month and year,
  and Electronic Commerce Indicator for certain card networks.

  If you are using <a href="#paymentmethodtokenizationtype">PaymentMethodTokenizationType</a>.PAYMENT_GATEWAY,
  you will not need to handle this sensitive data as it will be
  delivered to your gateway.

  Warning: do not rely on the PAN returned being stable or being able
  to be used to reauthorize new transactions as the PAN and associated
  3DS cryptogram are meant for one-time use only. Authorization for new
  transactions may fail if you reuse the credential across unrelated
  transactions.

<code>'PAN_ONLY' | 'CRYPTOGRAM_3DS'</code>


#### CardNetwork

Card network enum string.

Options:

- `AMEX`:
  American Express card network.

- `DISCOVER`:
  Discover card network.

- `ELECTRON`:
  Visa's Electron card network.

  Note that this option can only be set when
  <a href="#transactioninfo">TransactionInfo.countryCode</a> is set
  to `"BR"`, and <a href="#cardparameters">CardParameters</a>.allowedCardNetworks
  must also contain <a href="#cardnetwork">CardNetwork</a>.VISA

  For processing purposes, you should use this as an indication that
  the card must be processed through the Electron debit network.

- `ELO`:
  Elo card network.

  Note that this option can only be set when
  <a href="#transactioninfo">TransactionInfo.countryCode</a> is set
  to `"BR"`.

- `ELO_DEBIT`:
  Elo's debit network rail.

  Note that this option can only be set when
  <a href="#transactioninfo">TransactionInfo.countryCode</a> is set
  to
  `"BR"`, and
  <a href="#cardparameters">CardParameters</a>.allowedCardNetworks
  must also contain <a href="#cardnetwork">CardNetwork</a>.ELO

  For processing purposes, you should use this as an indication that
  the card must be processed through the ELO debit network.

- `INTERAC`:
  Interac card network.

- `JCB`:
  JCB card network.

- `MAESTRO`:
  Maestro card network.

  Note that this option can only be set when
  <a href="#transactioninfo">TransactionInfo.countryCode</a> is set
  to `"BR"`, and <a href="#cardparameters">CardParameters</a>.allowedCardNetworks
  must also contain <a href="#cardnetwork">CardNetwork</a>.MASTERCARD

  For processing purposes, you should use this as an indication that
  the card must be processed through the Maestro debit network.

- `MASTERCARD`:
  Mastercard card network.

- `VISA`:
  Visa card network.

<code>'AMEX' | 'DISCOVER' | 'ELECTRON' | 'ELO' | 'ELO_DEBIT' | 'INTERAC' | 'JCB' | 'MAESTRO' | 'MASTERCARD' | 'VISA'</code>


#### BillingAddressFormat

Billing address format enum string.

Options:

- `MIN`:
  Minimal billing address

  When this format is used, the billing address returned will only
  contain the following fields:

  - <a href="#address">Address</a>.name
  - <a href="#address">Address</a>.countryCode
  - <a href="#address">Address</a>.postalCode
  - <a href="#address">Address.phoneNumber</a> if <a href="#billingaddressparameters">BillingAddressParameters.phoneNumberRequired</a> is set to `true`.

  Note: some countries do not use postal codes. The postal code field
  will be empty in those countries.

- `FULL`:
  Full billing address

  All the fields in [Address|`Address`] will
  be returned, with the possible exception of
  <a href="#address">Address.phoneNumber</a> which will only be
  returned if <a href="#billingaddressparameters">BillingAddressParameters</a>.phoneNumberRequired
  is set to `true`.

  Only select this format when it is required to process the order.
  Additional form entry or customer data requests can increase friction
  during the checkout process and can lead to a lower conversion rate.

<code>'MIN' | 'FULL'</code>


#### PaymentMethodTokenizationSpecification

Tokenization parameters.

These parameters will be used to tokenize/transmit the
payment method returned to you in a format you can charge or reference.

<code><a href="#paymentgatewaytokenizationspecification">PaymentGatewayTokenizationSpecification</a> | <a href="#directtokenizationspecification">DirectTokenizationSpecification</a></code>


#### PaymentMethodTokenizationType

Payment method tokenization type enum string.

Options:

- `PAYMENT_GATEWAY`:
  Tokenize a payment response to be consumed or charged by a specified
  third-party gateway service.

- `DIRECT`:
  Tokenize to be consumed/charged directly by the merchant.

<code>'PAYMENT_GATEWAY' | 'DIRECT'</code>


#### TotalPriceStatus

The status of the total price used.

Options:

- `NOT_CURRENTLY_KNOWN`:
  The total price is not known currently.

- `ESTIMATED`:
  The total price provided is an estimated price. The final price may
  change depending on the selected shipping address or billing address,
  if requested.

- `FINAL`:
  The total price is the final total price of the transaction, and will
  not change based on selections made by the buyer.

<code>'NOT_CURRENTLY_KNOWN' | 'ESTIMATED' | 'FINAL'</code>


#### CheckoutOption

The options for checkout.

Options:

- `DEFAULT`:
  The default option for checkout. Use the 'Continue' button for a buy
  flow in the payments sheet. Once loadPaymentData completes, the
  integrator should show an order confirmation screen to finalize the
  purchase.

- `COMPLETE_IMMEDIATE_PURCHASE`:
  Use the 'Pay' button to indicate a buy flow without a confirmation in
  the payments sheet to indicate that no further confirmation will be
  shown and the transaction will be processed once the user confirms
  only if <a href="#transactioninfo">TransactionInfo.totalPriceStatus</a> is set to <a href="#totalpricestatus">TotalPriceStatus</a>.FINAL. Otherwise,
  a payment data request will fail.

<code>'DEFAULT' | 'COMPLETE_IMMEDIATE_PURCHASE'</code>

</docgen-api>
