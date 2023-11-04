package com.felipe_borges.gf_pneus.dto;

import java.time.LocalDateTime;

import lombok.Data;

/**
 * Classe responsavel definir a formatação dos dados do Model Acesso
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
@Data
public class AcessoDTO {
  private Long id;
  private String alterar;
  private String cadastrar;
  private String deletar;
  private String visualizar;
  private Long modulo_id;
  private String modulo;
  private Long perfil_id;
  private String perfil;
  private LocalDateTime created_at;
  private LocalDateTime deleted_at;
  private LocalDateTime updated_at;
}