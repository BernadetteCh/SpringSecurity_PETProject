package com.example.securityjwt.logic;

import com.example.securityjwt.data.User;
import com.example.securityjwt.data.UserRepository;
import com.example.securityjwt.endpoint.dto.RegistrationDTO;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class RegisterService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public RegisterService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public void register(RegistrationDTO registrationDTO) {
        String encodedPassword = passwordEncoder.encode(registrationDTO.password());
        User user = new User();
        user.setFirstName(registrationDTO.firstName());
        user.setEmail(registrationDTO.email());
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

}
