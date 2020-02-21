package fr.formation.masterpieceback.services;

import fr.formation.masterpieceback.dtos.UserDto;
import fr.formation.masterpieceback.entities.Role;
import fr.formation.masterpieceback.entities.User;
import fr.formation.masterpieceback.repositories.RoleRepository;
import fr.formation.masterpieceback.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepo;
    private final RoleRepository roleRepo;

    public UserServiceImpl(UserRepository userRepo, RoleRepository roleRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
    }

    private void populateAndSave(UserDto dto, User user) {
        // Convert dto to entity:
        user.setMail(dto.getMail());
        user.setPassword(dto.getPassword());

        Role defaultRole = roleRepo.findByDefaultRole(true);
        Set<Role> roles = new HashSet();
        roles.add(defaultRole);
        user.setRoles(roles);

        userRepo.save(user); // Save to database
    }

    @Override
    public void create(UserDto dto){
        User user = new User();
        populateAndSave(dto, user);
    }

}
