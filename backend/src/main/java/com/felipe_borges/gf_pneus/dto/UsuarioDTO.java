package com.felipe_borges.gf_pneus.dto;

import java.time.LocalDateTime;

import com.felipe_borges.gf_pneus.model.Perfil;

import lombok.Data;

/**
 * Classe responsavel definir a formatação dos dados do Model Usuario
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
@Data
public class UsuarioDTO {

  private Long id;
  private String nome;
  private String email;
  private Boolean status;
  private Perfil perfil;
  private LocalDateTime created_at;
  private LocalDateTime deleted_at;
  private LocalDateTime updated_at;
}