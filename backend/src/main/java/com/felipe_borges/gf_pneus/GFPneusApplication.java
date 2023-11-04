package com.felipe_borges.gf_pneus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class GFPneusApplication {

  public static void main(String[] args) {
    SpringApplication.run(GFPneusApplication.class, args);
  }
}
