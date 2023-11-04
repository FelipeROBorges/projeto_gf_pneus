package com.felipe_borges.gf_pneus.service;

import org.springframework.stereotype.Service;

import com.felipe_borges.gf_pneus.model.Acesso;
import com.felipe_borges.gf_pneus.model.Modulo;
import com.felipe_borges.gf_pneus.model.Operacao;
import com.felipe_borges.gf_pneus.model.Usuario;
import com.felipe_borges.gf_pneus.repository.AcessoRepository;
import com.felipe_borges.gf_pneus.repository.ModuloRepository;
import com.felipe_borges.gf_pneus.repository.OperacaoRepository;

import lombok.RequiredArgsConstructor;

/**
 * Classe responsavel por validar se a requisição feita para aplicação é
 * autorizada, assim como registrar todas as operações executadas no sistema
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
@Service
@RequiredArgsConstructor
public class AuthAndOperationService {

  private final AcessoRepository acessoRepository;

  private final ModuloRepository moduloRepository;

  private final OperacaoRepository operacaoRepository;

  public boolean isUserAuthorized(Usuario usuario, String sigla, String type) {
    Boolean validate_user = true;

    if (usuario == null) {
      return validate_user;
    }
    Modulo modulo = moduloRepository.findBySiglaNonDeleted(sigla);
    Acesso acesso = acessoRepository.findByPerfilAndModuloNonDeleted(usuario.getPerfil().getId(), modulo.getId());

    switch (type) {
    case "get":
      validate_user = !acesso.getVisualizar();
      break;
    case "new":
      validate_user = !acesso.getCadastrar();
      break;
    case "update":
      validate_user = !acesso.getAlterar();
      break;
    case "delete":
      validate_user = !acesso.getDeletar();
      break;
    }

    return validate_user;
  }

  public void registerOperacao(Long id, String nome, Usuario usuario) {
    Operacao operacao = new Operacao();
    operacao.setNome(nome);
    operacao.setUsuario(usuario);
    operacao.setId_operacao(id);
    operacaoRepository.save(operacao);
  }
}
