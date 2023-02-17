package com.bicyclebooking.web;

import com.bicyclebooking.model.SearchBicycleDto;
import com.bicyclebooking.repo.Bicycle;
import com.bicyclebooking.service.SearchBicycleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private SearchBicycleService searchBicycleService;

    @PostMapping
    public List<Bicycle> getSearchBicycle(@RequestBody SearchBicycleDto searchBicycleDto){
        return searchBicycleService.getSearchedBicycles(searchBicycleDto);
    }
}
