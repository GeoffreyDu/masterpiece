package fr.formation.masterpieceback.configuration;

import fr.formation.masterpieceback.errors.ValidationError;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class ControllerAdvice extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers,
            HttpStatus status, WebRequest request) {
        // Validation errors wrapped in a BindingResult from
        // MethodArgumentNotValidException (ex):
        BindingResult result = ex.getBindingResult();
        // Spring field errors:
        List<FieldError> fieldErrors = result.getFieldErrors();
        // Custom field errors:
        List<ValidationError> validationErrors = new ArrayList<>();
        for (FieldError fieldError : fieldErrors) {
            String attribute = fieldError.getField();
            String code = fieldError.getCode();
            ValidationError validationError = new ValidationError(attribute, code);
            validationErrors.add(validationError);
        }

        List<ObjectError> globalErrors = ex.getBindingResult().getGlobalErrors();
        for (ObjectError globalError : globalErrors) {
            String code = globalError.getCode();
            ValidationError validationError = new ValidationError(code);
            validationErrors.add(validationError);
        }

        return handleExceptionInternal(ex, validationErrors, headers, status,
                request);
    }

}
