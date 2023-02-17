package com.bicyclebooking.model;

import javax.validation.constraints.NotEmpty;

public class SearchBicycleDto {

    @NotEmpty(message = "bicycle brand can not be null")
    private String bicycleBrand;

    @NotEmpty(message = "location id can not be null")
    private Long locationId;

    public String getBicycleBrand() {
        return bicycleBrand;
    }

    public void setBicycleBrand(String bicycleBrand) {
        this.bicycleBrand = bicycleBrand;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

}
