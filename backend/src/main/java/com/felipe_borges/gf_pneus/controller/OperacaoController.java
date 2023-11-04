package com.felipe_borges.gf_pneus.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.felipe_borges.gf_pneus.dto.OperacaoDTO;
import com.felipe_borges.gf_pneus.model.Usuario;
import com.felipe_borges.gf_pneus.repository.UsuarioRepository;
import com.felipe_borges.gf_pneus.service.AuthAndOperationService;
import com.felipe_borges.gf_pneus.service.LoggerService;
import com.felipe_borges.gf_pneus.service.OperacaoService;

/**
 * Classe responsavel pela Administração de Operacao
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 06-10-2023
 * @lastUpdate 10-10-2023 - Felipe Borges
 */
@RestController
@CrossOrigin("${environment.front_url}")
public class OperacaoController {

  private final String sigla = "adm";

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private OperacaoService operacaoService;

  private final AuthAndOperationService auth_operationService;

  @Autowired
  public OperacaoController(AuthAndOperationService auth_operationService) {
    this.auth_operationService = auth_operationService;
  }

  @GetMapping("/operacao")
  List<OperacaoDTO> getAllOperacoes(@RequestHeader("Authorization") String token) {
    List<OperacaoDTO> operacao_list = new ArrayList<OperacaoDTO>();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (!auth_operationService.isUserAuthorized(usuario, sigla, "get"))
      operacao_list = operacaoService.getAllOperacoes();

    LoggerService.logAction(Long.parseLong("0"), token);
    return operacao_list;
  }
}
