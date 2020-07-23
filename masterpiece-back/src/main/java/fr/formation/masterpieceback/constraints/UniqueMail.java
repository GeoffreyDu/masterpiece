package fr.formation.masterpieceback.constraints;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueMailValidator.class)
public @interface UniqueMail {
    String message() default "Un compte ayant ce mail existe déjà";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}