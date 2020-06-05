package utm.mu.rsk.microfinance.rskservice.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utm.mu.rsk.microfinance.rskservice.user.model.User;
import utm.mu.rsk.microfinance.rskservice.user.service.UserService;

import javax.mail.MessagingException;

@RestController
@RequestMapping("register")
public class RegistrationController {

    @Autowired
    UserService service;

    @PostMapping("/add")
    public User registerNewUser(@RequestBody User user) throws MessagingException {
        return this.service.addUser(user);
    }

}
