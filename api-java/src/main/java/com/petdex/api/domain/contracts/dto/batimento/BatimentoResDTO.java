package com.petdex.api.domain.contracts.dto.batimento;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Date;

@Schema(name = "Resposta Batimento", description = "Informações contidas nas respostas da API envolvendo os batimentos cardíacos")
public class BatimentoResDTO {

    @Schema(description = "Código único identificador do batimento cardíaco", example = "", requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @Schema(description = "Data/Hora que foi coletado o batimento cardíaco", example = "", requiredMode = Schema.RequiredMode.REQUIRED)
    private Date data;

    @Schema(description = "Frequência média que foi coletada do animal", example = "60", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer frequenciaMedia;

    @Schema(description = "ID do Animal que foi coletado o batimento cardíaco", example = "60", requiredMode = Schema.RequiredMode.REQUIRED)
    private String animalId;

    @Schema(description = "ID da coleira que fez a coleta do batimento cardíaco", example = "60", requiredMode = Schema.RequiredMode.REQUIRED)
    private String coleiraId;

    public BatimentoResDTO() {
    }

    public BatimentoResDTO(String id, Date data, Integer frequenciaMedia, String animalId, String coleiraId) {
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

    public String getColeiraId() {
        return coleiraId;
    }

    public void setColeiraId(String coleiraId) {
        this.coleiraId = coleiraId;
    }

    public String getAnimalId() {
        return animalId;
    }

    public void setAnimalId(String animalId) {
        this.animalId = animalId;
    }

    public Integer getFrequenciaMedia() {
        return frequenciaMedia;
    }

    public void setFrequenciaMedia(Integer frequenciaMedia) {
        this.frequenciaMedia = frequenciaMedia;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }
}
