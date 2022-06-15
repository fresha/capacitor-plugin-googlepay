package com.fresha.capacitor.googlepay;

import android.content.Intent;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONException;
import org.json.JSONObject;

@CapacitorPlugin(name = "GooglePay", requestCodes = Constants.REQUEST_PAYMENT_RESULT_CODE)
public class GooglePayPlugin extends Plugin {

    private GooglePayService service;

    @PluginMethod
    public void initialize(PluginCall call) {
        if (!call.getData().has("environment")) {
            call.reject("Must provide an environment");
            return;
        }
        String environment = call.getString("environment");
        this.service = new GooglePayService(getContext(), environment);
        call.resolve();
    }

    /**
     * Example of canMakePayments in PluginCall
     * {
     *      "apiVersion": 2,
     *      "apiVersionMinor": 0,
     *      "allowedPaymentMethods": [
     *          {
     *              "type": "CARD",
     *              "parameters": {
     *                  "allowedAuthMethods": ["PAN_ONLY", "CRYPTOGRAM_3DS"],
     *                  "allowedCardNetworks": ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "MIR", "VISA"]
     *               }
     *           }
     *       ]
     * }
     */
    @PluginMethod
    public void isReadyToPay(PluginCall call) {
        if (this.service == null) {
            call.reject("Service not initialized.");
            return;
        }

        String callPayload = call.getData().toString();

        this.service.isReadyToPay(
                callPayload,
                task -> {
                    if (task.isSuccessful()) {
                        call.resolve(new JSObject().put("result", true));
                    } else {
                        Log.w("isReadyToPay failed", task.getException());
                        call.reject(task.getException().getMessage());
                    }
                }
            );
    }

    /**
     *
     * {
     *   "apiVersion": 2,
     *   "apiVersionMinor": 0,
     *   "merchantInfo": {
     *     "merchantName": "Example Merchant"
     *   },
     *   "allowedPaymentMethods": [
     *     {
     *       "type": "CARD",
     *       "parameters": {
     *         "allowedAuthMethods": ["PAN_ONLY", "CRYPTOGRAM_3DS"],
     *         "allowedCardNetworks": ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "MIR", "VISA"]
     *       },
     *       "tokenizationSpecification": {
     *         "type": "PAYMENT_GATEWAY",
     *         "parameters": {
     *           "gateway": "example",
     *           "gatewayMerchantId": "exampleGatewayMerchantId"
     *         }
     *       }
     *     }
     *   ],
     *   "transactionInfo": {
     *     "totalPriceStatus": "FINAL",
     *     "totalPrice": "12.34",
     *     "currencyCode": "USD"
     *   }
     * }
     *
     */
    @PluginMethod
    public void loadPaymentData(PluginCall call) {
        if (this.service == null) {
            call.reject("Service not initialized.");
            return;
        }

        saveCall(call);

        String callPayload = call.getData().toString();
        this.service.loadPaymentData(callPayload, getActivity());
    }

    /**
     *
     * Handles Activity result from `requestPayment`
     *
     */
    @Override
    protected void handleOnActivityResult(int requestCode, int resultCode, Intent data) {
        super.handleOnActivityResult(requestCode, resultCode, data);
        PluginCall call = getSavedCall();

        this.service.handlePaymentResult(
                resultCode,
                data,
                new CompletionHandler<JSONObject, Exception>() {
                    @Override
                    public void onSuccess(JSONObject jsonObject) {
                        try {
                            call.resolve(JSObject.fromJSONObject(jsonObject));
                        } catch (JSONException e) {
                            call.reject(e.getMessage(), e);
                        }
                        freeSavedCall();
                    }

                    @Override
                    public void onFailure(Exception e) {
                        call.reject(e.getMessage(), e);
                        freeSavedCall();
                    }
                }
            );
    }
}
