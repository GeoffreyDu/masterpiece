package fr.formation.masterpieceback.controllers;

import fr.formation.masterpieceback.dtos.UserDto;
import fr.formation.masterpieceback.entities.User;
import fr.formation.masterpieceback.services.UserService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins="*", allowedHeaders = "*")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    protected void create(@Valid @RequestBody UserDto dto){
        userService.create(dto);
    }

    @GetMapping("/{id}")
    protected User getOne(@PathVariable("id") Long id) {
        return userService.getOne(id);
    }

    @PutMapping("/{id}")
    protected void update(@PathVariable("id") Long id, @Valid @RequestBody UserDto dto){
        userService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    protected void delete(@PathVariable("id") Long id) {
        userService.delete(id);
    }

}
