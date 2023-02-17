package com.bicyclebooking.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealerRepository extends CrudRepository<Dealer, String> {
    Dealer findByDealerId(String dealerId);
}
