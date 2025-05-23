package com.petdex.api.infrastructure.mongodb;

import com.petdex.api.domain.collections.Movimento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MovimentoRepository extends MongoRepository<Movimento, String> {
    Page<Movimento> findAllByAnimalId(String animalId, Pageable pageable);
    Page<Movimento> findAllByColeiraId(String coleiraId, Pageable pageable);
}
