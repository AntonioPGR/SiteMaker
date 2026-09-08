package com.maker.website;

import org.springframework.data.jpa.repository.JpaRepository;
    
public interface MensagemRepository extends JpaRepository<Mensagem, Long> {}