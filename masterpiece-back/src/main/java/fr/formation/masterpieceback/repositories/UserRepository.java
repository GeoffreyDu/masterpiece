package fr.formation.masterpieceback.repositories;

import fr.formation.masterpieceback.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User getById(Long id);
}
