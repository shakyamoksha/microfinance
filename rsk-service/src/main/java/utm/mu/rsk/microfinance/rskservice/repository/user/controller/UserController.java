package utm.mu.rsk.microfinance.rskservice.repository.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utm.mu.rsk.microfinance.rskservice.repository.user.model.UserModel;
import utm.mu.rsk.microfinance.rskservice.repository.user.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    UserService service;

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<UserModel> getAllUsers(){
        return service.retrieveAllUsers();
    }

    @GetMapping("/getbyuser/{userName}")
    public Optional<UserModel> getByUsername(@PathVariable String userName){
        return service.findByUsername(userName);
    }

}
