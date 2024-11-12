package com.fast_and_reckless_bank.bank_service.controller;

import com.fast_and_reckless_bank.bank_service.model.Account;
import com.fast_and_reckless_bank.bank_service.service.AccountService;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/create")
    public ResponseEntity<Account> createAccount(@RequestParam String accountName) {
        Account account = accountService.createAccount(accountName);
        return new ResponseEntity<>(account, HttpStatus.CREATED);
    }

    @PostMapping("/deposit")
    public ResponseEntity<Void> deposit(@RequestParam String accountName, @RequestParam double amount) {
        accountService.deposit(accountName, amount);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/withdraw")
    public ResponseEntity<Map<String, String>> withdraw(@RequestParam String accountName, @RequestParam double amount) {
        try {
            accountService.withdraw(accountName, amount);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PostMapping("/transfer")
    public ResponseEntity<Map<String, String>> transfer(@RequestParam String fromAccountName,
            @RequestParam String toAccountName,
            @RequestParam double amount) {
        try {
            accountService.transfer(fromAccountName, toAccountName, amount);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @GetMapping("/{accountName}")
    public ResponseEntity<Account> getAccount(@PathVariable String accountName) {
        Account account = accountService.getAccount(accountName);
        if (account == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(account);
    }

    @GetMapping
    public ResponseEntity<Collection<Account>> getAllAccounts() {
        Collection<Account> accounts = accountService.getAllAccounts();
        return ResponseEntity.ok(accounts);
    }
}
