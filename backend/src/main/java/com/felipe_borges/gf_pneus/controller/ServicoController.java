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

import com.felipe_borges.gf_pneus.model.Servico;
import com.felipe_borges.gf_pneus.model.Usuario;
import com.felipe_borges.gf_pneus.repository.ServicoRepository;
import com.felipe_borges.gf_pneus.repository.UsuarioRepository;
import com.felipe_borges.gf_pneus.service.AuthAndOperationService;
import com.felipe_borges.gf_pneus.service.LoggerService;

/**
 * Classe responsável pela Administração de servico
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 28-10-2023
 * @lastUpdate
 */

@RestController
@CrossOrigin("${environment.front_url}")

public class ServicoController {
  @Autowired
  private ServicoRepository servicoRepository;

  @Autowired
  private UsuarioRepository usuarioRepository;

  private final String sigla = "gfp";

  private final AuthAndOperationService auth_operationService;

  @Autowired
  public ServicoController(AuthAndOperationService auth_operationService) {
    this.auth_operationService = auth_operationService;
  }

  @PostMapping("/servico")
  HashMap<String, String> newServico(@RequestBody Servico newServico, @RequestHeader("Authorization") String token) {
    HashMap<String, String> status = new HashMap<String, String>();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (auth_operationService.isUserAuthorized(usuario, sigla, "new")) {
      status.put("error", "Usuário não autorizado!");
    } else {
      try {
        if (servicoRepository.findByNomeNonDeleted(newServico.getNome()) == null) {
          servicoRepository.save(newServico);
          status.put("ok", "Serviço cadastrado com sucesso!");

          auth_operationService.registerOperacao(newServico.getId(), "Cadastro de Serviço", usuario);
          LoggerService.logAction(newServico.getId(), token);
        } else
          status.put("error", "Serviço já cadastrado!");
      } catch (Exception e) {
        status.put("error", "Erro na inserção do serviço!");
      }

    }

    return status;
  }

  @GetMapping("/servico")
  List<Servico> getAllServicos(@RequestHeader("Authorization") String token) {
    List<Servico> servico_list = new ArrayList<Servico>();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (!auth_operationService.isUserAuthorized(usuario, sigla, "get"))
      servico_list = servicoRepository.findAllNonDeleted();

    LoggerService.logAction(Long.parseLong("0"), token);
    return servico_list;
  }

  @GetMapping("/servico/{id}")
  Servico getServicoById(@PathVariable Long id, @RequestHeader("Authorization") String token) {
    Servico servico = new Servico();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (!auth_operationService.isUserAuthorized(usuario, sigla, "get"))
      servico = servicoRepository.findByIdNonDeleted(id);

    LoggerService.logAction(id, token);
    return servico;
  }

  @PutMapping("/servico/{id}")
  HashMap<String, String> updateServico(@RequestBody Servico newServico, @PathVariable Long id,
      @RequestHeader("Authorization") String token) throws Exception {
    HashMap<String, String> status = new HashMap<String, String>();

    Servico servico = servicoRepository.findByIdNonDeleted(id);

    if (!servico.getNome().equals(newServico.getNome())
        && servicoRepository.findByNomeNonDeleted(newServico.getNome()) != null) {
      status.put("error", "Serviço já cadastrado!");
      return status;
    }

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (auth_operationService.isUserAuthorized(usuario, sigla, "update")) {
      status.put("error", "Usuário não autorizado!");
    } else {
      try {
        servico.setNome(newServico.getNome());
        servico.setUpdated_at(LocalDateTime.now());
        servicoRepository.save(servico);
        status.put("ok", "Serviço alterado com sucesso!");

        auth_operationService.registerOperacao(id, "Atualização de Serviço", usuario);
        LoggerService.logAction(id, token);
      } catch (Exception e) {
        status.put("error", "Erro na atualização do serviço!");
      }

    }

    return status;
  }

  @DeleteMapping("/servico/{id}")
  HashMap<String, String> deleteServico(@PathVariable Long id, @RequestHeader("Authorization") String token)
      throws Exception {
    HashMap<String, String> status = new HashMap<String, String>();
    Servico servico = servicoRepository.findByIdNonDeleted(id);

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (auth_operationService.isUserAuthorized(usuario, sigla, "delete")) {
      status.put("error", "Usuário não autorizado!");
    } else {
      try {
        servico.setDeleted_at(LocalDateTime.now());
        servicoRepository.save(servico);
        status.put("ok", "Serviço deletado com sucesso!");

        auth_operationService.registerOperacao(id, "Deleção de Serviço", usuario);
        LoggerService.logAction(id, token);
      } catch (Exception e) {
        status.put("error", "Erro na deleção do serviço!");
      }
    }

    return status;
  }

}
