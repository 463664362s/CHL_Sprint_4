package com.example.tein8.dto;

public record VozDto (

     Long id,
     String voz

) {

     public VozDto(String voz){
          this(0l, voz);
     }

}