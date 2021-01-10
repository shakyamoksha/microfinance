package utm.mu.rsk.microfinance.rskservice.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import utm.mu.rsk.microfinance.rskservice.repository.common.entity.ResponseEntity;
import utm.mu.rsk.microfinance.rskservice.repository.common.notification.MailService;
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

    @Autowired
    MailService mailService;

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

        int strength = 10; // Work Factor of BCRYPT
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(strength, new SecureRandom());
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());

        user.setToken(randomString(25));
        user.setRoles("ROLE_USER");
        user.setActive(false);
        user.setPassword(encodedPassword);
        mailService.sendMail(user.getEmail(),
                "Verify Account - Microfinance",
                "Dear " + user.getFirstName() + " " + user.getLastName() + ", <br>" +
                        "<a href=\"http://localhost:4200/verification/"+ user.getToken() + "/"+ user.getUserName() +"\">Click to verify your account</a>");
        return this.dao.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return dao.findByUserName(username);
    }

    public ResponseEntity verfiyUser(User user) {
        ResponseEntity responseEntity = new ResponseEntity();
        User entity = new User();
        Optional<User> data = dao.findByUserNameAndTokenAndActiveFalse(user.getUserName(), user.getToken());
        Optional<User> alreadyActive = dao.findByUserNameAndActiveTrue(user.getUserName());

        if(data.isPresent()) {
            entity = data.get();
            entity.setActive(true);
            entity.setToken(null);
            dao.save(entity);
            responseEntity.setStatus("200");
            responseEntity.setMessage("Verified and Activated");
        } else if(alreadyActive.isPresent()){
            responseEntity.setStatus("201");
            responseEntity.setMessage("Already Activated");
        } else {
            responseEntity.setStatus("404");
            responseEntity.setMessage("Not Found");
        }
        return responseEntity;
    }

}
