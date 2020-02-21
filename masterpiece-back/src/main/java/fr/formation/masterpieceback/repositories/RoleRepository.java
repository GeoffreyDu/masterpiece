package fr.formation.masterpieceback.repositories;

import fr.formation.masterpieceback.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByDefaultRole(boolean defaultRole);
}
