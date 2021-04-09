package fr.formation.masterpieceback.constraints;

import fr.formation.masterpieceback.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueMailValidator implements ConstraintValidator<UniqueMail, String> {

    @Autowired
    private UserService service;

    public void initialize(UniqueMail constraint) {
    }
    // Call the service
    public boolean isValid(String mail, ConstraintValidatorContext context) {
        return service.uniqueMail(mail);
    }
}
