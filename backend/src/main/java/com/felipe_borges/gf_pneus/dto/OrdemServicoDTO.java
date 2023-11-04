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
public class OrdemServicoDTO {
  private Long id;
  private String servico;
  private String modelo;
  private String placa;
  private String status;
  private String created_at;
  private LocalDateTime deleted_at;
  private String updated_at;
}