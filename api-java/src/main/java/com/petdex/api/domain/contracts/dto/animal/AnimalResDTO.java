package com.petdex.api.domain.contracts.dto.animal;
import java.util.Date;

public class AnimalResDTO {
    private String id;
    private String nome;
    private Date dataNascimento;
    private String sexo;
    private Float peso;
    private Boolean castrado;
    private String usuarioId;
    private String racaNome;
    private String especieNome;

    public AnimalResDTO() {
    }

    public AnimalResDTO(String nome, Date dataNascimento, String sexo, Float peso, Boolean castrado, String usuarioId, String racaNome, String especieNome) {
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.sexo = sexo;
        this.peso = peso;
        this.castrado = castrado;
        this.usuarioId = usuarioId;
        this.racaNome = racaNome;
    }

    public AnimalResDTO(String id, String nome, Date dataNascimento, String sexo, Float peso, Boolean castrado, String usuarioId, String racaNome, String especieNome) {
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.sexo = sexo;
        this.peso = peso;
        this.castrado = castrado;
        this.usuarioId = usuarioId;
        this.racaNome = racaNome;
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

    public Date getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public Float getPeso() {
        return peso;
    }

    public void setPeso(Float peso) {
        this.peso = peso;
    }

    public Boolean getCastrado() {
        return castrado;
    }

    public void setCastrado(Boolean castrado) {
        this.castrado = castrado;
    }

    public String getUsuarioId() {
        return usuarioId;
    }

    public String getEspecieNome() {
        return especieNome;
    }

    public void setEspecieNome(String especieNome) {
        this.especieNome = especieNome;
    }

    public void setUsuarioId(String usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getRacaNome() {
        return racaNome;
    }

    public void setRacaNome(String string) {
        this.racaNome = string;
    }
}
