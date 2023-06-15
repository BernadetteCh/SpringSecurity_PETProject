package com.example.securityjwt.endpoint;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/messages")
public class MessageEndpoint {

    @GetMapping("/unauthorized")
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public String unauthorized() {
        return "Hi from endpoint unauthorized";
    }

    @GetMapping("/authorized")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String authorized() {
        return "You are authorized to be here";
    }

    @GetMapping("/authorized/customized")
    @ResponseStatus(HttpStatus.ACCEPTED)
    String customized(Authentication authentication) {
        return "Hello, " + authentication.getName();
    }

}
