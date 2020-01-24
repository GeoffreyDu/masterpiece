package fr.formation.masterpieceback.services;

import fr.formation.masterpieceback.dtos.UserDto;
import fr.formation.masterpieceback.entities.User;

public interface UserService {
    User getOne(Long id);
    void create(UserDto dto);
    void update(Long id, UserDto dto);
    void delete(Long id);
}
