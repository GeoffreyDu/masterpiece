package fr.formation.masterpieceback.dtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class UserDto {
    @Email
    @NotEmpty
    @Size(max=255)
    private String mail;

    @NotEmpty
    @Size(max=12)
    private String password;

    public UserDto() {
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
