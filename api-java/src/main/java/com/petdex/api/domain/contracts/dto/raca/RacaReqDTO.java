package com.petdex.api.domain.contracts.dto.raca;

public class RacaReqDTO {

    private String nome;
    private String especieId;

    public RacaReqDTO() {
    }

    public RacaReqDTO(String nome, String especieId) {
        this.nome = nome;
        this.especieId = especieId;
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
