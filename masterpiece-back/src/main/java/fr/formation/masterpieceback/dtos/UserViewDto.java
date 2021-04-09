package fr.formation.masterpieceback.dtos;
// DTO for check if user exists
public interface UserViewDto {
    Long getId();
    String getMail();
    String getUsername();
    String getPassword();
}
