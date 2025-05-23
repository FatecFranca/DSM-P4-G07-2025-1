package com.petdex.api.domain.collections;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "racas")
public class Raca {

    @Id
    private String id;
    private String nome;
    private String especieId;

    public Raca() {
    }

    public Raca(String nome, String especieId) {
        this.nome = nome;
        this.especieId = especieId;
    }

    public Raca(String id, String nome, String especieId) {
        this.id = id;
        this.nome = nome;
        this.especieId = especieId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEspecieId() {
        return especieId;
    }

    public void setEspecieId(String especieId) {
        this.especieId = especieId;
    }
}
