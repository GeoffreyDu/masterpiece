package fr.formation.masterpieceback.services;

import fr.formation.masterpieceback.dtos.UserDto;
import fr.formation.masterpieceback.entities.User;
import fr.formation.masterpieceback.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepo;

    public UserServiceImpl(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    private void populateAndSave(UserDto dto, User user) {
        // Convert dto to entity:
        user.setMail(dto.getMail());
        user.setPassword(dto.getPassword());
        userRepo.save(user); // Save to database
    }

    @Override
    public User getOne(Long id) {
        return userRepo.getById(id);
    }

    @Override
    public void create(UserDto dto){
        User user = new User();
        populateAndSave(dto, user);
    }

    @Override
    public void update(Long id, UserDto dto) {
        User user = userRepo.findById(id).get();
        populateAndSave(dto, user);
    }

    @Override
    public void delete(Long id) {
        userRepo.deleteById(id);
    }


}
