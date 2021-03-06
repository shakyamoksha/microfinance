package utm.mu.rsk.microfinance.rskservice.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import utm.mu.rsk.microfinance.rskservice.repository.common.entity.ResponseEntity;
import utm.mu.rsk.microfinance.rskservice.user.model.User;
import utm.mu.rsk.microfinance.rskservice.user.service.UserService;

import javax.mail.MessagingException;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/register")
public class RegistrationController {

    @Autowired
    UserService service;

    @PostMapping("/add")
    public User registerNewUser(@RequestBody User user) throws MessagingException {
        return this.service.addUser(user);
    }

    @GetMapping("/ifexists/{userName}")
    public Optional<User> getByUsername(@PathVariable String userName){
        return service.findByUsername(userName);
    }

    @PostMapping("/verification")
    public ResponseEntity verifyUser(@RequestBody User user) {
        return service.verfiyUser(user);
    }

}
