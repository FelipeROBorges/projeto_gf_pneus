package com.felipe_borges.gf_pneus.service;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.felipe_borges.gf_pneus.dto.AcessoDTO;
import com.felipe_borges.gf_pneus.model.Acesso;
import com.felipe_borges.gf_pneus.repository.AcessoRepository;
import com.felipe_borges.gf_pneus.repository.ModuloRepository;
import com.felipe_borges.gf_pneus.repository.PerfilRepository;

/**
 * Classe responsavel pela formatação e distribuição de informações da tabela
 * acesso, assim como unificação de requisições acesso, perfil e modulo
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
@Service
public class AcessoService {

  @Autowired
  private AcessoRepository acessoRepository;

  @Autowired
  private PerfilRepository perfilRepository;

  @Autowired
  private ModuloRepository moduloRepository;

  public HashMap<String, Object> getAcessoAndPerfisAndModulos(Long id) {
    HashMap<String, Object> acesso_perfis_modulos = new HashMap<String, Object>();
    acesso_perfis_modulos.put("acesso", acessoRepository.findByIdNonDeleted(id));
    acesso_perfis_modulos.put("perfis", perfilRepository.findAllNonDeleted());
    acesso_perfis_modulos.put("modulos", moduloRepository.findAllNonDeleted());

    return acesso_perfis_modulos;
  }

  public HashMap<String, Object> getPerfisAndModulos() {
    HashMap<String, Object> perfis_modulos = new HashMap<String, Object>();
    perfis_modulos.put("perfis", perfilRepository.findAllNonDeleted());
    perfis_modulos.put("modulos", moduloRepository.findAllNonDeleted());

    return perfis_modulos;
  }

  public List<AcessoDTO> getAllAcessos() {
    List<Acesso> acesso = acessoRepository.findAllNonDeleted();
    return acesso.stream().map(this::convertEntityToDto).collect(Collectors.toList());
  }

  private AcessoDTO convertEntityToDto(Acesso acesso) {
    AcessoDTO acessoDTO = new AcessoDTO();
    acessoDTO.setId(acesso.getId());
    acessoDTO.setAlterar(acesso.getAlterar() ? "Sim" : "Não");
    acessoDTO.setCadastrar(acesso.getCadastrar() ? "Sim" : "Não");
    acessoDTO.setDeletar(acesso.getDeletar() ? "Sim" : "Não");
    acessoDTO.setVisualizar(acesso.getVisualizar() ? "Sim" : "Não");
    acessoDTO.setPerfil_id(acesso.getPerfil().getId());
    acessoDTO.setPerfil(acesso.getPerfil().getDescricao());
    acessoDTO.setModulo_id(acesso.getPerfil().getId());
    acessoDTO.setModulo(acesso.getModulo().getNome());

    acessoDTO.setCreated_at(acesso.getCreated_at());
    acessoDTO.setDeleted_at(acesso.getDeleted_at());
    acessoDTO.setUpdated_at(acesso.getUpdated_at());

    return acessoDTO;
  }
}
