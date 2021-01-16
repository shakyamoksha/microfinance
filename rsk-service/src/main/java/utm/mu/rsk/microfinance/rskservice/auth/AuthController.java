package utm.mu.rsk.microfinance.rskservice.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import utm.mu.rsk.microfinance.rskservice.repository.user.model.UserModel;
import utm.mu.rsk.microfinance.rskservice.repository.user.service.UserDetailsService;

@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> createAuthToken(@RequestBody UserModel userModel) throws Exception {
        Object data;

        try {
            data = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userModel.getUserName(), userModel.getPassword()));
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password!", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(userModel.getUserName());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(jwt, data));
    }

}
