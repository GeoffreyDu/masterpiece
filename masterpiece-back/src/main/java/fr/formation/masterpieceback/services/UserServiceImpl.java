package fr.formation.masterpieceback.services;

import fr.formation.masterpieceback.configuration.CustomUserDetails;
import fr.formation.masterpieceback.dtos.UserDto;
import fr.formation.masterpieceback.dtos.UserUsernameViewDto;
import fr.formation.masterpieceback.dtos.UserViewDto;
import fr.formation.masterpieceback.entities.User;
import fr.formation.masterpieceback.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static fr.formation.masterpieceback.configuration.SecurityHelper.getUserId;


@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepo;
    private final ModelMapper mapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepo, ModelMapper mapper, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
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

    @Override
    public UserDetails loadUserByUsername(String mail)
            throws UsernameNotFoundException {
        UserViewDto user = userRepo.findByMail(mail)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "no user found with mail: " + mail));
        return new CustomUserDetails(user);
    }

    @Override
    public UserUsernameViewDto getUsername(){
        Long userId = getUserId();
        return userRepo.getById(userId);
    }

}
