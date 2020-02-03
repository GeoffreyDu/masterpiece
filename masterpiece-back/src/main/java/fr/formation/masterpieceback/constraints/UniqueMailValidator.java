package fr.formation.masterpieceback.constraints;

import fr.formation.masterpieceback.repositories.UserRepository;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueMailValidator implements ConstraintValidator<UniqueMail, String> {
    private UserRepository userRepository;

    public UniqueMailValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void initialize(UniqueMail constraint) {
    }

    public boolean isValid(String mail, ConstraintValidatorContext context) {
        return mail != null && !userRepository.findByMail(mail).isPresent();
    }
}
