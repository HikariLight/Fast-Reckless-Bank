package com.fast_and_reckless_bank.bank_service.model;

import java.time.LocalDateTime;

public class Transfer {
    private final String fromAccountName;
    private final String toAccountName;
    private final double amount;
    private final LocalDateTime timestamp;

    public Transfer(String fromAccountName, String toAccountName, double amount, LocalDateTime timestamp) {
        this.fromAccountName = fromAccountName;
        this.toAccountName = toAccountName;
        this.amount = amount;
        this.timestamp = timestamp;
    }

    public String getFromAccountName() {
        return fromAccountName;
    }

    public String getToAccountName() {
        return toAccountName;
    }

    public double getAmount() {
        return amount;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}
