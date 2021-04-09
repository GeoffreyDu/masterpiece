package fr.formation.masterpieceback.repositories;

import fr.formation.masterpieceback.dtos.UserUsernameViewDto;
import fr.formation.masterpieceback.dtos.UserViewDto;
import fr.formation.masterpieceback.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
// Repository to communicate with the database
public interface UserRepository extends JpaRepository<User, Long> {
    // Derived query methods
    UserUsernameViewDto getById(Long id);
    boolean existsByMail(String mail);
    Optional<UserViewDto> findByMail(String mail);
}
