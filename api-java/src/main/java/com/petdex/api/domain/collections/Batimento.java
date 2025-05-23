package com.petdex.api.domain.collections;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "batimentos")
public class Batimento {
    @Id
    private String id;

    @NotBlank(message = "Data não pode ser nulo ou vazio")
    private Date data;

    @PositiveOrZero(message = "Frequência deve ser um número positivo")
    @NotBlank(message = "Frequência Média não pode ser nulo ou vazio")
    private Integer frequenciaMedia;

    @NotBlank(message = "animalId não pode ser nulo ou vazio")
    private String animalId;

    @NotBlank(message = "coleiraId não pode ser nulo ou vazio")
    private String coleiraId;

    public Batimento() {
    }

    public Batimento(Date data, Integer frequenciaMedia, String animalId, String coleiraId) {
        this.data = data;
        this.frequenciaMedia = frequenciaMedia;
        this.animalId = animalId;
        this.coleiraId = coleiraId;
    }

    public Batimento(String id, Date data, Integer frequenciaMedia, String animalId, String coleiraId) {
        this.id = id;
        this.data = data;
        this.frequenciaMedia = frequenciaMedia;
        this.animalId = animalId;
        this.coleiraId = coleiraId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public Integer getFrequenciaMedia() {
        return frequenciaMedia;
    }

    public void setFrequenciaMedia(Integer frequenciaMedia) {
        this.frequenciaMedia = frequenciaMedia;
    }

    public String getAnimalId() {
        return animalId;
    }

    public void setAnimalId(String animalId) {
        this.animalId = animalId;
    }

    public String getColeiraId() {
        return coleiraId;
    }

    public void setColeiraId(String coleiraId) {
        this.coleiraId = coleiraId;
    }
}
