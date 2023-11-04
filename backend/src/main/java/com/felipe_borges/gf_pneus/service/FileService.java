package com.felipe_borges.gf_pneus.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

/**
 * Classe responsavel por fornecer arquivos dentro do contexto da aplicação
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
@Service
public class FileService {
  private final ResourceLoader resourceLoader;

  public FileService(ResourceLoader resourceLoader) {
    this.resourceLoader = resourceLoader;
  }

  public String readTextFileContent(String filename) throws IOException {
    Resource resource = resourceLoader.getResource("classpath:" + filename);
    return new String(Files.readAllBytes(resource.getFile().toPath()), StandardCharsets.UTF_8);
  }
}
