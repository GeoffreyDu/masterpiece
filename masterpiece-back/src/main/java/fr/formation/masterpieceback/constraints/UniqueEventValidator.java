package fr.formation.masterpieceback.constraints;

import fr.formation.masterpieceback.dtos.EventDto;
import fr.formation.masterpieceback.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueEventValidator implements ConstraintValidator<UniqueEvent, EventDto> {

    @Autowired
    private EventService service;

    public void initialize(UniqueEvent constraint){ }
    // Call service to check in db if event is unique
    public boolean isValid(EventDto dto, ConstraintValidatorContext context){
        return service.uniqueEvent(dto);
    }
}
