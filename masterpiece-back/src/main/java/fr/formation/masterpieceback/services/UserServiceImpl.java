package fr.formation.masterpieceback.services;

import fr.formation.masterpieceback.configuration.CustomUserDetails;
import fr.formation.masterpieceback.dtos.UserDto;
import fr.formation.masterpieceback.dtos.UserUsernameViewDto;
import fr.formation.masterpieceback.dtos.UserViewDto;
import fr.formation.masterpieceback.entities.User;
import fr.formation.masterpieceback.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static fr.formation.masterpieceback.configuration.SecurityHelper.getUserId;


@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void create(UserDto dto){
        // Create object User
        User user = new User();
        // Convert Dto to entities
        // Set each attribute
        user.setUsername(dto.getUsername());
        user.setMail(dto.getMail());
        // Encode the user's password
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        // Call the repository to save the event in the database
        userRepo.save(user);
    }

    // Call repository to check if mail exists in database
    @Override
    public boolean uniqueMail(String mail) {
        return mail != null && !userRepo.existsByMail(mail);
    }

    // Call repository to retrieve and return user informations
    @Override
    public UserDetails loadUserByUsername(String mail){
        UserViewDto user = userRepo.findByMail(mail).get();
        return new CustomUserDetails(user);
    }
    // Call repository to retrieve user's username
    @Override
    public UserUsernameViewDto getUsername(){
        Long userId = getUserId();
        return userRepo.getById(userId);
    }

}
