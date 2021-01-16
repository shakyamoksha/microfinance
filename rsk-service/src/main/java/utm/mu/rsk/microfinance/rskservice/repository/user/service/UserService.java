package utm.mu.rsk.microfinance.rskservice.repository.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import utm.mu.rsk.microfinance.rskservice.repository.common.entity.ResponseEntity;
import utm.mu.rsk.microfinance.rskservice.repository.common.notification.MailService;
import utm.mu.rsk.microfinance.rskservice.repository.user.model.UserModel;
import utm.mu.rsk.microfinance.rskservice.repository.user.repository.UserRepository;

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

    public List<UserModel> retrieveAllUsers(){
        return this.dao.findAll();
    }

    public UserModel addUser(UserModel userModel) throws MessagingException {

        int strength = 10; // Work Factor of BCRYPT
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(strength, new SecureRandom());
        String encodedPassword = bCryptPasswordEncoder.encode(userModel.getPassword());

        userModel.setToken(randomString(25));
        userModel.setRoles("ROLE_USER");
        userModel.setActive(false);
        userModel.setPassword(encodedPassword);
        mailService.sendMail(userModel.getEmail(),
                "Verify Account - Microfinance",
                "Dear " + userModel.getFirstName() + " " + userModel.getLastName() + ", <br>" +
                        "<a href=\"http://localhost:4200/verification/"+ userModel.getToken() + "/"+ userModel.getUserName() +"\">Click to verify your account</a>");
        return this.dao.save(userModel);
    }

    public Optional<UserModel> findByUsername(String username) {
        return dao.findByUserName(username);
    }

    public ResponseEntity verfiyUser(UserModel userModel) {
        ResponseEntity responseEntity = new ResponseEntity();
        UserModel entity = new UserModel();
        Optional<UserModel> data = dao.findByUserNameAndTokenAndActiveFalse(userModel.getUserName(), userModel.getToken());
        Optional<UserModel> alreadyActive = dao.findByUserNameAndActiveTrue(userModel.getUserName());

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
