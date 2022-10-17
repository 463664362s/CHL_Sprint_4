package com.example.tein8.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tein8.model.Voz;
import com.example.tein8.repository.VozRepository;

@Service
public class VozService {
    
    @Autowired
    VozRepository repository;

    public List<Voz> listAll(){
       return repository.findAll();
    }

    public void save(Voz voz) {
        repository.save(voz);
    }

    public Optional<Voz> getById(Long id){
        return repository.findById(id);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}