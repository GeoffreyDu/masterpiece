package fr.formation.masterpieceback.entities;

import fr.formation.masterpieceback.enums.EnumRole;

import javax.persistence.*;

@Entity
@Table(name = "roles", uniqueConstraints = {
        @UniqueConstraint(name = "roles_code_UQ", columnNames = {"code"})
})
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "ENUM('ROLE_USER', 'ROLE_ADMIN')")
    private Enum<EnumRole> code;

    @Column(nullable = false)
    private boolean defaultRole;

    public Role() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Enum<EnumRole> getCode() {
        return code;
    }

    public void setCode(Enum<EnumRole> code) {
        this.code = code;
    }

    public boolean isDefaultRole() {
        return defaultRole;
    }

    public void setDefaultRole(boolean defaultRole) {
        this.defaultRole = defaultRole;
    }
}
