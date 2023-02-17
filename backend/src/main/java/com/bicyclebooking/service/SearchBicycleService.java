package com.bicyclebooking.service;

import com.bicyclebooking.model.SearchBicycleDto;
import com.bicyclebooking.repo.Bicycle;
import com.bicyclebooking.repo.BicycleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchBicycleService {

    @Autowired
    private BicycleRepository bicycleRepository;

    public List<Bicycle> getSearchedBicycles(SearchBicycleDto searchBicycleDto) {
        return bicycleRepository.findByBrandAndLocationId(searchBicycleDto.getBicycleBrand(), searchBicycleDto.getLocationId());
    }
}
