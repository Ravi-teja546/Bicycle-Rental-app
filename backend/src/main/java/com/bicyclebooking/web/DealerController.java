package com.bicyclebooking.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bicyclebooking.model.DealerDto;
import com.bicyclebooking.repo.Dealer;
import com.bicyclebooking.service.DealerService;

@RestController
@RequestMapping("/dealer")
public class DealerController {

    @Autowired
    private DealerService dealerService;

    @GetMapping(value = "/{dealerId}")
    public Dealer getDealer(@PathVariable String dealerId){
        return dealerService.getDealer(dealerId);
    }
    
    @PutMapping
    public void updateDealer(@RequestBody DealerDto dealerDto) {
    	dealerService.updateDealer(dealerDto);
    }
}
