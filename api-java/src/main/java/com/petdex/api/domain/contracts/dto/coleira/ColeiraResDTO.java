package com.petdex.api.domain.contracts.dto.coleira;

public class ColeiraResDTO {
    private String codigo;
    private String descricao;
    private String animal;


    public ColeiraResDTO() {
    }

    public ColeiraResDTO(String descricao, String animal) {
        this.descricao = descricao;
        this.animal = animal;
    }

    public ColeiraResDTO(String codigo, String descricao, String animal) {
        this.codigo = codigo;
        this.descricao = descricao;
        this.animal = animal;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getAnimal() {
        return animal;
    }

    public void setAnimal(String animal) {
        this.animal = animal;
    }
}
