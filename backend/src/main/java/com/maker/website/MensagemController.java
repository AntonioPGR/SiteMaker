package com.maker.website;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class MensagemController {
    
    private final MensagemRepository repository;

    public MensagemController(MensagemRepository repository) {
        this.repository = repository;
}

    @GetMapping("/hello")
    public Mensagem getHelloMessage() {
        return repository.findById(1L).orElseThrow();
    }
}