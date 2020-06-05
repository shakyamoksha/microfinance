package utm.mu.rsk.microfinance.rskservice.user.model;


import javax.persistence.*;

@Entity
@Table(name = "USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USERS_SEQ")
    @SequenceGenerator(sequenceName = "USERS_SEQ", allocationSize = 1, name = "USERS_SEQ")
    private int id;

    @Column(name = "USERNAME")
    private  String userName;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "ROLES")
    private String roles;

    @Column(name = "ACTIVE")
    private boolean active;

    @Column(name = "TOKEN")
    private String token;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
