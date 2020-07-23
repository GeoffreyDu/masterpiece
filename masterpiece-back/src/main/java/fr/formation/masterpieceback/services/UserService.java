package fr.formation.masterpieceback.services;

import fr.formation.masterpieceback.dtos.UserDto;
import fr.formation.masterpieceback.entities.User;

public interface UserService {
    void create(UserDto dto);
    boolean uniqueMail(String mail);
}
