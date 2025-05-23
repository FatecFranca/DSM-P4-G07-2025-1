package com.petdex.api.application.services.animal;

import com.petdex.api.domain.collections.Animal;
import com.petdex.api.domain.contracts.dto.PageDTO;
import com.petdex.api.domain.contracts.dto.animal.AnimalReqDTO;
import com.petdex.api.domain.contracts.dto.animal.AnimalResDTO;
import com.petdex.api.infrastructure.mongodb.AnimalRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalService implements IAnimalService{

    @Autowired
    ModelMapper mapper;

    @Autowired
    AnimalRepository animalRepository;

    @Override
    public AnimalResDTO findById(String id) {
        return mapper.map(animalRepository.findById(id), AnimalResDTO.class);
    }

    @Override
    public Page<AnimalResDTO> findAll(PageDTO pageDTO) {
        pageDTO.sortByName();
        Page<Animal> animaisPage = animalRepository.findAll(pageDTO.mapPage());
        List<AnimalResDTO> dtoList = animaisPage.getContent().stream()
                .map(a -> mapper.map(a, AnimalResDTO.class))
                .toList();

        return new PageImpl<AnimalResDTO>(dtoList, pageDTO.mapPage(), animaisPage.getTotalElements());
    }

    @Override
    public AnimalResDTO create(AnimalReqDTO animalReqDTO) {
        return mapper.map(animalRepository.save(mapper.map(animalReqDTO, Animal.class)), AnimalResDTO.class);
    }

    @Override
    public AnimalResDTO update(String id, AnimalReqDTO animalReqDTO) {

        Animal animalUpdate = animalRepository.findById(id).orElseThrow(() -> new RuntimeException("Não foi possível achar o animal com o ID: " + id));

        if(animalReqDTO.getNome() != null) animalUpdate.setNome(animalReqDTO.getNome());
        if(animalReqDTO.getCastrado() != null) animalUpdate.setCastrado(animalReqDTO.getCastrado());
        if(animalReqDTO.getPeso() != null) animalUpdate.setPeso(animalReqDTO.getPeso());
        if(animalReqDTO.getRacaId() != null) animalUpdate.setRacaId(animalReqDTO.getRacaId());
        if(animalReqDTO.getDataNascimento() != null) animalUpdate.setDataNascimento(animalReqDTO.getDataNascimento());
        if(animalReqDTO.getSexo() != null) animalUpdate.setSexo(animalReqDTO.getSexo());

        return mapper.map(animalRepository.save(animalUpdate), AnimalResDTO.class);
    }

    @Override
    public void delete(String id) {
        animalRepository.deleteById(id);
    }
}
