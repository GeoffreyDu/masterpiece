package fr.formation.masterpieceback.dtos;

import fr.formation.masterpieceback.constraints.UniqueMail;
import fr.formation.masterpieceback.constraints.ValidPassword;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UserDto {
    @Email
    @NotNull
    @Size(max=255)
    @UniqueMail
    private String mail;

    @NotNull
    @Size(min = 8)
    @ValidPassword
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
