package com.petdex.api.domain.collections;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "coleiras")
public class Coleira {
    @Id
    private String id;
    @NotBlank(message = "Descrição não pode ser nulo ou vazio")
    private String descricao;
    @NotBlank(message = "animalId não pode ser nulo ou vazio")
    private String animalId;

    public Coleira() {
    }

    public Coleira(String descricao, String animalId) {
        this.descricao = descricao;
        this.animalId = animalId;
    }

    public Coleira(String id, String descricao, String animalId) {
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
