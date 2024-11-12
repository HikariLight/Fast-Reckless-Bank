package com.fast_and_reckless_bank.bank_service.service;

import com.fast_and_reckless_bank.bank_service.model.Account;
import com.fast_and_reckless_bank.bank_service.model.Transfer;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Service
public class AccountService {
    private final Map<String, Account> accounts = new ConcurrentHashMap<>();

    public Account createAccount(String accountName) {
        Account account = new Account(accountName, 0.0);
        accounts.putIfAbsent(accountName, account);
        return account;
    }

    public synchronized void deposit(String accountName, double amount) {
        Account account = accounts.get(accountName);
        if (account != null) {
            synchronized (account) {
                account.setBalance(account.getBalance() + amount);
            }
        }
    }

    public synchronized void withdraw(String accountName, double amount) throws IllegalArgumentException {
        Account account = accounts.get(accountName);
        if (account != null) {
            synchronized (account) {
                if (account.getBalance() < amount) {
                    throw new IllegalArgumentException("Insufficient funds in account");
                }
                account.setBalance(account.getBalance() - amount);
            }
        }
    }

    public synchronized void transfer(String fromaccountName, String toaccountName, double amount)
            throws IllegalArgumentException {
        Account fromAccount = accounts.get(fromaccountName);
        Account toAccount = accounts.get(toaccountName);

        if (fromAccount == null || toAccount == null) {
            throw new IllegalArgumentException("Invalid account id");
        }

        synchronized (fromAccount) {
            synchronized (toAccount) {
                if (fromAccount.getBalance() < amount) {
                    throw new IllegalArgumentException("Insufficient funds for transfer");
                }
                fromAccount.setBalance(fromAccount.getBalance() - amount);
                toAccount.setBalance(toAccount.getBalance() + amount);
                fromAccount.addTransfer(new Transfer(fromaccountName, toaccountName, amount, LocalDateTime.now()));
            }
        }
    }

    public Account getAccount(String accountName) {
        return accounts.get(accountName);
    }

    public Collection<Account> getAllAccounts() {
        return accounts.values();
    }
}
