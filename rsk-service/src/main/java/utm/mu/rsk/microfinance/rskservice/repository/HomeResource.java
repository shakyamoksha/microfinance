package utm.mu.rsk.microfinance.rskservice.repository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeResource {

    @GetMapping("/")
    public String home(){
        return ("<h1>Welcome Home</h1>");
    }

    @GetMapping("/users")
    public String user(){
        return ("<h1>User logged in</h1>");
    }

    @GetMapping("/admin")
    public String admin(){
        return ("<h1>Administration</h1>");
    }

    @GetMapping("/hello")
    public String hello(){
        return "hello world";
    }

}
