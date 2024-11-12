package com.fast_and_reckless_bank.bank_service.model;

import java.util.ArrayDeque;
import java.util.Deque;

public class Account {
    private final String accountName;
    private double balance;
    private final Deque<Transfer> recentTransfers = new ArrayDeque<>(50);

    public Account(String accountName, double initialBalance) {
        this.accountName = accountName;
        this.balance = initialBalance;
    }

    public String getaccountName() {
        return accountName;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public Deque<Transfer> getRecentTransfers() {
        return recentTransfers;
    }

    public void addTransfer(Transfer transfer) {
        if (recentTransfers.size() >= 50) {
            recentTransfers.poll();
        }
        recentTransfers.offer(transfer);
    }
}
