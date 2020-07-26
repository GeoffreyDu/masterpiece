package fr.formation.masterpieceback.dtos;

import fr.formation.masterpieceback.constraints.UniqueMail;
import fr.formation.masterpieceback.constraints.ValidPassword;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UserDto {
    @Email
    @NotBlank
    @Size(max=255)
    @UniqueMail
    private String mail;

    @NotBlank
    @Size(min = 3, max = 100)
    private String username;

    @NotBlank
    @Size(min = 8, max = 20)
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

    public String getUsername() {return username;}

    public void setUsername(String username) {this.username = username;}

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
