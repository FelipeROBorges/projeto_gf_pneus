package com.felipe_borges.gf_pneus.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.felipe_borges.gf_pneus.model.Perfil;
import com.felipe_borges.gf_pneus.model.Usuario;
import com.felipe_borges.gf_pneus.repository.PerfilRepository;
import com.felipe_borges.gf_pneus.repository.UsuarioRepository;
import com.felipe_borges.gf_pneus.service.AuthAndOperationService;
import com.felipe_borges.gf_pneus.service.LoggerService;

/**
 * Classe responsavel pela Administração de Perfis
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 03-08-2023
 * @lastUpdate 10-10-2023 - Felipe Borges
 */
@RestController
@CrossOrigin("${environment.front_url}")
public class PerfilController {

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private PerfilRepository perfilRepository;

  private final AuthAndOperationService auth_operationService;

  private final String sigla = "adm";

  @Autowired
  public PerfilController(AuthAndOperationService auth_operationService) {
    this.auth_operationService = auth_operationService;
  }

  @PostMapping("/perfil")
  HashMap<String, String> newPerfil(@RequestBody Perfil newPerfil, @RequestHeader("Authorization") String token) {
    HashMap<String, String> status = new HashMap<String, String>();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (auth_operationService.isUserAuthorized(usuario, sigla, "new")) {
      status.put("error", "Usuário não autorizado!");
    } else {
      if (perfilRepository.findByNome(newPerfil.getNome()) != null) {
        status.put("error", "Perfil já registrado no sistema!");
      } else {
        try {
          perfilRepository.save(newPerfil);
          status.put("ok", "Perfil cadastrado com sucesso!");

          auth_operationService.registerOperacao(newPerfil.getId(), "Cadastro de Perfil", usuario);
          LoggerService.logAction(newPerfil.getId(), token);
        } catch (Exception e) {
          status.put("error", "Erro na inserção de perfil!");
        }
      }
    }

    return status;
  }

  @GetMapping("/perfil")
  List<Perfil> getAllPerfis(@RequestHeader("Authorization") String token) {
    List<Perfil> perfil_list = new ArrayList<Perfil>();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (!auth_operationService.isUserAuthorized(usuario, sigla, "get"))
      perfil_list = perfilRepository.findAllNonDeleted();

    LoggerService.logAction(Long.parseLong("0"), token);
    return perfil_list;
  }

  @GetMapping("/perfil/{id}")
  Perfil getPerfilById(@PathVariable Long id, @RequestHeader("Authorization") String token) {
    Perfil perfil = new Perfil();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (!auth_operationService.isUserAuthorized(usuario, sigla, "get"))
      perfil = perfilRepository.findByIdNonDeleted(id);

    LoggerService.logAction(id, token);
    return perfil;
  }

  @PutMapping("/perfil/{id}")
  HashMap<String, String> updatePerfil(@RequestBody Perfil newPerfil, @PathVariable Long id,
      @RequestHeader("Authorization") String token) throws Exception {
    HashMap<String, String> status = new HashMap<String, String>();

    Perfil perfil = perfilRepository.findByIdNonDeleted(id);

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (auth_operationService.isUserAuthorized(usuario, sigla, "update")) {
      status.put("error", "Usuário não autorizado!");
    } else {
      if (!newPerfil.getNome().equals(perfil.getNome()) && perfilRepository.findByNome(newPerfil.getNome()) != null) {
        status.put("error", "Perfil já registrado no sistema!");
      } else {
        try {
          perfil.setNome(newPerfil.getNome());
          perfil.setDescricao(newPerfil.getDescricao());

          perfil.setUpdated_at(LocalDateTime.now());
          perfilRepository.save(perfil);
          status.put("ok", "Perfil alterado com sucesso!");

          auth_operationService.registerOperacao(id, "Atualização de Perfil", usuario);
          LoggerService.logAction(id, token);
        } catch (Exception e) {
          status.put("error", "Erro na atualização do perfil!");
        }
      }
    }

    return status;
  }

  @DeleteMapping("/perfil/{id}")
  HashMap<String, String> deletePerfil(@PathVariable Long id, @RequestHeader("Authorization") String token)
      throws Exception {
    HashMap<String, String> status = new HashMap<String, String>();

    Perfil perfil = perfilRepository.findByIdNonDeleted(id);

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (auth_operationService.isUserAuthorized(usuario, sigla, "delete")) {
      status.put("error", "Usuário não autorizado!");
    } else {
      try {
        perfil.setDeleted_at(LocalDateTime.now());
        perfilRepository.save(perfil);
        status.put("ok", "Pefil atualizado com sucesso!");

        auth_operationService.registerOperacao(id, "Deleção de Pefil", usuario);
        LoggerService.logAction(id, token);
      } catch (Exception e) {
        status.put("error", "Erro na deleção do perfil!");
      }
    }

    return status;
  }
}
