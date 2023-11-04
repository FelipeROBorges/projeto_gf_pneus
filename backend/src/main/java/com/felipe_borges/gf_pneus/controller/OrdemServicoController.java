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

import com.felipe_borges.gf_pneus.dto.OrdemServicoDTO;
import com.felipe_borges.gf_pneus.model.OrdemServico;
import com.felipe_borges.gf_pneus.model.Usuario;
import com.felipe_borges.gf_pneus.repository.OrdemServicoRepository;
import com.felipe_borges.gf_pneus.repository.UsuarioRepository;
import com.felipe_borges.gf_pneus.service.AuthAndOperationService;
import com.felipe_borges.gf_pneus.service.LoggerService;
import com.felipe_borges.gf_pneus.service.OrdemServicoService;

/**
 * Classe responsavel pela Administração de OrdemServico
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 28-10-2023
 * @lastUpdate
 */
@RestController
@CrossOrigin("${environment.front_url}")

public class OrdemServicoController {

  @Autowired
  private OrdemServicoRepository ordemServicoRepository;

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private OrdemServicoService ordemServicoService;

  private final String sigla = "gfp";

  private final AuthAndOperationService auth_operationService;

  @Autowired
  public OrdemServicoController(AuthAndOperationService auth_operationService) {
    this.auth_operationService = auth_operationService;
  }

  @PostMapping("/ordem_servico")
  HashMap<String, String> newOrdemServico(@RequestBody OrdemServico newOrdemServico,
      @RequestHeader("Authorization") String token) {
    HashMap<String, String> status = new HashMap<String, String>();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (auth_operationService.isUserAuthorized(usuario, sigla, "new")) {
      status.put("error", "Usuário não autorizado!");
    } else {
      try {
        ordemServicoRepository.save(newOrdemServico);
        status.put("ok", "Ordem de serviço cadastrada com sucesso!");

        auth_operationService.registerOperacao(newOrdemServico.getId(), "Cadastro de OrdemServico", usuario);
        LoggerService.logAction(newOrdemServico.getId(), token);

      } catch (Exception e) {
        status.put("error", "Erro na inserção de ordem de serviço!");
      }
    }

    return status;
  }

  @GetMapping("/ordem_servico")
  List<OrdemServicoDTO> getAllOrdemServicos(@RequestHeader("Authorization") String token) {
    List<OrdemServicoDTO> entity = new ArrayList<OrdemServicoDTO>();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (!auth_operationService.isUserAuthorized(usuario, sigla, "get"))
      entity = ordemServicoService.getAllOrdemServico();

    LoggerService.logAction(Long.parseLong("0"), token);
    return entity;
  }

  @GetMapping("/ordem_servico_nao_concluida")
  List<OrdemServicoDTO> getAllOrdemServicosNaoConcluida(@RequestHeader("Authorization") String token) {
    List<OrdemServicoDTO> entity = new ArrayList<OrdemServicoDTO>();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (!auth_operationService.isUserAuthorized(usuario, sigla, "get"))
      entity = ordemServicoService.getAllByStatusOrdemServico();

    LoggerService.logAction(Long.parseLong("0"), token);
    return entity;
  }

  @GetMapping("/ordem_servico/concluir/{id}")
  HashMap<String, String> concluirOrdemServico(@PathVariable Long id, @RequestHeader("Authorization") String token) {
    HashMap<String, String> status = new HashMap<String, String>();
    OrdemServico ordemServico = ordemServicoRepository.findByIdNonDeleted(id);

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (auth_operationService.isUserAuthorized(usuario, sigla, "update")) {
      status.put("error", "Usuário não autorizado!");
    } else {
      try {
        ordemServico.setStatus(true);
        ordemServico.setUpdated_at(LocalDateTime.now());
        ordemServicoRepository.save(ordemServico);
        status.put("ok", "Ordem de serviço concluída com sucesso!");

        auth_operationService.registerOperacao(id, "Atualização de ordem de serviço", usuario);
        LoggerService.logAction(id, token);
      } catch (Exception e) {
        status.put("error", "Erro na conclução da ordem de serviço!");
      }

    }

    return status;
  }

