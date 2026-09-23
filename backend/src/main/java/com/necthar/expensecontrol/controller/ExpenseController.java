package com.necthar.expensecontrol.controller;

import com.necthar.expensecontrol.model.Expense;
import com.necthar.expensecontrol.service.ExpenseService;
import com.necthar.expensecontrol.service.ExpenseResume;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expense")
public class ExpenseController {

    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }

    @GetMapping
    public List<Expense> list() {
        return service.listAll();
    }

    @GetMapping("/{id}")
    public Expense get(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/resume")
    public ExpenseResume resume() {
        return service.generateResume();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Expense create(@Valid @RequestBody Expense expense) {
        return service.create(expense);
    }

    @PutMapping("/{id}")
    public Expense update(@PathVariable Long id, @Valid @RequestBody Expense expense) {
        return service.update(id, expense);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
