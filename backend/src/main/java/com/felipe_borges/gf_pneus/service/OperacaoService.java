package com.felipe_borges.gf_pneus.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.felipe_borges.gf_pneus.dto.OperacaoDTO;
import com.felipe_borges.gf_pneus.model.Operacao;
import com.felipe_borges.gf_pneus.repository.OperacaoRepository;

/**
 * Classe responsavel pela formatação e distribuição de informações da tabela
 * operacao
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
@Service
public class OperacaoService {

  @Autowired
  private OperacaoRepository operacaoRepository;

  public List<OperacaoDTO> getAllOperacoes() {
    List<Operacao> operacao = operacaoRepository.findAll();
    return operacao.stream().map(this::convertEntityToDto).collect(Collectors.toList());
  }

  private OperacaoDTO convertEntityToDto(Operacao operacao) {
    OperacaoDTO operacaoDTO = new OperacaoDTO();
    operacaoDTO.setId(operacao.getId());
    operacaoDTO.setNome(operacao.getNome());
    operacaoDTO.setId_operacao(operacao.getId_operacao());
    operacaoDTO.setNome_usuario(operacao.getUsuario().getNome());
    operacaoDTO.setCreated_at(operacao.getCreated_at());

    return operacaoDTO;
  }
}
