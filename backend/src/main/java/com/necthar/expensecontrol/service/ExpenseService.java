package com.necthar.expensecontrol.service;

import com.necthar.expensecontrol.model.Category;
import com.necthar.expensecontrol.model.Expense;
import com.necthar.expensecontrol.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    private final ExpenseRepository repository;

    public ExpenseService(ExpenseRepository repository) {
        this.repository = repository;
    }

    public List<Expense> listAll() {
        return repository.findAllByOrderByDateDesc();
    }

    public Expense findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Despesa não encontrada com ID " + id));
    }

    public Expense create(Expense expense) {
        return repository.save(expense);
    }

    public Expense update(Long id, Expense data) {
        Expense existing = findById(id);
        existing.setDescription(data.getDescription());
        existing.setValue(data.getValue());
        existing.setCategory(data.getCategory());
        existing.setDate(data.getDate());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public ExpenseResume generateResume() {
        List<Expense> all = repository.findAll();

        double total = all.stream().mapToDouble(Expense::getValue).sum();

        Map<String, Double> perCategory = all.stream()
                .collect(Collectors.groupingBy(
                        d -> d.getCategory().name(),
                        Collectors.summingDouble(Expense::getValue)
                ));

        for (Category c : Category.values()) {
            perCategory.putIfAbsent(c.name(), 0.0);
        }

        return new ExpenseResume(total, perCategory);
    }
}
