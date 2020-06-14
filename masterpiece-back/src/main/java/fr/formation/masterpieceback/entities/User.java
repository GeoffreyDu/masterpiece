package fr.formation.masterpieceback.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(name = "users_mail_UQ", columnNames = {"mail"})
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String mail;

    @Column(nullable = false)
    private String password;

    @ManyToMany
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", nullable = false),
            foreignKey = @ForeignKey(name = "users_roles_user_id_FK"),
            inverseJoinColumns = @JoinColumn(name = "role_id", nullable = false),
            inverseForeignKey = @ForeignKey(name = "users_roles_role_id_FK"),
            indexes = {
                @Index(name = "users_roles_user_id_IDX", columnList = "user_id"),
                @Index(name = "users_roles_role_id_IDX", columnList = "role_id")
            }
    )
    private Set<Role> roles;

    @Column(nullable = false)
    private boolean enabled = true;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
