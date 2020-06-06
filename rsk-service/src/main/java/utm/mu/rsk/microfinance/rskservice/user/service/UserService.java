package utm.mu.rsk.microfinance.rskservice.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utm.mu.rsk.microfinance.rskservice.user.model.User;
import utm.mu.rsk.microfinance.rskservice.user.repository.UserRepository;

import javax.mail.MessagingException;
import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository dao;

//    @Autowired
//    MailService mailService;

    static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    static SecureRandom rnd = new SecureRandom();

    private String randomString(int len){
        StringBuilder sb = new StringBuilder( len );
        for( int i = 0; i < len; i++ )
            sb.append( AB.charAt( rnd.nextInt(AB.length()) ) );
        return sb.toString();
    }

    public List<User> retrieveAllUsers(){
        return this.dao.findAll();
    }

    public User addUser(User user) throws MessagingException {

        user.setToken(randomString(25));
        user.setRoles("ROLE_USER");

//        mailService.sendMail(user.getEmail(), "test mail","<a href=\"http://localhost:4200/verification/"+ user.getToken() +"\">Click to verify your account</a>");

        return this.dao.save(user);
    }

    public Optional<User> findByUsername(String username) {
        Optional<User> user = dao.findByUserName(username);
        return user;
    }

}
