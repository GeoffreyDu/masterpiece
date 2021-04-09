package fr.formation.masterpieceback.constraints;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

// Annotation for unique event
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy=UniqueEventValidator.class)
public @interface UniqueEvent {
    String message() default "Un événement semblable existe déjà";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
