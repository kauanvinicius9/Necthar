package com.exemplo.controlegastos.service;

import java.util.Map;

public class ResumoGastos {
    private final double total;
    private final Map<String, Double> totalPorCategoria;

    public ResumoGastos(double total, Map<String, Double> totalPorCategoria) {
        this.total = total;
        this.totalPorCategoria = totalPorCategoria;
    }

    public double getTotal() { return total; }
    public Map<String, Double> getTotalPorCategoria() { return totalPorCategoria; }
}