  @GetMapping("/ordem_servico/{id}")
  HashMap<String, Object> getOrdemServicoById(@PathVariable Long id, @RequestHeader("Authorization") String token) {
    HashMap<String, Object> entity = new HashMap<String, Object>();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (!auth_operationService.isUserAuthorized(usuario, sigla, "get"))
      entity = ordemServicoService.getOrdemServicoAndServico(id);

    return entity;
  }

  @PutMapping("/ordem_servico/{id}")
  HashMap<String, String> updateOrdemServico(@RequestBody OrdemServico newOrdemServico, @PathVariable Long id,
      @RequestHeader("Authorization") String token) throws Exception {
    HashMap<String, String> status = new HashMap<String, String>();
    OrdemServico ordemServico = ordemServicoRepository.findByIdNonDeleted(id);

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (auth_operationService.isUserAuthorized(usuario, sigla, "update")) {
      status.put("error", "Usuário não autorizado!");
    } else {
      try {
        ordemServico.setModelo(newOrdemServico.getModelo());
        ordemServico.setPlaca(newOrdemServico.getPlaca());
        ordemServico.setServico(newOrdemServico.getServico());
        ordemServico.setStatus(newOrdemServico.getStatus());
        ordemServico.setUpdated_at(LocalDateTime.now());
        ordemServicoRepository.save(ordemServico);
        status.put("ok", "Ordem de serviço alterada com sucesso!");

        auth_operationService.registerOperacao(id, "Atualização de ordem de serviço", usuario);
        LoggerService.logAction(id, token);
      } catch (Exception e) {
        status.put("error", "Erro na atualização da ordem de serviço!");
      }

    }

    return status;
  }

  @DeleteMapping("/ordem_servico/{id}")
  HashMap<String, String> deleteOrdemServico(@PathVariable Long id, @RequestHeader("Authorization") String token)
      throws Exception {
    HashMap<String, String> status = new HashMap<String, String>();
    OrdemServico ordemServico = ordemServicoRepository.findByIdNonDeleted(id);

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (auth_operationService.isUserAuthorized(usuario, sigla, "delete")) {
      status.put("error", "Usuário não autorizado!");
    } else {
      try {
        ordemServico.setDeleted_at(LocalDateTime.now());
        ordemServicoRepository.save(ordemServico);
        status.put("ok", "Ordem de serviço deletada com sucesso!");

        auth_operationService.registerOperacao(id, "Deleção de Ordem de Serviço", usuario);
        LoggerService.logAction(id, token);

      } catch (Exception e) {
        status.put("error", "Erro na deleção da ordem de serviço!");
      }
    }

    return status;
  }

  @GetMapping("/dashbord_ordem_servico")
  List<HashMap<String, Object>> getDashbordOS() {

    List<HashMap<String, Object>> dashbord_ordem_servico = new ArrayList<>();

    HashMap<String, Object> ordens_servico = new HashMap<>();

    List<OrdemServico> ordens_servico_query = new ArrayList<OrdemServico>();
    try {

      ordens_servico_query = ordemServicoRepository.findByStatusAllNonDeleted(false);

      if (ordens_servico_query.size() >= 32) {
        ordens_servico.put("primeira_fila_servico", ordens_servico_query.subList(0, 17));

        ordens_servico.put("segunda_fila_servico", ordens_servico_query.subList(17, 34));
      } else if (ordens_servico_query.size() >= 17) {
        ordens_servico.put("primeira_fila_servico", ordens_servico_query.subList(0, 17));

        ordens_servico.put("segunda_fila_servico", ordens_servico_query.subList(17, ordens_servico_query.size()));
      } else {
        ordens_servico.put("primeira_fila_servico", ordens_servico_query);

        ordens_servico.put("segunda_fila_servico", new ArrayList<>());
      }

      ordens_servico.put("total", ordens_servico_query.size());

      dashbord_ordem_servico.add(ordens_servico);
    } catch (Exception e) {
    }

    return dashbord_ordem_servico;
  }
}
