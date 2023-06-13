package com.example.securityjwt.runner;

import com.example.securityjwt.data.User;
import com.example.securityjwt.data.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class UserPopulator {
    @Bean
    ApplicationRunner populateUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String password = passwordEncoder.encode("1234");
            User user = new User(1, "Bernadette",password, Set.of("USER"));
            userRepository.save(user);
        };
    }
}