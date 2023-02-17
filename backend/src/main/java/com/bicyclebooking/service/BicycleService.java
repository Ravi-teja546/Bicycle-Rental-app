package com.bicyclebooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bicyclebooking.model.BicycleDto;
import com.bicyclebooking.repo.Bicycle;
import com.bicyclebooking.repo.BicycleRepository;

@Component
public class BicycleService {

    @Autowired
    private BicycleRepository bicycleRepository;

    public Bicycle addBicycle(BicycleDto bicycleDto){
        return bicycleRepository.save(getBicycle(bicycleDto));

    }


    private Bicycle getBicycle(BicycleDto bicycleDto) {

        Bicycle bicycle = new Bicycle();
        bicycle.setAvailability(bicycleDto.isAvailability());
        bicycle.setBrand(bicycleDto.getBrand());
        bicycle.setDealerId(bicycleDto.getDealerId());
        bicycle.setModel(bicycleDto.getModel());
        bicycle.setPrice(bicycleDto.getPrice());
        bicycle.setRegistrationNo(bicycleDto.getRegistrationNo());
        bicycle.setLocationId(bicycleDto.getLocationId());
        
        return bicycle;
    }
    
    private Bicycle getBicycleWithId(BicycleDto bicycleDto) {

        Bicycle bicycle = new Bicycle();
        bicycle.setAvailability(bicycleDto.isAvailability());
        bicycle.setBrand(bicycleDto.getBrand());
        bicycle.setDealerId(bicycleDto.getDealerId());
        bicycle.setModel(bicycleDto.getModel());
        bicycle.setPrice(bicycleDto.getPrice());
        bicycle.setRegistrationNo(bicycleDto.getRegistrationNo());
        bicycle.setLocationId(bicycleDto.getLocationId());
       
        return bicycle;
    }

   

    public Bicycle getBicycle(String registrationNo) {
        return bicycleRepository.findByRegistrationNo(registrationNo);
    }

    public List<Bicycle> getAllBicycle() {
        return (List<Bicycle>) bicycleRepository.findAll();
    }


	public List<Bicycle> getAllBicycleByDealerId(String dealerId) {
		return bicycleRepository.findByDealerId(dealerId);
	}


	public void updateBicycle(BicycleDto bicycleDto) {
		bicycleRepository.save(getBicycle(bicycleDto));
	}


	public void deleteBicycle(String registrationNo) {
		bicycleRepository.deleteById(registrationNo);
	}
}
