package fr.formation.masterpieceback.dtos;

import fr.formation.masterpieceback.entities.Role;

import java.util.Set;

public interface UserViewDto {
    Long getId();
    String getMail();
    String getUsername();
    String getPassword();
    Set<Role> getRoles();
}
