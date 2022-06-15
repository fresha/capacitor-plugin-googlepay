package com.fresha.capacitor.googlepay;

import com.google.android.gms.wallet.WalletConstants;

public enum PaymentsEnvironment {
    TEST, PRODUCTION;

    public int toWalletEnv() {
        switch (this) {
            case TEST:
                return WalletConstants.ENVIRONMENT_TEST;
            case PRODUCTION:
                return WalletConstants.ENVIRONMENT_PRODUCTION;
            default:
                throw new IllegalStateException("Unexpected value: " + this);
        }
    }
}
