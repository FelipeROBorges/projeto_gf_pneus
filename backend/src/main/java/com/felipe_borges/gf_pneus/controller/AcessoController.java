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

import com.felipe_borges.gf_pneus.dto.AcessoDTO;
import com.felipe_borges.gf_pneus.model.Acesso;
import com.felipe_borges.gf_pneus.model.Usuario;
import com.felipe_borges.gf_pneus.repository.AcessoRepository;
import com.felipe_borges.gf_pneus.repository.UsuarioRepository;
import com.felipe_borges.gf_pneus.service.AcessoService;
import com.felipe_borges.gf_pneus.service.AuthAndOperationService;
import com.felipe_borges.gf_pneus.service.LoggerService;

/**
 * Classe responsavel pela Administração de Acesso
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 02-10-2023
 * @lastUpdate 10-10-2023 - Felipe Borges
 */
@RestController
@CrossOrigin("${environment.front_url}")
public class AcessoController {

  @Autowired
  private AcessoRepository acessoRepository;

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private AcessoService acessoService;

  private final AuthAndOperationService auth_operationService;

  private final String sigla = "adm";

  @Autowired
  public AcessoController(AuthAndOperationService auth_operationService) {
    this.auth_operationService = auth_operationService;
  }

  @PostMapping("/acesso")
  HashMap<String, String> newAcesso(@RequestBody Acesso newAcesso, @RequestHeader("Authorization") String token) {
    HashMap<String, String> status = new HashMap<String, String>();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (auth_operationService.isUserAuthorized(usuario, sigla, "new")) {
      status.put("error", "Usuário não autorizado!");
    } else {
      if (acessoRepository.findByPerfilAndModuloNonDeleted(newAcesso.getPerfil().getId(),
          newAcesso.getModulo().getId()) != null) {
        status.put("error", "Acesso já possui registro no sistema!");
      } else {
        try {
          acessoRepository.save(newAcesso);
          status.put("ok", "Acesso cadastrado com sucesso!");

          auth_operationService.registerOperacao(newAcesso.getId(), "Cadastro de Acesso", usuario);
          LoggerService.logAction(newAcesso.getId(), token);
        } catch (Exception e) {
          status.put("error", "Erro na inserção de acesso!");
        }
      }
    }
    return status;
  }

  @GetMapping("/acesso")
  List<AcessoDTO> getAllAcessos(@RequestHeader("Authorization") String token) {
    List<AcessoDTO> acesso_list = new ArrayList<AcessoDTO>();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (!auth_operationService.isUserAuthorized(usuario, sigla, "get"))
      acesso_list = acessoService.getAllAcessos();

    LoggerService.logAction(Long.parseLong("0"), token);
    return acesso_list;
  }

  @GetMapping("/acesso/perfis_modulos")
  HashMap<String, Object> getPerfisAndModulos(@RequestHeader("Authorization") String token) {
    HashMap<String, Object> perfis_modulos = new HashMap<String, Object>();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (!auth_operationService.isUserAuthorized(usuario, sigla, "get"))
      perfis_modulos = acessoService.getPerfisAndModulos();

    LoggerService.logAction(Long.parseLong("0"), token);
    return perfis_modulos;
  }

  @GetMapping("/acesso/{id}")
  HashMap<String, Object> getAcessoById(@PathVariable Long id, @RequestHeader("Authorization") String token) {
    HashMap<String, Object> acesso = new HashMap<String, Object>();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (!auth_operationService.isUserAuthorized(usuario, sigla, "get"))
      acesso = acessoService.getAcessoAndPerfisAndModulos(id);

    LoggerService.logAction(id, token);
    return acesso;
  }

  @PutMapping("/acesso/{id}")
  HashMap<String, String> updateAcesso(@RequestBody Acesso newAcesso, @PathVariable Long id,
      @RequestHeader("Authorization") String token) throws Exception {
    HashMap<String, String> status = new HashMap<String, String>();

    Acesso acesso = acessoRepository.findByIdNonDeleted(id);

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (auth_operationService.isUserAuthorized(usuario, sigla, "update")) {
      status.put("error", "Usuário não autorizado!");
    } else {
      if (newAcesso.getPerfil().getId() != acesso.getPerfil().getId()
          && newAcesso.getModulo().getId() != acesso.getModulo().getId() && acessoRepository
              .findByPerfilAndModuloNonDeleted(newAcesso.getPerfil().getId(), newAcesso.getModulo().getId()) != null) {
        status.put("error", "Acesso já possui registro no sistema!");
      } else {
        try {
          acesso.setAlterar(newAcesso.getAlterar());
          acesso.setCadastrar(newAcesso.getCadastrar());
          acesso.setDeletar(newAcesso.getDeletar());
          acesso.setVisualizar(newAcesso.getVisualizar());
          acesso.setModulo(newAcesso.getModulo());
          acesso.setPerfil(newAcesso.getPerfil());

          acesso.setUpdated_at(LocalDateTime.now());
          acessoRepository.save(acesso);
          status.put("ok", "Acesso alterado com sucesso!");

          auth_operationService.registerOperacao(id, "Atualização de Acesso", usuario);
          LoggerService.logAction(id, token);
        } catch (Exception e) {
          status.put("error", "Erro na atualização do acesso!");
        }
      }
    }

    return status;
  }

  @DeleteMapping("/acesso/{id}")
  HashMap<String, String> deleteAcesso(@PathVariable Long id, @RequestHeader("Authorization") String token)
      throws Exception {
    HashMap<String, String> status = new HashMap<String, String>();

    Acesso acesso = acessoRepository.findByIdNonDeleted(id);

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (auth_operationService.isUserAuthorized(usuario, sigla, "delete")) {
      status.put("error", "Usuário não autorizado!");
    } else {
      try {
        acesso.setDeleted_at(LocalDateTime.now());
        acessoRepository.save(acesso);

        auth_operationService.registerOperacao(id, "Deleção de Acesso", usuario);
        LoggerService.logAction(id, token);
      } catch (Exception e) {
        status.put("error", "Erro na deleção do acesso!");
      }
    }

    return status;
  }
}
