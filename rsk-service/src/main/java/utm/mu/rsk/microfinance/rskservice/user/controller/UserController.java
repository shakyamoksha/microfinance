package utm.mu.rsk.microfinance.rskservice.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utm.mu.rsk.microfinance.rskservice.user.model.User;
import utm.mu.rsk.microfinance.rskservice.user.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService service;

    @GetMapping("/all")
    public List<User> getAllUsers(){
        return service.retrieveAllUsers();
    }

}
