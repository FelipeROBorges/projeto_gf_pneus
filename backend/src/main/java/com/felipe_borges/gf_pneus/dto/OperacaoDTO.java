package com.felipe_borges.gf_pneus.dto;

import java.time.LocalDateTime;

import lombok.Data;

/**
 * Classe responsavel definir a formatação dos dados do Model Operacao
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
@Data
public class OperacaoDTO {
  private Long id;
  private String nome;
  private Long id_operacao;
  private String nome_usuario;
  private LocalDateTime created_at;
}