//package utm.mu.rsk.microfinance.rskservice.repository.common;
//
//import org.springframework.http.MediaType;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class HomeResource {
//
//    @GetMapping("/")
//    public String home(){
//        return ("Welcome Home");
//    }
//
//    @GetMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
//    public String user(){
//        String USER = "User logged in";
//        return USER;
//    }
//
//    @GetMapping("/admin")
//    public String admin(){
//        return ("<h1>Administration</h1>");
//    }
//
//    @GetMapping("/hello")
//    public String hello(){
//        return "hello world";
//    }
//
//}
