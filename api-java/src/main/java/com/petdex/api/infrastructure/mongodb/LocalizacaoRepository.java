package com.petdex.api.infrastructure.mongodb;

import com.petdex.api.domain.collections.Localizacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LocalizacaoRepository extends MongoRepository<Localizacao, String> {
    Page<Localizacao> findAllByAnimalId(String animalId, Pageable pageable);
    Page<Localizacao> findAllByColeiraId(String coleiraId, Pageable pageable);
}
