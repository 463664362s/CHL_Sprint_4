package com.example.tein8.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tein8.model.Voz;
import com.example.tein8.service.VozService;


@RestController
@RequestMapping("/api/voz")
public class VozController {



    @Autowired
    private VozService service;
    
    @GetMapping
    public List<Voz> index(){
        return service.listAll();
    }

    @PostMapping
    public ResponseEntity<Voz> create(@RequestBody @Valid Voz voz){
        service.save(voz);
        return ResponseEntity.status(HttpStatus.CREATED).body(voz);
    }

    @GetMapping("{id}")
    public ResponseEntity<Voz> show(@PathVariable Long id){
        return ResponseEntity.of(service.getById(id));
    }
     
    @DeleteMapping("{id}")
    public ResponseEntity<Object> destroy(@PathVariable Long id){

        Optional<Voz> optional = service.getById(id);

        if(optional.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        service.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("{id}")
    public ResponseEntity<Voz> update(@PathVariable Long id,@RequestBody Voz newVoz) {
        // bucar tarefa no bf
        Optional<Voz> optional = service.getById(id);

        // verificar se existe tarefa com esse id
        if(optional.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        //atualizar os dados no objeto en
        var voz = optional.get();
        BeanUtils.copyProperties(newVoz, voz);
        voz.setId(id);

        //salvar no bd
        service.save(voz);

        return ResponseEntity.ok(voz);
    }
}
