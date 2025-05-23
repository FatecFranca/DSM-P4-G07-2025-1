package com.petdex.api.domain.collections;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "localizacoes")
public class Localizacao {
    @Id
    private String id;

    @NotBlank(message = "Data não pode ser nulo ou vazio")
    private Date data;

    @NotBlank(message = "Latitude não pode ser nulo ou vazio")
    private Double latitude;

    @NotBlank(message = "Longitude não pode ser nulo ou vazio")
    private Double longitude;

    @NotBlank(message = "animalId não pode ser nulo ou vazio")
    private String animalId;

    @NotBlank(message = "coleiraId não pode ser nulo ou vazio")
    private String coleiraId;

    public Localizacao() {
    }

    public Localizacao(Date data, Double latitude, Double longitude, String animalId, String coleiraId) {
        this.data = data;
        this.latitude = latitude;
        this.longitude = longitude;
        this.animalId = animalId;
        this.coleiraId = coleiraId;
    }

    public Localizacao(String id, Date data, Double latitude, Double longitude, String animalId, String coleiraId) {
        this.id = id;
        this.data = data;
        this.latitude = latitude;
        this.longitude = longitude;
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

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
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
