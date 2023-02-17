package com.bicyclebooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bicyclebooking.model.CustomerDto;
import com.bicyclebooking.repo.Customer;
import com.bicyclebooking.repo.CustomerRepository;

@Service
public class CustomerService {
	
	@Autowired
	private CustomerRepository customerRepository;

	public Customer getCustomer(String customerId) {
		return customerRepository.findByCustomerId(customerId);
	}

	public void updateCustomer(CustomerDto customerDto) {
		Customer customer = getCustomer(customerDto);
		customerRepository.save(customer);
	}

	private Customer getCustomer(CustomerDto customerDto) {
		Customer customer = new Customer();
		customer.setContactNo(customerDto.getContactNo());
		customer.setCustomerId(customerDto.getCustomerId());
		customer.setEmailAddress(customerDto.getEmailAddress());
		customer.setName(customerDto.getName());
		
		return customer;
	}

	
}
