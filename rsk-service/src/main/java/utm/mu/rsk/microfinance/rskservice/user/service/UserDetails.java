package utm.mu.rsk.microfinance.rskservice.user.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import utm.mu.rsk.microfinance.rskservice.user.model.UserModel;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserDetails implements org.springframework.security.core.userdetails.UserDetails {

    private String userName;
    private String password;
    private boolean active;
    private List<GrantedAuthority> authorities;

    public UserDetails(UserModel userModel) {
        this.userName = userModel.getUserName();
        this.password = userModel.getPassword();
        this.active = userModel.isActive();
        this.authorities = Arrays.stream(userModel.getRoles().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}
