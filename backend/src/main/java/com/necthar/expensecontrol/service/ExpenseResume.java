package com.necthar.expensecontrol.service;

import java.util.Map;

public class ExpenseResume {
    private final double total;
    private final Map<String, Double> totalPerCategory;

    public ExpenseResume(double total, Map<String, Double> totalPerCategory) {
        this.total = total;
        this.totalPerCategory = totalPerCategory;
    }

    public double getTotal() { return total; }
    public Map<String, Double> getTotalPerCategory() { return totalPerCategory; }
}
