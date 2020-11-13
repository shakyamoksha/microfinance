package utm.mu.rsk.microfinance.rskservice.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utm.mu.rsk.microfinance.rskservice.user.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUserName(String userName);

    List<User> findByEmail(String email);

    Optional<User> findByUserNameAndTokenAndActiveFalse(String userName, String token);
    Optional<User> findByUserNameAndActiveTrue(String userName);
}
