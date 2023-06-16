package com.example.securityjwt.endpoint;
import com.example.securityjwt.endpoint.dto.RegistrationDTO;
import com.example.securityjwt.logic.RegisterService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("register")
public class RegisterEndpoint {
    private final RegisterService registerService;

    public RegisterEndpoint(RegisterService registerService) {
        this.registerService = registerService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegistrationDTO registration) {
        System.out.println(registration.firstName());
        registerService.register(registration);
    }
}
