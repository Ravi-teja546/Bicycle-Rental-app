package com.bicyclebooking.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bicyclebooking.model.LoginDto;
import com.bicyclebooking.model.LoginResponse;
import com.bicyclebooking.service.LoginService;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<LoginResponse> registerUser(@RequestBody LoginDto dto) {
    	
        return new ResponseEntity<LoginResponse>(loginService.checkLogin(dto), HttpStatus.OK);
    }
}
