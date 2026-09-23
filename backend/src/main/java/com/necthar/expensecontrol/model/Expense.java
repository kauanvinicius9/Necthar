package com.necthar.expensecontrol.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

@Entity
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "A descrição é obrigatoria")
    @Column(nullable = false)
    private String description;

    @NotNull(message = "O valor é obrigatório")
    @Positive(message = "O valor deve ser maior que zero")
    @Column(nullable = false)
    private Double value;

    @NotNull(message = "A categoria é obrigatória")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @NotNull(message = "A data é obrigatória")
    @Column(nullable = false)
    private LocalDate date;

    public Expense() {
    }

    public Expense(String description, Double value, Category category, LocalDate date) {
        this.description = description;
        this.value = value;
        this.category = category;
        this.date = date;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getValue() { return value; }
    public void setValue(Double value) { this.value = value; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}
