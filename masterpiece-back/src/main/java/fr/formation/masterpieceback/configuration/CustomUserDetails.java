package fr.formation.masterpieceback.configuration;

import fr.formation.masterpieceback.dtos.UserViewDto;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class CustomUserDetails extends User {

    private static final long serialVersionUID = 5803283930339051994L;

    private Long id;

    public CustomUserDetails(UserViewDto user) {
        super(user.getMail(), user.getPassword(), new HashSet<GrantedAuthority>());
        id = user.getId();
    }

    public Long getId() {
        return id;
    }

    @Override
    public String toString() {
        return "{id=" + id + ", authorities=" + getAuthorities()
                + ", password=[PROTECTED], username=" + getUsername()
                + ", enabled=" + isEnabled() + ", accountNonExpired="
                + isAccountNonExpired() + ", accountNonLocked="
                + isAccountNonLocked() + ", credentialsNonExpired="
                + isCredentialsNonExpired() + "}";
    }
}
