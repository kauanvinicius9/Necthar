package com.exemplo.controlegastos.service;

import com.exemplo.controlegastos.model.Categoria;
import com.exemplo.controlegastos.model.Despesa;
import com.exemplo.controlegastos.repository.DespesaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DespesaService {

    private final DespesaRepository repository;

    public DespesaService(DespesaRepository repository) {
        this.repository = repository;
    }

    public List<Despesa> listarTodas() {
        return repository.findAllByOrderByDataDesc();
    }

    public Despesa buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Despesa nao encontrada com id " + id));
    }

    public Despesa criar(Despesa despesa) {
        return repository.save(despesa);
    }

    public Despesa atualizar(Long id, Despesa dados) {
        Despesa existente = buscarPorId(id);
        existente.setDescricao(dados.getDescricao());
        existente.setValor(dados.getValor());
        existente.setCategoria(dados.getCategoria());
        existente.setData(dados.getData());
        return repository.save(existente);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public ResumoGastos gerarResumo() {
        List<Despesa> todas = repository.findAll();

        double total = todas.stream().mapToDouble(Despesa::getValor).sum();

        Map<String, Double> porCategoria = todas.stream()
                .collect(Collectors.groupingBy(
                        d -> d.getCategoria().name(),
                        Collectors.summingDouble(Despesa::getValor)
                ));

        // garante que todas as categorias apareçam, mesmo com total zero
        for (Categoria c : Categoria.values()) {
            porCategoria.putIfAbsent(c.name(), 0.0);
        }

        return new ResumoGastos(total, porCategoria);
    }
}
