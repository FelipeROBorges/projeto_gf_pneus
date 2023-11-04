package com.felipe_borges.gf_pneus.service;

import lombok.extern.slf4j.Slf4j;

/**
 * Classe responsavel pola mostragem de logs referentes as funções do sistema
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
@Slf4j
public class LoggerService {

  public static void logAction(Long id, String token) {
    StackTraceElement[] stackTrace = Thread.currentThread().getStackTrace();
    if (stackTrace.length >= 3) {
      String methodName = stackTrace[2].getMethodName();
      log.info(methodName + ": " + id + " com o token: " + token);
    }
  }
}