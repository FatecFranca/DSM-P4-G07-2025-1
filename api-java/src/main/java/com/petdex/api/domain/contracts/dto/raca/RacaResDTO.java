package com.petdex.api.domain.contracts.dto.raca;

public class RacaResDTO {

    private String id;
    private String nome;
    private String especieId;

    public RacaResDTO() {
    }

    public RacaResDTO(String nome, String especieId) {
        this.nome = nome;
        this.especieId = especieId;
    }

    public RacaResDTO(String id, String nome, String especieId) {
        this.especieId = especieId;
        this.nome = nome;
        this.id = id;
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

    public void setEspecieId(String especieID) {
        this.especieId = especieID;
    }
}
