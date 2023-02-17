package com.bicyclebooking.web;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bicyclebooking.model.BicycleDto;
import com.bicyclebooking.repo.Bicycle;
import com.bicyclebooking.service.BicycleService;

@RestController
@RequestMapping("/bicycle")
public class BicycleController {

	@Autowired
	private BicycleService bicycleService;

	@PostMapping
	public Bicycle addBicycle(@Valid @RequestBody BicycleDto bicycleDto) {
		return bicycleService.addBicycle(bicycleDto);
	}

	@GetMapping(value = "/registration/{registrationNo}")
	public Bicycle getBicycle(@PathVariable String registrationNo) {
		return bicycleService.getBicycle(registrationNo);
	}

	@GetMapping(value = "/dealer/{dealerId}")
	public List<Bicycle> getAllBicycleByDealerId(@PathVariable String dealerId) {
		return bicycleService.getAllBicycleByDealerId(dealerId);
	}

	@GetMapping
	public List<Bicycle> getAllBicycle() {
		return bicycleService.getAllBicycle();
	}

	@PutMapping
	public void updateBicycle(@RequestBody BicycleDto bicycleDto) {
		bicycleService.updateBicycle(bicycleDto);
	}

	@DeleteMapping(value = "/{registrationNo}")
	public void updateBicycle(@PathVariable String registrationNo) {
		bicycleService.deleteBicycle(registrationNo);
	}
}
