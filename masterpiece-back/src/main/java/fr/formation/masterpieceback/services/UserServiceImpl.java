package fr.formation.masterpieceback.services;

import fr.formation.masterpieceback.dtos.UserDto;
import fr.formation.masterpieceback.entities.Role;
import fr.formation.masterpieceback.entities.User;
import fr.formation.masterpieceback.repositories.RoleRepository;
import fr.formation.masterpieceback.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final ModelMapper mapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepo, RoleRepository roleRepo, ModelMapper mapper, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
    }

    /*private void populateAndSave(UserDto dto, User user) {
        // Convert dto to entity:
        user.setMail(dto.getMail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        Role defaultRole = roleRepo.findByDefaultRole(true);
        Set<Role> roles = new HashSet();
        roles.add(defaultRole);
        user.setRoles(roles);

        userRepo.save(user); // Save to database
    }*/

    @Override
    public void create(UserDto dto){
        /*User user = new User();
        populateAndSave(dto, user);*/
        User user = mapper.map(dto, User.class);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        userRepo.save(user); // Save to database
    }

    @Override
    public boolean uniqueMail(String mail) {
        return mail != null && !userRepo.existsByMail(mail);
    }

}
