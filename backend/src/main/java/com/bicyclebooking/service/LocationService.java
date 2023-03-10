package com.bicyclebooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bicyclebooking.repo.Location;
import com.bicyclebooking.repo.LocationRepository;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;


    public List<Location> getAllLocations() {
        return (List<Location>) locationRepository.findAll();
    }

    public List<Location> getLocationsByDealerId(String dealerId) {
        return locationRepository.findAllByDealerId(dealerId);
    }
}
