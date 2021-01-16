package utm.mu.rsk.microfinance.rskservice.repository.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utm.mu.rsk.microfinance.rskservice.repository.user.model.UserModel;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Integer> {

    Optional<UserModel> findByUserName(String userName);

    List<UserModel> findByEmail(String email);

    Optional<UserModel> findByUserNameAndTokenAndActiveFalse(String userName, String token);
    Optional<UserModel> findByUserNameAndActiveTrue(String userName);
}
