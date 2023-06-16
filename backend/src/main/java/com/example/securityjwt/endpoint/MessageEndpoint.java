package com.example.securityjwt.endpoint;


import com.example.securityjwt.data.User;
import com.example.securityjwt.security.UserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/messages")
public class MessageEndpoint {

    @GetMapping("/unauthorized")
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public String unauthorized() {
        return "This message will never be displayed due to unauthorization";
    }

    @GetMapping("/authorized")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String authorized() {
        return "You are authorized to be here";
    }

    @GetMapping("/authorized/customized")
    @ResponseStatus(HttpStatus.ACCEPTED)
    String customized(Authentication authentication) {
        return "Hello, nice to have you here";
    }

}
