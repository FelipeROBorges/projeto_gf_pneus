package com.felipe_borges.gf_pneus.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.felipe_borges.gf_pneus.model.Operacao;

/**
 * Classe responsavel por intermidiar a comunicação entre banco de dados e
 * aplicação referente a tabela operacao
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 06-10-2023
 */
public interface OperacaoRepository extends JpaRepository<Operacao, Long> {
}
