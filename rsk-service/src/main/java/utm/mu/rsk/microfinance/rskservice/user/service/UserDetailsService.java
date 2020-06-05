package utm.mu.rsk.microfinance.rskservice.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import utm.mu.rsk.microfinance.rskservice.user.model.User;
import utm.mu.rsk.microfinance.rskservice.user.repository.UserRepository;

import java.util.Optional;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    UserRepository dao;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        Optional<User> user = dao.findByUserName(userName);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + userName));

        return user.map(utm.mu.rsk.microfinance.rskservice.user.service.UserDetails::new).get();
    }
}
