package fr.formation.masterpieceback.services;

import fr.formation.masterpieceback.dtos.UserDto;
import fr.formation.masterpieceback.entities.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    void create(UserDto dto);
    boolean uniqueMail(String mail);
    UserDetails loadUserByUsername(String mail);
}
