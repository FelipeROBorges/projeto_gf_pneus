package com.felipe_borges.gf_pneus.service;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.felipe_borges.gf_pneus.dto.UsuarioDTO;
import com.felipe_borges.gf_pneus.model.Usuario;
import com.felipe_borges.gf_pneus.repository.PerfilRepository;
import com.felipe_borges.gf_pneus.repository.UsuarioRepository;

/**
 * Classe responsavel pela formatação e distribuição de informações da tabela
 * usuario, assim como unificação de requisições usuario, perfil
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
@Service
public class UsuarioService {

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private PerfilRepository perfilRepository;

  public List<UsuarioDTO> getAllUsuarios() {
    List<Usuario> usuarios = usuarioRepository.findAllNonDeleted();
    return usuarios.stream().map(this::convertEntityToDto).collect(Collectors.toList());
  }

  public HashMap<String, Object> getUsuarioAndPerfil(Long id) {
    HashMap<String, Object> usuario_perfis = new HashMap<String, Object>();
    Usuario usuario = usuarioRepository.findByIdNonDeleted(id);

    usuario_perfis.put("usuario", convertEntityToDto(usuario));

    usuario_perfis.put("perfis", perfilRepository.findAllNonDeleted());

    return usuario_perfis;
  }

  public HashMap<String, Object> getServidorAndPerfil() {
    HashMap<String, Object> servidores_perfis = new HashMap<String, Object>();

    servidores_perfis.put("perfis", perfilRepository.findAllNonDeleted());

    return servidores_perfis;
  }

  private UsuarioDTO convertEntityToDto(Usuario usuario) {
    UsuarioDTO usuarioDTO = new UsuarioDTO();
    usuarioDTO.setId(usuario.getId());
    usuarioDTO.setNome(usuario.getNome());
    usuarioDTO.setStatus(usuario.getStatus());
    usuarioDTO.setEmail(usuario.getEmail());
    usuarioDTO.setPerfil(usuario.getPerfil());
    usuarioDTO.setCreated_at(usuario.getCreated_at());
    usuarioDTO.setDeleted_at(usuario.getDeleted_at());
    usuarioDTO.setUpdated_at(usuario.getUpdated_at());

    return usuarioDTO;
  }
}