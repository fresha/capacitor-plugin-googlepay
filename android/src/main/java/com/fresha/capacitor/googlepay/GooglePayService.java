package com.fresha.capacitor.googlepay;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.gms.wallet.AutoResolveHelper;
import com.google.android.gms.wallet.IsReadyToPayRequest;
import com.google.android.gms.wallet.PaymentData;
import com.google.android.gms.wallet.PaymentDataRequest;
import com.google.android.gms.wallet.PaymentsClient;
import com.google.android.gms.wallet.Wallet;
import org.json.JSONException;
import org.json.JSONObject;

interface CompletionHandler<T, E> {
    void onSuccess(T t);
    void onFailure(E e);
}

public class GooglePayService {

    private final PaymentsClient paymentsClient;

    public GooglePayService(Context context, String environment) {
        PaymentsEnvironment pe = PaymentsEnvironment.valueOf(environment);

        Wallet.WalletOptions walletOptions = new Wallet.WalletOptions.Builder()
                .setEnvironment(pe.toWalletEnv())
                .build();
        this.paymentsClient = Wallet.getPaymentsClient(context, walletOptions);
    }

    public void isReadyToPay(String callPayload, OnCompleteListener<Boolean> onCompleteListener) {
        IsReadyToPayRequest request = IsReadyToPayRequest.fromJson(callPayload);

        Task<Boolean> isReadyToPayTask = paymentsClient.isReadyToPay(request);
        isReadyToPayTask.addOnCompleteListener(onCompleteListener);
    }

    public void loadPaymentData(String callPayload, Activity activity) {
        PaymentDataRequest request = PaymentDataRequest.fromJson(callPayload);
        Task<PaymentData> loadPaymentDataTask = paymentsClient.loadPaymentData(request);
        AutoResolveHelper.resolveTask(loadPaymentDataTask, activity, Constants.REQUEST_PAYMENT_RESULT_CODE);
    }

    void handlePaymentResult(int resultCode, Intent data, CompletionHandler<JSONObject, Exception> handler) {
        switch (resultCode) {
            case Activity.RESULT_OK:
                PaymentData paymentData = PaymentData.getFromIntent(data);

                try {
                    handler.onSuccess(new JSONObject(paymentData.toJson()));
                } catch (final JSONException e) {
                    handler.onFailure(e);
                }
                break;
            case Activity.RESULT_CANCELED:
                handler.onFailure(new Exception("Cancelled"));
                break;
            case AutoResolveHelper.RESULT_ERROR:
                final Status status = AutoResolveHelper.getStatusFromIntent(data);
                if (status != null) {
                    handler.onFailure(new Exception(status.getStatusMessage()));
                    break;
                }
            default:
                handler.onFailure(new Exception("Unknown result error"));
        }
    }
}
