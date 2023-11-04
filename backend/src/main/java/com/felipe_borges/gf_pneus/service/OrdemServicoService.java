package com.felipe_borges.gf_pneus.service;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.felipe_borges.gf_pneus.dto.OrdemServicoDTO;
import com.felipe_borges.gf_pneus.model.OrdemServico;
import com.felipe_borges.gf_pneus.repository.OrdemServicoRepository;
import com.felipe_borges.gf_pneus.repository.ServicoRepository;

/**
 * Classe responsavel pela distribuição de informações da tabela ordem_servico,
 * assim como unificação de requisições ordem_servico e servico
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
@Service
public class OrdemServicoService {

  @Autowired
  private OrdemServicoRepository ordemServicoRepository;

  @Autowired
  private ServicoRepository servicoRepository;

  public HashMap<String, Object> getOrdemServicoAndServico(Long id) {
    HashMap<String, Object> entity = new HashMap<String, Object>();
    entity.put("ordem_servico", ordemServicoRepository.findByIdNonDeleted(id));
    entity.put("servicos", servicoRepository.findAllNonDeleted());

    return entity;
  }

  public List<OrdemServicoDTO> getAllOrdemServico() {
    List<OrdemServico> ordem_servico = ordemServicoRepository.findAllNonDeleted();
    return ordem_servico.stream().map(this::convertEntityToDto).collect(Collectors.toList());
  }

  public List<OrdemServicoDTO> getAllByStatusOrdemServico() {
    List<OrdemServico> ordem_servico = ordemServicoRepository.findByStatusAllNonDeleted(false);
    return ordem_servico.stream().map(this::convertEntityToDto).collect(Collectors.toList());
  }

  private OrdemServicoDTO convertEntityToDto(OrdemServico ordem_servico) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

    OrdemServicoDTO ordemServicoDTO = new OrdemServicoDTO();
    ordemServicoDTO.setId(ordem_servico.getId());
    ordemServicoDTO.setModelo(ordem_servico.getModelo());
    ordemServicoDTO.setPlaca(ordem_servico.getPlaca());
    ordemServicoDTO.setServico(ordem_servico.getServico().getNome());
    ordemServicoDTO.setStatus(ordem_servico.getStatus() ? "Concluído" : "Em Andamento");
    ordemServicoDTO.setCreated_at(ordem_servico.getCreated_at().format(formatter));
    ordemServicoDTO
        .setUpdated_at(ordem_servico.getUpdated_at() != null ? ordem_servico.getUpdated_at().format(formatter) : "");
    ordemServicoDTO.setDeleted_at(ordem_servico.getDeleted_at());
    return ordemServicoDTO;
  }

}
