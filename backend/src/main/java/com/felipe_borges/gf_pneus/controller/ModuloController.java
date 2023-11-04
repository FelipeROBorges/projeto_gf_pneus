package com.felipe_borges.gf_pneus.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.felipe_borges.gf_pneus.model.Modulo;
import com.felipe_borges.gf_pneus.model.Usuario;
import com.felipe_borges.gf_pneus.repository.ModuloRepository;
import com.felipe_borges.gf_pneus.repository.UsuarioRepository;
import com.felipe_borges.gf_pneus.service.AuthAndOperationService;
import com.felipe_borges.gf_pneus.service.LoggerService;

/**
 * Classe responsavel pela Administração de Modulo
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 26-09-2023
 * @lastUpdate 10-10-2023 - Felipe Borges
 */
@RestController
@CrossOrigin("${environment.front_url}")
public class ModuloController {

  private final String sigla = "adm";

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private ModuloRepository moduloRepository;

  private final AuthAndOperationService auth_operationService;

  @Autowired
  public ModuloController(AuthAndOperationService auth_operationService) {
    this.auth_operationService = auth_operationService;
  }

  @GetMapping("/modulo")
  List<Modulo> getAllModulos(@RequestHeader("Authorization") String token) {
    List<Modulo> modulo_list = new ArrayList<Modulo>();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);

    if (!auth_operationService.isUserAuthorized(usuario, sigla, "get"))
      modulo_list = moduloRepository.findAllNonDeleted();

    LoggerService.logAction(Long.parseLong("0"), token);
    return modulo_list;
  }
}
