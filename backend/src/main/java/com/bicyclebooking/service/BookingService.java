package com.bicyclebooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bicyclebooking.model.BookingDto;
import com.bicyclebooking.repo.Booking;
import com.bicyclebooking.repo.BookingRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public void confirmBooking(BookingDto bookingDto) {
        Booking booking = getBooking(bookingDto);
        bookingRepository.save(booking);
    }
    
    public List<Booking> getCustomerBooking(String custId) {
    	return bookingRepository.findAllByCustomerId(custId);
    }

    public List<Booking> getDealerBooking(String dealerId) {
    	
    	return bookingRepository.findAllByDealerId(dealerId);
    }

    public Booking getBooking(BookingDto bookingDto){
        Booking booking = new Booking();
        booking.setBicycleId(bookingDto.getBicycleId());
        booking.setCustomerId(bookingDto.getCustomerId());
        booking.setDealerId(bookingDto.getDealerId());
        booking.setStartDate(bookingDto.getStartDate());
        booking.setEndDate(bookingDto.getEndDate());

        return booking;
    }
}
