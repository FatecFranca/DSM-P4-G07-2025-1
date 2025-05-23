package com.petdex.api.domain.contracts.dto.coleira;

public class ColeiraReqDTO {
    private String descricao;
    private String animalId;


    public ColeiraReqDTO() {
    }

    public ColeiraReqDTO(String descricao, String animalId) {
        this.descricao = descricao;
        this.animalId = animalId;
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
