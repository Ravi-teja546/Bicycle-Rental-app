package com.bicyclebooking.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BicycleRepository extends CrudRepository<Bicycle, String> {
	
    Bicycle findByRegistrationNo(String registrationNo);

    List<Bicycle> findByBrandAndLocationId(String bicycleBrand, Long locationId);

	List<Bicycle> findByDealerId(String dealerId);

	void deleteByRegistrationNo(String registrationNo);
}
