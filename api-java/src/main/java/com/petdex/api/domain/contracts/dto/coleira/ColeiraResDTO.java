package com.petdex.api.domain.contracts.dto.coleira;

public class ColeiraResDTO {
    private String id;
    private String descricao;
    private String animalId;


    public ColeiraResDTO() {
    }

    public ColeiraResDTO(String descricao, String animalId) {
        this.descricao = descricao;
        this.animalId = animalId;
    }

    public ColeiraResDTO(String id, String descricao, String animalId) {
        this.id = id;
        this.descricao = descricao;
        this.animalId = animalId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getAnimalId() {
        return animalId;
    }

    public void setAnimalId(String animalId) {
        this.animalId = animalId;
    }
}
