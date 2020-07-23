package fr.formation.masterpieceback.errors;


public class ValidationError {

    private final String attribute;

    private final String code;


    public ValidationError(String attribute, String code) {
        this.attribute = attribute;
        this.code = code;
    }

    public ValidationError(String code){
        this(null, code);
    }

    public String getAttribute() {
        return attribute;
    }

    public String getCode() {
        return code;
    }
}
