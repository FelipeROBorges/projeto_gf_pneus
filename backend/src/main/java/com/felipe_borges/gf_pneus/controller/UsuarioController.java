package com.felipe_borges.gf_pneus.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.felipe_borges.gf_pneus.dto.UsuarioDTO;
import com.felipe_borges.gf_pneus.model.Usuario;
import com.felipe_borges.gf_pneus.repository.AcessoRepository;
import com.felipe_borges.gf_pneus.repository.UsuarioRepository;
import com.felipe_borges.gf_pneus.service.AuthAndOperationService;
import com.felipe_borges.gf_pneus.service.FileService;
import com.felipe_borges.gf_pneus.service.LoggerService;
import com.felipe_borges.gf_pneus.service.UsuarioService;

/**
 * Classe responsavel pela Administração de Usuarios
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 14-08-2023
 * @lastUpdate 27-10-2023 - João Vitor
 */
@RestController
@CrossOrigin("${environment.front_url}")
public class UsuarioController {

  @Value("${environment.front_url}")
  String frontend_url;

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private AcessoRepository acessoRepository;

  @Autowired
  private UsuarioService usuarioService;

  private final String sigla = "adm";

  private final AuthAndOperationService auth_operationService;

  @Autowired
  public UsuarioController(FileService fileService, AuthAndOperationService auth_operationService) {
    this.auth_operationService = auth_operationService;
  }

  @PostMapping("/usuario")
  HashMap<String, String> newUsuario(@RequestBody Usuario newUsuario, @RequestHeader("Authorization") String token) {
    HashMap<String, String> response = new HashMap<String, String>();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (auth_operationService.isUserAuthorized(usuario, sigla, "new")) {
      response.put("error", "Usuário não autorizado!");
    } else {
      try {
        newUsuario.setSenha(BCrypt.hashpw(newUsuario.getSenha(), BCrypt.gensalt()));
        newUsuario.setToken(UUID.randomUUID().toString());
        newUsuario.setStatus(true);

        usuarioRepository.save(newUsuario);
        response.put("ok", "Usuario cadastrado com sucesso!");

        auth_operationService.registerOperacao(newUsuario.getId(), "Cadastro de Usuário", usuario);
        LoggerService.logAction(newUsuario.getId(), token);
      } catch (Exception e) {
        response.put("error", "Erro na adição de usuário!");
      }
    }

    return response;
  }

  @GetMapping("/usuario")
  List<UsuarioDTO> getAllUsuarios(@RequestHeader("Authorization") String token) {
    List<UsuarioDTO> usuario_list = new ArrayList<UsuarioDTO>();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (!auth_operationService.isUserAuthorized(usuario, sigla, "get"))
      usuario_list = usuarioService.getAllUsuarios();

    LoggerService.logAction(Long.parseLong("0"), token);
    return usuario_list;
  }

  @GetMapping("/usuario/{id}")
  HashMap<String, Object> getUsuarioByIdAndPerfis(@PathVariable Long id, @RequestHeader("Authorization") String token) {
    HashMap<String, Object> usuario_gey_id = new HashMap<String, Object>();

    Usuario usuario = usuarioRepository.findByTokenNonInactive(token);
    if (!auth_operationService.isUserAuthorized(usuario, sigla, "get"))
      usuario_gey_id = usuarioService.getUsuarioAndPerfil(id);

    LoggerService.logAction(id, token);
    return usuario_gey_id;
  }

  @PutMapping("/usuario/{id}")
  HashMap<String, String> updateUsuario(@RequestBody Usuario newUsuario, @PathVariable Long id,
      @RequestHeader("Authorization") String token) throws Exception {
    HashMap<String, String> response = new HashMap<String, String>();

    Usuario usuario = usuarioRepository.findByIdNonDeleted(id);

    Usuario auth_usuario = usuarioRepository.findByTokenNonInactive(token);

    if (auth_operationService.isUserAuthorized(auth_usuario, sigla, "update")) {
      response.put("error", "Usuário não autorizado!");
    } else {
      try {
        usuario.setPerfil(newUsuario.getPerfil());
        usuario.setStatus(newUsuario.getStatus());
        usuario.setUpdated_at(LocalDateTime.now());
        usuarioRepository.save(usuario);
        response.put("ok", "Usuario alterado com sucesso!");

        auth_operationService.registerOperacao(id, "Atualização de Usuário", usuario);
        LoggerService.logAction(id, token);
      } catch (Exception e) {
        response.put("error", "Erro na atualização de cadastro!");
      }
    }
    return response;
  }

  // Autenticação de Usuario
  @PostMapping("/usuario/signin")
  HashMap<String, Object> oauthUsuario(@RequestBody HashMap<String, String> login_request) throws Exception {

    HashMap<String, Object> auth_response = new HashMap<String, Object>();

    Usuario usuario = usuarioRepository.findByEmailNonDeleted(login_request.get("email"));

    if (usuario != null) {
      if (login_request.containsKey("senha")) {
        boolean senhaMatches = BCrypt.checkpw(login_request.get("senha"), usuario.getSenha());
        if (!senhaMatches) {
          auth_response.put("error", "Senha incorreta!");
          return auth_response;
        }
      } else if (login_request.containsKey("token")) {
        if (!login_request.get("token").equals(usuario.getToken())) {
          auth_response.put("error", "Token inválido!");
          return auth_response;
        }
      }

      if (usuario.getStatus() != false) {
        auth_response.put("email", usuario.getEmail());
        auth_response.put("perfil", usuario.getPerfil().getNome());
        auth_response.put("token", usuario.getToken());
        auth_response.put("acessos", acessoRepository.findByPerfilNonDeleted(usuario.getPerfil().getId()));
        auth_response.put("nome", usuario.getNome());
        return auth_response;
      }
    }

    auth_response.put("error", "Erro no login!");
    return auth_response;
  }
}