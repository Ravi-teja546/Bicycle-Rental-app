package com.bicyclebooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bicyclebooking.model.LoginDto;
import com.bicyclebooking.model.LoginResponse;
import com.bicyclebooking.repo.Register;
import com.bicyclebooking.repo.RegisterRepository;

@Service
public class LoginService {

    @Autowired
    private RegisterRepository registerRepository;

    public LoginResponse checkLogin(LoginDto dto) {
        Register register = registerRepository.findByUsername(dto.getUsername());
        return new LoginResponse(register.getUsername(), register.getUserType());
        
    }
}
